import * as actions from './types';
import { getAccessToken, getVocabularyByTopic } from '../reducers';
import { getVocaboraiesByTopicId } from '../api';

export const getVocabularies = (topicId) => (dispatch, getState) => {
    // if (getVocabularyByTopic(getState())) {
    dispatch({
        type: actions.GET_VOCABULARIES_REQUEST,
    });

    getVocaboraiesByTopicId(getAccessToken(getState()), topicId)
        .then(response => response.json())
        .then(responseJson => {
            dispatch({
                type: actions.GET_VOCABULARIES_SUCCESS,
                response: responseJson,
            });
        })
        .catch(error => {
            dispatch({
                type: actions.GET_VOCABULARIES_FAILURE,
                error: error,
            });
        });
    // }
};