import * as actionTypes from '../../actions/types';

const score = (state = {self: 0, opponent: 0}, action) => {
    switch (action.type) {
        case actionTypes.RECEIVE_OPPONENT_SCORE:
            return {
                ...state,
                opponent: action.score
            };
        case actionTypes.RECEIVE_SELF_SCORE:
            return {
                ...state,
                self: action.score
            };
        default:
            return state;
    }
};

export default score;

export const getSelfScore = (state) => state.self;
export const getOpponentScore = (state) => state.opponent;