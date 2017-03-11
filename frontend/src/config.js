import { Platform } from 'react-native';
const platform = Platform.OS;


//
// let config =  {
//     apiUrl: 'http://52.76.166.38:6969',
//     gameUrl: 'http://52.76.166.38:7000/game',
//     gameStartCountDown: 5,
//     newWordsCountDown: 10
// };
//
// if (platform === 'android') {
//     config = {
//         apiUrl: 'http://52.76.166.38:6969',
//         gameUrl: 'http://52.76.166.38:7000/game',
//         gameStartCountDown: 5,
//         newWordsCountDown: 10
//     }
// }

let config =  {
    apiUrl: 'http://localhost:6969',
    gameUrl: 'http://localhost:7000/game',
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