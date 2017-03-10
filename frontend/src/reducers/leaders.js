import * as types from '../actions/types';

const initialState = {
    errorMessage: null,
    topTenHighestLevel: [],
};

const leaders = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_LEADERS_REQUEST:
            return initialState;
        case types.GET_LEADERS_FAILURE:
            let errorMessage = null;

            if (action.error) {
                errorMessage = action.error.message;
            }

            return {
                errorMessage
            };
        case types.GET_LEADERS_SUCCESS:
            return {
                topTenHighestLevel: action.response.topTenHighestLevel,
            };
        default:
            return state
    }
};

export default leaders;

export const getLeaders = (state) => state.topTenHighestLevel;