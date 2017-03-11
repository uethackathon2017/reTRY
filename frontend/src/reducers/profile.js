import * as types from '../actions/types';

const initialState = {
    userData: {
    },
    shouldGetApi: true,
};

const profile = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOULD_GET_PUBLIC_PROFILE:
            return {
                userData: action.user,
                shouldGetApi: false,
            };
        case types.CLEAR_PROFILE:
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
export const checkShouldGetApi = (state) => state.shouldGetApi;