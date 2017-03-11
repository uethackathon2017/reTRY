import * as actionTypes from './types';
import {connect, getSocket} from '../api/socket';
import config from '../config';
import {getAccessToken, getGameIds, getCurrentGame} from '../reducers';
import {navReplaceAt, navPopRoute, navResetRoute} from './rootNavigation';
import * as gameNav from './gameNavigation';

export const startFinding = () => (dispatch, getState) => {
    dispatch({
        type: actionTypes.FIND_START
    });


    connect(config.gameUrl, {
        query: 'token=' + getAccessToken(getState()),
        jsonp: false
    });

    const socket = getSocket();

    let gameStartCountDown = config.gameStartCountDown;

    socket.on('opponent found', (data) => {

        let interval = setInterval(() => {
            if (gameStartCountDown > 0) {
                dispatch({
                    type: actionTypes.FIND_SUCCESS,
                    data: data
                })
            } else {
                clearInterval(interval);
            }
            gameStartCountDown--;
        }, 1000)
    });

    socket.on('invalid token', () => {
        socket.disconnect();
        socket.close();
        dispatch({
            type: actionTypes.LOGOUT
        });

        dispatch(navResetRoute())
    });

    socket.on('game data', (data) => {
        dispatch({
            type: actionTypes.GET_GAME_SUCCESS,
            data: data
        });


        dispatch(navReplaceAt('newWords'));

        let newWordsCountDown = config.newWordsCountDown;

        let interval = setInterval(() => {
            if (newWordsCountDown >= 0) {
                dispatch({
                    type: actionTypes.NEW_WORDS_COUNT_DOWN,
                })
            } else {
                clearInterval(interval);
            }
            newWordsCountDown--;
        }, 1000)
    });


    let currentGameCountDownInterval;

    socket.on('quiz start', () => {
        // move to game screen if needed
        dispatch(navReplaceAt('game'));
    });

    socket.on('quiz', (data) => {

        clearInterval(currentGameCountDownInterval);

        dispatch({
            type: actionTypes.SHOW_GAME,
            id: data.quizId
        });

        // switch game
        const currentGame = getCurrentGame(getState());
        switch (currentGame.type) {
            case 'vi_en':
            case 'en_vi':
                dispatch(gameNav.navReplaceAt('choose_meaning'));
                break;
            case 'missingChar':
                dispatch(gameNav.navReplaceAt('missing_character'));
                break;
            default:
                return;
        }

        // Game count down

        let gameCountdown = currentGame.duration;
        console.log("=== DURATION: " + gameCountdown);


        dispatch({
            type: actionTypes.GAME_COUNT_DOWN,
            countDown: gameCountdown
        });

        console.log("=== DURATION: " + gameCountdown);

        currentGameCountDownInterval = setInterval(() => {
            if (gameCountdown === 0) {
                clearInterval(currentGameCountDownInterval);
                return;
            }

            console.log(gameStartCountDown);
            gameCountdown--;

            dispatch({
                type: actionTypes.GAME_COUNT_DOWN,
                countDown: gameCountdown
            })
        }, 1000);
    });


};

export const answer = (quizId, answerIndex) => (dispatch, getState) => {
    const socket = getSocket();

    dispatch({
        type: actionTypes.ANSWER,
        key: answerIndex
    });

    socket.emit('answer quiz', {
        _id: quizId,
        key: answerIndex
    });

    socket.on('self quiz result', (data) => {
        dispatch({
            type: actionTypes.RECEIVE_SELF_SCORE,
            score: data.currentScore,
            rightAnswer: data.rightAnswer
        })
    });

    socket.on('opponent quiz result', (data) => {
        dispatch({
            type: actionTypes.RECEIVE_OPPONENT_SCORE,
            score: data.currentScore,
            rightAnswer: data.rightAnswer
        })
    });

    socket.on('game end', (data) => {
        dispatch({
            type: actionTypes.GAME_END,
            data: data
        });

        socket.disconnect();
        socket.close();
        dispatch(navReplaceAt('gameResult'));
    })
};

export const cancelFinding = () => (dispatch) => {
    const socket = getSocket();
    socket.disconnect();
    socket.close();
    dispatch({
        type: actionTypes.FIND_CANCEL
    });
};



