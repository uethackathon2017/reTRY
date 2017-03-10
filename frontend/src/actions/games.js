import * as actionTypes from './types';
import { connect, getSocket } from '../api/socket';
import config from '../config';
import { getAccessToken, getGameIds, getCurrentGame } from '../reducers';
import {navReplaceAt} from './rootNavigation';
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

    let countDown = config.gameStartCountDown;

    socket.on('opponent found', (data) => {

        let interval = setInterval(() => {
            if (countDown > 0) {
                dispatch({
                    type: actionTypes.FIND_SUCCESS,
                    data: data
                })
            } else {
                clearInterval(interval);
            }
            countDown--;
        }, 1000)
    });

    socket.on('game data', (data) => {
        dispatch({
            type: actionTypes.GET_GAME_SUCCESS,
            data: data
        });

        dispatch(navReplaceAt('newWords'));

        let newWordsCountDown = config.newWordsCountDown;

        let interval = setInterval(() => {
            if (newWordsCountDown > 0) {
                dispatch({
                    type: actionTypes.NEW_WORDS_COUNT_DOWN,
                })
            } else {
                clearInterval(interval);
            }
            newWordsCountDown--;
        }, 1000)
    });

    socket.on('quiz', (id) => {
        dispatch({
            type: actionTypes.SHOW_GAME,
            id: id
        });

        const currentGame = getCurrentGame(getState());

        if (getGameIds(getState()).indexOf(id) === 0) {
            navReplaceAt('game');

            switch (currentGame.type) {
                case 'vi-en':
                case 'en-vi':
                    gameNav.navReplaceAt('choose_meaning');
                default:
                    return;
            }
        }
    })
};

export const answer = () => (dispatch) => {
    const socket = getSocket();

};
export const cancelFinding = () => (dispatch) => {
    const socket = getSocket();
    socket.disconnect();
    dispatch({
        type: actionTypes.FIND_CANCEL
    });
};



