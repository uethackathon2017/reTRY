import * as actionTypes from '../../actions/types';

const topicById = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.GET_TOPICS_SUCCESS:
            let state = {};
            return action.response.topics.map(topic => {
                state[topic.id = topic]
            })
        case actionTypes.GET_VOCABULARIES_SUCCESS:
            let state = { ...state };
            // map 
            state[action.topicId] = action.response.words.map(word => word.id);
        default:
            return state;
    }
};

export default topicIds;