import * as actionTypes from '../../actions/types';

const currentRightAnswer = (state = -1, action) => {
    switch (action.type) {
        case actionTypes.SHOW_GAME:
            return -1;
        case actionTypes.RECEIVE_SELF_SCORE:
            return action.rightAnswer;
        default:
            return state;
    }
};

export default currentRightAnswer;

export const getCurrentRightAnswerKey = (state) =>  state;