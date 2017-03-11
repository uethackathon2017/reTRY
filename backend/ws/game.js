'use strict';

let redisClient = require('../utils/redis');
const {User, Quiz} = require('../models');
const cluster = require('cluster');
const async = require('async');
const WORKER_ID = 1;
const DELAY_TIME = 2;

const quizStorage = {};

const errorHandle = (socket, err) => {
    socket.emit('error', err);
};

const calculateLevel = (score) => {
    return parseInt(1 + parseInt(score)/30);
};

const gameControl = (game, firstSocket, secondSocket, room, quizzes, firstPlayerData, secondPlayerData) => {
    let currentQuizIdx = 0;
    let isFirstPlayerAnswerd = false;
    let isSecondPlayerAnswerd = false;
    let quizStartTime;
    let currentTimout;

    const nextQuiz = () => {

        isFirstPlayerAnswerd = false;
        isSecondPlayerAnswerd = false;

        console.log("==== GAME: " + currentQuizIdx, ' with duration: ' + quizzes[currentQuizIdx].duration);
        quizStartTime = new Date();

        game.to(room).emit('quiz', {
            quizId: quizzes[currentQuizIdx]._id
        });

        currentQuizIdx++;

        if (currentQuizIdx < quizzes.length) {
            currentTimout = setTimeout(nextQuiz, (quizzes[currentQuizIdx - 1].duration + 1) * 1000)
        } else {
            setTimeout(() => {
                redisClient.get('score of ' + firstSocket.id, (error, firstPlayerScore) => {
                redisClient.get('score of ' + secondSocket.id, (error, secondPlayerScore) => {
                    firstSocket.emit('game end', { selfScore: firstPlayerScore, opponentScore: secondPlayerScore, selfData: firstPlayerData, opponentData: secondPlayerData });
                    secondSocket.emit('game end', { selfScore: secondPlayerScore, opponentScore: firstPlayerScore, selfData: secondPlayerData, opponentData: firstPlayerData });             
                    // TODO: Save result of two players
                    // console.log(firstPlayerScore);
                    // console.log(secondPlayerScore);
                    let score = (firstPlayerData.score ? firstPlayerData.score : 0) + firstPlayerScore;
                    let level = calculateLevel(score);
                    User.updateAsync({
                        _id: firstPlayerData._id
                    }, {
                        score: score,
                        level: level
                        // TODO: Update words here
                        // TODO: Update awards here
                    })
                    .then(result => {
                        console.log('player 1 result: ' + result);
                        let score = (firstPlayerData.score ? firstPlayerData.score : 0) + firstPlayerScore;
                        let level = calculateLevel(score);
                        return User.updateAsync({
                            _id: secondPlayerData._id
                        }, {
                            score: score,
                            level: level
                            // TODO: Update words here
                            // TODO: Update awards here
                        });
                    })
                    .then(result => {
                        console.log('player 2 result: ' + result);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                });
            });
            }, (quizzes[currentQuizIdx - 1].duration + 1) * 1000);
        }
    };

    setTimeout(() => {
        game.to(room).emit('quiz start');
        setTimeout(() => {
            nextQuiz();
        }, 3000);
    }, 11000);


    const socketPlayerHandler = (socket) => {

    }

    firstSocket.on('answer quiz', (quizData) => {
        // quizData: { _id, key, time }
        isFirstPlayerAnswerd = true;
        let time = Math.floor(new Date() - quizStartTime) / 1000 - DELAY_TIME;
        if (time < 0) time = 0;
        redisClient.get('score of ' + firstSocket.id, (error, currentScore) => {
            if (!currentScore) currentScore = 0;
            else currentScore = parseInt(currentScore);
            let currentQuizz = quizzes[currentQuizIdx - 1];
            console.log('Current quiz: ' + JSON.stringify(currentQuizz));
            if (currentQuizz._id.toString() === quizData._id.toString()) {
                if (currentQuizz.key === quizData.key) {
                    // Save words which this user has the right answer
                    let wordNeedToBeTracked = currentQuizz.relatedWords[currentQuizz.key]._id;
                    // console.log(JSON.stringify(currentQuizz.relatedWords[currentQuizz.key]));
                    redisClient.sadd('passed words of ' + firstSocket.id, wordNeedToBeTracked.toString());
                    currentScore += parseInt((currentQuizz.duration - time)) < 0 ? 0 : parseInt((currentQuizz.duration - time));
                    redisClient.set('score of ' + firstSocket.id, currentScore.toString());
                    firstSocket.emit('self quiz result', {
                        result: true,
                        currentScore: currentScore,
                        rightAnswer: currentQuizz.key
                    });
                    firstSocket.broadcast.to(room).emit('opponent quiz result', {
                        result: true,
                        currentScore: currentScore,
                        rightAnswer: currentQuizz.key
                    });
                } else {
                    // Save words which this user has the wrong answer
                    let wordNeedToBeTracked = currentQuizz.relatedWords[currentQuizz.key]._id;
                    // console.log(JSON.stringify(currentQuizz.relatedWords[currentQuizz.key]));
                    // console.log('word id========' + wordNeedToBeTracked.toString());
                    redisClient.sadd('failed words of ' + firstSocket.id, wordNeedToBeTracked.toString());

                    firstSocket.emit('self quiz result', {
                        result: false,
                        currentScore: currentScore,
                        rightAnswer: currentQuizz.key
                    });
                    firstSocket.broadcast.to(room).emit('opponent quiz result', {
                        result: false,
                        currentScore: currentScore,
                        rightAnswer: currentQuizz.key
                    });
                }
            }
        });
    });

    secondSocket.on('answer quiz', (quizData) => {
        isSecondPlayerAnswerd = true;
        let time = Math.floor(new Date() - quizStartTime) / 1000 - DELAY_TIME;
        if (time < 0) time = 0;
        redisClient.get('score of ' + secondSocket.id, (error, currentScore) => {
            if (!currentScore) currentScore = 0;
            else currentScore = parseInt(currentScore);
            let currentQuizz = quizzes[currentQuizIdx - 1];
            console.log('Current quiz: ' + JSON.stringify(currentQuizz));
            if (currentQuizz._id.toString() === quizData._id.toString()) {
                if (currentQuizz.key === quizData.key) {
                    // Save words which this user has the right answer
                    let wordNeedToBeTracked = currentQuizz.relatedWords[currentQuizz.key]._id;
                    // console.log('word id========' + wordNeedToBeTracked.toString());
                    // console.log(JSON.stringify(currentQuizz.relatedWords[currentQuizz.key]));
                    redisClient.sadd('passed words of ' + secondSocket.id, wordNeedToBeTracked.toString());
                    currentScore += parseInt((currentQuizz.duration - time)) < 0 ? 0 : parseInt((currentQuizz.duration - time));
                    redisClient.set('score of ' + secondSocket.id, currentScore.toString());
                    secondSocket.emit('self quiz result', {
                        result: true,
                        currentScore: currentScore,
                        rightAnswer: currentQuizz.key
                    });
                    secondSocket.broadcast.to(room).emit('opponent quiz result', {
                        result: true,
                        currentScore: currentScore,
                        rightAnswer: currentQuizz.key
                    });
                } else {
                    // Save words which this user has the wrong answer
                    let wordNeedToBeTracked = currentQuizz.relatedWords[currentQuizz.key]._id;
                    // console.log('word id========' + wordNeedToBeTracked.toString());
                    // console.log(JSON.stringify(currentQuizz.relatedWords[currentQuizz.key]));
                    redisClient.sadd('failed words of ' + secondSocket.id, wordNeedToBeTracked.toString());
                    secondSocket.emit('self quiz result', {
                        result: false,
                        currentScore: currentScore,
                        rightAnswer: currentQuizz.key
                    });
                    secondSocket.broadcast.to(room).emit('opponent quiz result', {
                        result: false,
                        currentScore: currentScore,
                        rightAnswer: currentQuizz.key
                    });
                }
            }
        });
    });
};

module.exports = (game) => {
    game.on('connection', (socket) => {
        // TODO: Check if one user is online on two different devices
        User
            .findById(socket.decoded_token._id, {
                _id: 1,
                email: 1,
                fbLink: 1,
                firstName: 1,
                lastName: 1,
                pictureURL: 1,
                gender: 1
            })
            .lean()
            .then(user => {
                if (user) {
                    redisClient.hset(socket.id.toString(), 'userData', JSON.stringify(user));
                    redisClient.sadd('listWaitingPlayers', socket.id.toString());
                } else {
                    socket.emit('invalid token');
                }
            })
            .catch(err => {
                console.log(err);
                // emit error
            });
        socket.on('disconnect', () => {
            console.log('User ' + socket.id.toString() + " disconnected");
            redisClient.smembers('passed words of ' + socket.id, (err, passedWords) => {
                redisClient.smembers('failed words of ' + socket.id, (err, failedWords) => {
                    // passedWords = JSON.parse(passedWords);
                    // failedWords = JSON.parse(failedWords);
                    if (passedWords.length || failedWords.length) {
                        console.log('Passed words: ' + passedWords.toString());
                        console.log('Failed words: ' + failedWords.toString());
                        console.log(passedWords.length);
                        console.log(failedWords.length);
                        passedWords.forEach(word => {
                            User.findOne({
                                _id: socket.decoded_token._id,
                                'passedWords._id': word
                            })
                            .then(user => {
                                if (user) {
                                    user.update({
                                        $inc: {
                                            'passedWords.$.count': 1,
                                        }
                                    }).exec();
                                } else {
                                    User.update({
                                        _id: socket.decoded_token._id
                                    }, {
                                        'passedWords._id': word,
                                        'passedWords.count': 1
                                    }).exec();
                                }
                            })
                            .catch(err => {
                                if (err) console.log(err);
                            });
                        });
                        failedWords.forEach(word => {
                            User.findOne({
                                _id: socket.decoded_token._id,
                                'failedWords._id': word
                            })
                            .then(user => {
                                if (user) {
                                    user.update({
                                        $inc: {
                                            'failedWords.$.count': 1,
                                        }
                                    }).exec();
                                } else {
                                    User.update({
                                        _id: socket.decoded_token._id
                                    }, {
                                        'failedWords._id': word,
                                        'failedWords.count': 1
                                    }).exec();
                                }
                            })
                            .catch(err => {
                                if (err) console.log(err);
                            });
                        });
                    }
                });
            });
            redisClient.srem('listWaitingPlayers', socket.id, (error) => {
                if (error) {
                    console.log(error);
                }
            });

            redisClient.del(socket.id, (error) => {
                if (error) {
                    console.log(error);
                }
            });

            redisClient.del('room of ' + socket.id, (error) => {
                if (error) {
                    console.log(error);
                }
            });

            redisClient.del('score of ' + socket.id, (error) => {
                if (error) {
                    console.log(error);
                }
            });
        });
        socket.on('error', () => {
            socket.emit('error', {message: 'Some error occurs'});
        });
    });

    cluster.workers[WORKER_ID].on('message', ({firstPlayer, secondPlayer}) => {

        const firstSocket = game.sockets[firstPlayer];
        const secondSocket = game.sockets[secondPlayer];

        if (!firstSocket || !secondSocket) {
            return;
        }

        // console.log(game.sockets);

        let room = `room:${firstPlayer}-${secondPlayer}`;
        redisClient.set('room of ' + firstPlayer.toString(), room);
        redisClient.set('room of ' + secondPlayer.toString(), room);

        firstSocket.join(room);
        secondSocket.join(room);

        let firstPlayerInfo;
        let secondPlayerInfo;

        async.parallel([
                (callback) => {
                    redisClient.hgetall(firstPlayer, (err, data) => {
                        if (err) {
                            callback(err);
                        }

                        firstPlayerInfo = data;
                        callback();
                    })
                },
                (callback) => {
                    redisClient.hgetall(secondPlayer, (err, data) => {
                        if (err) {
                            callback(err);
                        }

                        secondPlayerInfo = data;
                        callback();
                    });
                }
            ],
            (errors) => {
                if (errors) {
                    errorHandle(firstSocket, errors[0]);
                    errorHandle(secondSocket, errors[0]);
                }

                firstSocket.emit('opponent found', {
                    self: JSON.parse(firstPlayerInfo.userData),
                    opponent: JSON.parse(secondPlayerInfo.userData)
                });

                secondSocket.emit('opponent found', {
                    self: JSON.parse(secondPlayerInfo.userData),
                    opponent: JSON.parse(firstPlayerInfo.userData)
                });

                setTimeout(() => {

                    Quiz.find({})
                        .populate('relatedWords')
                        .lean()
                        .then(quizzes => {
                            let newRandomTenQuizzes = [];
                            let pushedQuizzes = [];
                            for (let idx = 0; idx < 10; idx++) {
                                let randomIdx = Math.floor(Math.random() * quizzes.length);
                                while (pushedQuizzes.indexOf(randomIdx) !== -1) {
                                    randomIdx = Math.floor(Math.random() * quizzes.length);
                                }
                                pushedQuizzes.push(randomIdx);
                                newRandomTenQuizzes.push(quizzes[randomIdx]);
                            }

                            game.to(room).emit('game data', {
                                quizzes: newRandomTenQuizzes
                            });

                            console.log("=====quiz generated");

                            gameControl(game, firstSocket, secondSocket, room, newRandomTenQuizzes, JSON.parse(firstPlayerInfo.userData), JSON.parse(secondPlayerInfo.userData));
                        });
                }, 5000);

            }
        );
    });
};