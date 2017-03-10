import { Platform } from 'react-native';
const platform = Platform.OS;



let config =  {
    apiUrl: 'http://127.0.0.1:6969',
    gameUrl: 'http://127.0.0.1:7000/game',
    gameStartCountDown: 5,
    newWordsCountDown: 10
};

if (platform === 'android') {
    config = {
        apiUrl: 'http://10.0.3.2:6969',
        gameUrl: 'http://10.0.3.2:7000/game',
        gameStartCountDown: 5,
        newWordsCountDown: 10
    }
}

export default config;