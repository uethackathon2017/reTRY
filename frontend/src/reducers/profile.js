import * as types from '../actions/types';

const initialState = {
    errorMessage: null,
    userData: null,
};

const profile = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PROFILE_REQUEST:
            return initialState;
        case types.GET_PROFILE_FAILURE:
            let errorMessage = null;

            if (action.error) {
                errorMessage = action.error.message;
            }

            return {
                errorMessage
            };
        case types.GET_PROFILE_SUCCESS:
            return {
                userData: action.response.userData,
            };
        default:
            return state
    }
};

export default profile;

export const getProfile = (state) => state.userData;