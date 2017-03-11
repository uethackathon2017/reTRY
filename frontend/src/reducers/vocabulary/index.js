import { combineReducers } from 'redux';
import topicById, * as fromTopicById from './topicById'
import topicIds, * as fromTopicIds from './topicIds'
import vocabularyById, * as fromVocabolaryById from './vocabularyById'
import vocabularyIds, * as fromVocabolaryById from './vocabularyIds'

const vocabularies = combineReducers({
    topicById,
    topicIds,
    vocabularyById,
    vocabularyIds
});

export default vocabularies;


// selecter

export const getAllTopics = (state) => {
    return fromTopicIds.getAllTopics(state);
}