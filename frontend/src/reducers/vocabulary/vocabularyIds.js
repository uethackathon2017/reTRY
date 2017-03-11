import * as actionTypes from '../../actions/types';

const vocabularyIds = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_VOCABULARIES_SUCCESS:
            return action.response.words.map(vocabulary => vocabulary.id)
        default:
            return state;
    }
};

export default vocabularyIds;