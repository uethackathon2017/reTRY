import * as actionTypes from '../../actions/types';
import config from '../../config';

const initialCountDown = config.newWordsCountDown + 1;

const newWordsCountdown = (state = initialCountDown, action) => {
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