import * as types from '../actions/types';

const initialState = {
    errorMessage: null,
    words: [],
    topic: null,
};

const words = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_WORDS_REQUEST:
            return {
                ...initialState,
                topic: action.topic,
            };
        case types.GET_WORDS_FAILURE:
            let errorMessage = null;
            if (action.error) {
                errorMessage = action.error.message;
            }
            return {
                errorMessage,
            };
        case types.GET_WORDS_SUCCESS:
            return {
                words: action.response.words,
                topic: action.topic,
            };
        default:
            return state
    }
};

export default words;

export const getWordsByTopic = (state) => state.words;
export const getTopic = (state) => state.topic;