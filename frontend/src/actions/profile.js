import * as actions from './types';
import {getAccessToken, checkShouldGetApi} from '../reducers';
import {profile} from '../api';

export const getProfile = () => (dispatch, getState) => {
    if (checkShouldGetApi(getState())) {
        dispatch({
            type: actions.GET_PROFILE_REQUEST,
        });

        profile(getAccessToken(getState()))
            .then(response => response.json())
            .then(responseJson => {
                dispatch({
                    type: actions.GET_PROFILE_SUCCESS,
                    response: responseJson,
                });
            })
            .catch(error => {
                dispatch({
                    type: actions.GET_PROFILE_FAILURE,
                    error: error,
                });
            });
    }
};

export const shouldShowPublicProfile = (user) => (dispatch, getState) => {
    dispatch({
        type: actions.SHOULD_GET_PUBLIC_PROFILE,
        user: user,
    });
};

export const clearProfile = () => (dispatch, getState) => {
    dispatch({
        type: actions.CLEAR_PROFILE,
    });
};

