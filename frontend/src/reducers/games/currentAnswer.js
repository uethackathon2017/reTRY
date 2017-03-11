import * as actionTypes from '../../actions/types';

const currentAnswer = (state = -1, action) => {
    switch (action.type) {
        case actionTypes.SHOW_GAME:
            return -1;
        case actionTypes.ANSWER:
            return action.key;
        default:
            return state;
    }
};

export default currentAnswer;

export const getCurrentAnswerKey = (state) =>  state;