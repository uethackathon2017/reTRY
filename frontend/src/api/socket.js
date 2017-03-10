window.navigator.userAgent = 'react-native';
const io = require('socket.io-client/dist/socket.io.js');

let socket;
export const connect = (url, options) => {
    socket = io(url,options);
};

export const getSocket = () => socket;

