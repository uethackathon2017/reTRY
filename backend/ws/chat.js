'use strict';

let onlineUsers = [];

module.exports = (chat) => {
  chat.on('connection', socket => {
    onlineUsers.push(socket.id);
    console.log(`${ onlineUsers.length } users connected`);
    socket.broadcast.emit('user join', { online: onlineUsers.length });

    socket.on('disconnect', () => {
      let userIdx = onlineUsers.indexOf(socket.id);
      if (userIdx !== -1)
        onlineUsers.splice(userIdx, 1);
      socket.broadcast.emit('user leave', { online: onlineUsers.length });
    });
  });
};