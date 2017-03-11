import * as actionTypes from '../../actions/types';


const topicIds = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_TOPICS_SUCCESS:
            return action.response.topics.map(topic => topic.id)
        default:
            return state;
    }
};

export default topicIds;

// selecter
export default getAllTopicIds = (state) => {
    return state;
}
