import * as actionTypes from '../../actions/types';

const newWordsCountdown = (state = 10, action) => {
    switch (action.type) {
        case actionTypes.NEW_WORDS_COUNT_DOWN:
            return state - 1;
        default:
            return state;
    }
};

export default newWordsCountdown;

export const getNewWordsCountDown = (state) => {
    return state;
};