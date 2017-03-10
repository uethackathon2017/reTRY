'use strict';

let redisClient = require('../utils/redis');
const {User} = require('../models');
const cluster = require('cluster');
const async = require('async');
const WORKER_ID = 1;

const errorHandle = (socket, err) => {
    socket.emit('error', err);
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
                                game.to(room).emit('game data', {
                                    test: "test"
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
        });
        socket.on('error', () => {
            socket.emit('error', {message: 'Some error occurs'});
        });
    });
};