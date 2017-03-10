'use strict';

let redisClient = require('../utils/redis');
const {User, Quiz} = require('../models');
const cluster = require('cluster');
const async = require('async');
const WORKER_ID = 1;

const errorHandle = (socket, err) => {
    socket.emit('error', err);
};


const gameControl = (game, socket, room, quizzes) => {
    let currentQuizIndex = 0;
    let interval = setInterval(() => {

        if (currentQuizIndex === quizzes.length) {
            game.to(room).emit('final result', {});
            clearInterval(interval);
            return;
        }

        game.to(room).emit('quiz', {
            quizId: quizzes[currentQuizIndex]._id
        });

        currentQuizIndex++;
    }, 11000);
    socket.on('answer quiz', (quizData) => {
        // quizData: { _id, key, time }
        let currentScore = redisClient.get('score of ' + socket.id);
        if (!currentScore) currentScore = 0;
        else currentScore = parseInt(currentScore);
        quizzes.forEach(quiz => {
            if (quiz._id.toString() === quizData._id.toString()) {
                if (quiz.key === quizData.key) {
                    currentScore += parseInt(quizData.time);
                    redisClient.set('score of ' + socket.id, currentScore.toString());
                    socket.emit('self quiz result', { result: true, currentScore: currentScore });
                    socket.broadcast.to(room).emit('opponent quiz result', { result: true, currentScore: currentScore });
                } else {
                    socket.emit('self quiz result', { result: false, currentScore: currentScore });
                    socket.broadcast.to(room).emit('opponent quiz result', { result: true, currentScore: currentScore });
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
        cluster.workers[WORKER_ID].on('message', ({firstPlayer, secondPlayer}) => {
            let self = null;
            let opponent = null;
            if (firstPlayer === socket.id.toString()) {
                self = firstPlayer;
                opponent = secondPlayer;
            }
            if (secondPlayer === socket.id.toString()) {
                self = secondPlayer;
                opponent = firstPlayer;
            }
            if (self !== null) {
                let room = `room:${self}-${opponent}`;

                redisClient.set('room of ' + socket.id.toString(), room);

                socket.join(room, () => {

                    let selfObj;
                    let opponentObj;

                    async.parallel([
                            (callback) => {
                                redisClient.hgetall(self, (err, data) => {
                                    if (err) {
                                        callback(err);
                                    }

                                    selfObj = data;
                                    callback();
                                })
                            },
                            (callback) => {
                                redisClient.hgetall(self, (err, data) => {
                                    if (err) {
                                        callback(err);
                                    }

                                    opponentObj = data;
                                    callback();
                                });
                            }
                        ],
                        (errors) => {
                            if (errors) {
                                errorHandle(socket, errors[0]);
                            }

                            console.log(opponentObj);

                            game.to(room).emit('opponent found', {
                                self: JSON.parse(selfObj.userData),
                                opponent: JSON.parse(opponentObj.userData)
                            });

                            setTimeout(() => {

                                Quiz.find({})
                                    .populate('relatedWords')
                                    .lean()
                                    .then(quizzes => {
                                        let randomTenQuizzes = [];
                                        let pushedQuizzes = [];
                                        for (let idx = 0; idx < 10; idx++) {
                                            let randomIdx = Math.floor(Math.random() * quizzes.length);
                                            while (pushedQuizzes.indexOf(randomIdx) !== -1) {
                                                randomIdx = Math.floor(Math.random() * quizzes.length);
                                            }
                                            pushedQuizzes.push(randomIdx);
                                            randomTenQuizzes.push(quizzes[randomIdx]);
                                        }
                                        game.to(room).emit('game data', {
                                            quizzes: randomTenQuizzes
                                        });

                                        gameControl(game, socket, room, quizzes);
                                    });
                            }, 5000);
                        }
                    );

                });
            }
        });
        socket.on('disconnect', () => {
            redisClient.srem('listWaitingPlayers', socket.id.toString());
            redisClient.hdel(socket.id.toString(), 'userData');
            redisClient.del('room of ' + socket.id.toString());
        });
        socket.on('error', () => {
            socket.emit('error', {message: 'Some error occurs'});
        });
    });
};