import * as actions from './types';
import {getAccessToken} from '../reducers';
import {profile} from '../api';

export const getProfile = () => (dispatch, getState) => {
    dispatch({
        type: actions.GET_PROFILE_REQUEST,
    });

    profile(getAccessToken(getState()))
        .then(response => response.json())
        .then(responseJson => {

            console.log(responseJson);

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
};

