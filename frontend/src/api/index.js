import config from '../config';
import * as fromLogin from '../reducers';

export const facebookAuth = (fbAccessToken) => {
    return fetch(config.apiUrl + '/authentications/facebookAuth', {
        method: 'POST',
        headers: {
            authorization: fbAccessToken
        }
    })
};

export const find = () => (dispatch, getState) => {
    const accessToken = fromLogin.getAccessToken(getState());


};

export const profile = (accessToken) => {
    return fetch(config.apiUrl + '/users/getUserData', {
        method: 'POST',
        headers: {
            authorization: accessToken,
        }
    })
};