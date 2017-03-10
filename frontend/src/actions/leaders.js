import * as actions from './types';
import {getAccessToken} from '../reducers';
import {leaders} from '../api';

export const getLeaders = () => (dispatch, getState) => {
    dispatch({
        type: actions.GET_LEADERS_REQUEST,
    });

    leaders(getAccessToken(getState()))
        .then(response => response.json())
        .then(responseJson => {
            dispatch({
                type: actions.GET_LEADERS_SUCCESS,
                response: responseJson,
            });
        })
        .catch(error => {
            dispatch({
                type: actions.GET_LEADERS_FAILURE,
                error: error,
            });
        });
};

