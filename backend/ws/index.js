'use strict';

const socketioJwt = require('socketio-jwt');
const config = require('../config');
const fs = require('fs');

let io = null;

module.exports.wsInit = (listener) => {
  if (io)
    return this.io;
  io = require('socket.io')(listener);
  let chat = io.of('/chat');
  let game = io.of('/game');
  chat.use(socketioJwt.authorize({ secret: config.jwt.secret, handshake: true }));
  game.use(socketioJwt.authorize({ secret: config.jwt.secret, handshake: true }));

  let namespaces = { chat: chat, game: game };
  let files;
  try {
    files = fs.readdirSync(__dirname);
    files.forEach((file) => {
      if (file !== 'index.js')
        require(`./${file}`)(namespaces[file.split('.')[0]]);
    });
  } catch (err) {
    throw err;
  }
  return io;
};

module.exports.ws = () => {
  return this.io;
};