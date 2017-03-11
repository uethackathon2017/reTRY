import * as types from '../actions/types';
import {REHYDRATE} from 'redux-persist/constants'

const initialState = {
    status: types.LOGIN_NONE
};

const login = (state = initialState, action) => {
    switch (action.type) {
        // case REHYDRATE:
        //     const incoming = action.payload.login;
        //     console.log(incoming);
        //     if (incoming && incoming.accessToken != null) return incoming;
        //     return state;

        case types.FBLOGIN_REQUEST:
        case types.FBLOGIN_SUCCESS:
        case types.FBLOGIN_FAIlURE:
        case types.APILOGIN_REQUEST:
        case types.APILOGIN_FAIlURE:
            let errorMessage = null;

            if (action.error) {
                errorMessage = action.error.message;
            }

            return {
                status: action.type,
                errorMessage
            };
        case types.APILOGIN_SUCCESS:
            return {
                status: action.type,
                accessToken: action.response.accessToken,
                refreshToken: action.response.refreshToken
            };
        case types.FBLOGIN_CANCEL:
            return initialState;
        default:
            return state
    }
};

export default login;


//Selectors:
export const getLoginStatus = (state) => state.status;
export const getLoginErrorMessage = (state) => state.errorMessage;
export const getAccessToken = (state) => state.accessToken;