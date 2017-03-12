import * as actions from './types';
import { getAccessToken } from '../reducers';
import { wordsByTopic } from '../api';

export const getWordsByTopicApi = (topic) => (dispatch, getState) => {
    dispatch({
        type: actions.GET_WORDS_REQUEST,
        topic: topic,
    });

    wordsByTopic(getAccessToken(getState()), topic)
        .then(response => response.json())
        .then(responseJson => {
            dispatch({
                type: actions.GET_WORDS_SUCCESS,
                response: responseJson,
                topic: topic,
            });
        })
        .catch(error => {
            dispatch({
                type: actions.GET_WORDS_FAILURE,
                error: error,
            });
        });
    // }
};