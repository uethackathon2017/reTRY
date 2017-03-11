import React from 'react-native';
import FBSDK from 'react-native-fbsdk';
const {LoginManager, AccessToken} = FBSDK;
import * as actions from './types';
import {facebookAuth} from '../api';
import {showLoadingPopup, hideLoadingPopup} from './loadingPopup';

export const loginWithFacebook = () => (dispatch) => {
    dispatch({
        type: actions.FBLOGIN_REQUEST
    });

    LoginManager.logOut();
    return LoginManager.logInWithReadPermissions(['public_profile', 'email'])
        .then(result => {
            if (result.isCancelled) {
                dispatch({
                    type: actions.FBLOGIN_CANCEL
                });
            } else {
                dispatch(showLoadingPopup());

                dispatch({
                    type: actions.FBLOGIN_SUCCESS
                });

                dispatch({
                    type: actions.APILOGIN_REQUEST
                });

                return AccessToken.getCurrentAccessToken()
                    .then(token => token.accessToken)
                    .then(fbAccessToken => facebookAuth(fbAccessToken))
                    .then(response => response.json())
                    .then(responseJson => {


                        if (responseJson) {
                            dispatch({
                                type: actions.APILOGIN_SUCCESS,
                                response: responseJson
                            })
                        } else {
                            dispatch({
                                type: actions.APILOGIN_FAIlURE,
                                error: new Error('Can\' login.')
                            })
                        }
                    })
                    .catch(error => {
                        dispatch({
                            type: actions.APILOGIN_FAIlURE,
                            error: error
                        });
                    })
                    .finally(() => {
                        dispatch(hideLoadingPopup());
                    });
            }
        })
        .catch((error) => {

            dispatch({
                type: actions.FBLOGIN_FAIlURE,
                error: error
            })
        })
};

export const cancelLoginWithFacebook = () => (dispatch) => {
    dispatch({
        type: actions.FBLOGIN_CANCEL
    });
};

export const logout = () => (dispatch) => {
    dispatch({
        type: actions.LOGOUT
    });
};