import * as actionTypes from '../../actions/types';

const gameCountDown = (state = 0, action) => {
    switch (action.type) {
        case actionTypes.GAME_COUNT_DOWN:
            return action.countDown;
        default:
            return state
    }
};

export default gameCountDown;

export const getGameCountDown = (state) => state;