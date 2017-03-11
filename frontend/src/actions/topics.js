import * as actions from './types';
import {getAccessToken} from '../reducers';
import {topics} from '../api';

export const getTopics = () => (dispatch, getState) => {
    console.log("getTopic action");
    dispatch({
        type: actions.GET_TOPICS_REQUEST,
    });

    topics(getAccessToken(getState()))
        .then(response => response.json())
        .then(responseJson => {
            dispatch({
                type: actions.GET_TOPICS_SUCCESS,
                response: responseJson,
            });
        })
        .catch(error => {
            dispatch({
                type: actions.GET_TOPICS_FAILURE,
                error: error,
            });
        });
};

