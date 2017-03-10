import * as types from '../../actions/types';
import config from '../../config';

const initialState = {
    status: 'stop',
    data: {
        opponent: {}
    }
};

const find = (state = initialState, action) => {
    switch (action.type) {
        case types.FIND_START:
            return {
                ...state,
                status: 'find',
                countDown: config.gameStartCountDown
            };
        case types.FIND_CANCEL:
            return initialState;
        case types.FIND_SUCCESS:
            return {
                status: 'complete',
                data: action.data,
                countDown: state.countDown - 1
            };
        case types.FIND_FAILURE:
            return {
                status: 'failure',
                message: action.error.message
            };

        default:
            return state
    }
};

export default find;


//Selectors:
export const getFindStatus = (state) => {
    return state.status;
};

export const getOpponentData = (state) => {
    return state.data.opponent;
};

export const getCountDown = (state) => {
    return state.countDown;
};