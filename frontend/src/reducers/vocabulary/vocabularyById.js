import * as actionTypes from '../../actions/types';

const vocabularyById = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.GET_VOCABULARIES_SUCCESS:
            let state = {};
            return action.response.vocabularies.map(vocabulary => {
                state[vocabulary.id = vocabulary]
            })
        default:
            return state;
    }
};

export default vocabularyIds;