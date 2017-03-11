'use strict';

let redisClient = require('../utils/redis');
const {User, Quiz} = require('../models');
const cluster = require('cluster');
const async = require('async');
const WORKER_ID = 1;

const quizStorage = {};

const errorHandle = (socket, err) => {
    socket.emit('error', err);
};


const gameControl = (game, firstSocket, secondSocket, room, quizzes) => {
    let nextQuizIndex = 0;
    let isFirstPlayerAnswerd = false;
    let isSecondPlayerAnswerd = false;
    let quizStartTime;
    let currentTimout;

    const nextQuiz = () => {

        isFirstPlayerAnswerd = false;
        isSecondPlayerAnswerd = false;

        console.log("==== GAME: " + nextQuizIndex, ' with duration: ' + quizzes[nextQuizIndex].duration);
        quizStartTime = new Date();

        game.to(room).emit('quiz', {
            quizId: quizzes[nextQuizIndex]._id
        });

        nextQuizIndex++;

        if (nextQuizIndex !== quizzes.length) {
            currentTimout = setTimeout(nextQuiz, (quizzes[nextQuizIndex - 1].duration + 1) * 1000)
        }

    };

    setTimeout(() => {
        nextQuiz();
    }, 11000);


    const socketPlayerHandler = (socket) => {

    }

    firstSocket.on('answer quiz', (quizData) => {
        // quizData: { _id, key, time }
        isFirstPlayerAnswerd = true;
        const time = Math.floor(new Date() - quizStartTime) / 1000;
        redisClient.get('score of ' + firstSocket.id, (error, currentScore) => {
            if (!currentScore) currentScore = 0;
            else currentScore = parseInt(currentScore);

            let currentQuizz = quizzes[nextQuizIndex - 1];
            if (currentQuizz._id.toString() === quizData._id.toString()) {
                if (currentQuizz.key === quizData.key) {

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

        const time = Math.floor(new Date() - quizStartTime) / 1000;
        redisClient.get('score of ' + secondSocket.id, (error, currentScore) => {
            if (!currentScore) currentScore = 0;
            else currentScore = parseInt(currentScore);

            let currentQuizz = quizzes[nextQuizIndex - 1];

            if (currentQuizz._id.toString() === quizData._id.toString()) {
                if (currentQuizz.key === quizData.key) {

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
                redisClient.hset(socket.id.toString(), 'userData', JSON.stringify(user));
                redisClient.sadd('listWaitingPlayers', socket.id.toString());
            })
            .catch(err => {
                console.log(err);
                // emit error
            });

        socket.on('disconnect', () => {
            console.log('User ' + socket.id.toString() + " disconnected");
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

        console.log(game.sockets);

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
                    opponent: JSON.parse(secondPlayerInfo.userData)
                });

                secondSocket.emit('opponent found', {
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

                            gameControl(game, firstSocket, secondSocket, room, newRandomTenQuizzes);
                        });
                }, 5000);

            }
        );


        // let self = null;
        // let opponent = null;
        // if (firstPlayer === socket.id.toString()) {
        //     self = firstPlayer;
        //     opponent = secondPlayer;
        // }
        // if (secondPlayer === socket.id.toString()) {
        //     self = secondPlayer;
        //     opponent = firstPlayer;
        // }
        // if (self !== null) {
        //     let room = `room:${self}-${opponent}`;
        //     redisClient.set('room of ' + socket.id.toString(), room);
        //
        //     socket.join(room, () => {
        //
        //         let selfObj;
        //         let opponentObj;
        //
        //         async.parallel([
        //                 (callback) => {
        //                     redisClient.hgetall(self, (err, data) => {
        //                         if (err) {
        //                             callback(err);
        //                         }
        //
        //                         selfObj = data;
        //                         callback();
        //                     })
        //                 },
        //                 (callback) => {
        //                     redisClient.hgetall(self, (err, data) => {
        //                         if (err) {
        //                             callback(err);
        //                         }
        //
        //                         opponentObj = data;
        //                         callback();
        //                     });
        //                 }
        //             ],
        //             (errors) => {
        //                 if (errors) {
        //                     errorHandle(socket, errors[0]);
        //                 }
        //
        //                 console.log(opponentObj);
        //
        //                 game.to(room).emit('opponent found', {
        //                     self: JSON.parse(selfObj.userData),
        //                     opponent: JSON.parse(opponentObj.userData)
        //                 });
        //
        //                 setTimeout(() => {
        //                     let randomTenQuizzes = quizStorage[room];
        //                     if (randomTenQuizzes == 'undefined') {
        //                         quizStorage[room] = false;
        //                         Quiz.find({})
        //                             .populate('relatedWords')
        //                             .lean()
        //                             .then(quizzes => {
        //                                 let newRandomTenQuizzes = [];
        //                                 let pushedQuizzes = [];
        //                                 for (let idx = 0; idx < 10; idx++) {
        //                                     let randomIdx = Math.floor(Math.random() * quizzes.length);
        //                                     while (pushedQuizzes.indexOf(randomIdx) !== -1) {
        //                                         randomIdx = Math.floor(Math.random() * quizzes.length);
        //                                     }
        //                                     pushedQuizzes.push(randomIdx);
        //                                     newRandomTenQuizzes.push(quizzes[randomIdx]);
        //                                 }
        //
        //                                 game.to(room).emit('game data', {
        //                                     quizzes: quizStorage[room]
        //                                 });
        //                                 gameControl(game, socket, room, quizStorage[room]);
        //                             });
        //                     }
        //                     // else {
        //                     //     game.to(room).emit('game data', {
        //                     //         quizzes: quizStorage[room]
        //                     //     });
        //                     //     gameControl(game, socket, room, quizStorage[room]);
        //                     // }
        //                 }, 5000);
        //             }
        //         );
        //
        //     });
        // }
    });
};