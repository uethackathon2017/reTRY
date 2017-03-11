import * as types from '../actions/types';

const initialState = {
    errorMessage: null,
    topics:[] ,
};

const topics = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_TOPICS_REQUEST:
            return initialState;
        case types.GET_TOPICS_FAILURE:
            let errorMessage = null;
            if (action.error) {
                errorMessage = action.error.message;
            }
            return {
                errorMessage
            };
        case types.GET_TOPICS_SUCCESS:
            return {
                topics: action.response.topics,
            };
        default:
            return state
    }
};

export default topics;

export const getTopics = (state) => state.topics;