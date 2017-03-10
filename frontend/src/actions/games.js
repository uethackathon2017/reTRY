import * as actionTypes from './types';
import { connect, getSocket } from '../api/socket';
import config from '../config';
import { getAccessToken } from '../reducers';
import {navReplaceAt} from './rootNavigation';

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

        console.log(data);

        setInterval(() => {
            if (countDown > 0) {
                dispatch({
                    type: actionTypes.FIND_SUCCESS,
                    data: data
                })
            }
            countDown--;
        }, 1000)
    });

    socket.on('game data', (data) => {

        console.log(data);

        dispatch({
            type: actionTypes.GET_GAME_SUCCESS,
            data: data
        });

        dispatch(navReplaceAt('newWords'));
    })
};

export const cancelFinding = () => (dispatch) => {
    const socket = getSocket();
    socket.disconnect();
    dispatch({
        type: actionTypes.FIND_CANCEL
    });
};



