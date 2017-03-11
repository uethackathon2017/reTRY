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
        method: 'GET',
        headers: {
            authorization: accessToken,
        }
    })
};

export const leaders = (accessToken) => {
    return fetch(config.apiUrl + '/users/getTopTenHighestLevel', {
        method: 'GET',
        headers: {
            authorization: accessToken,
        }
    })
};

export const topics = (accessToken) => {
    return fetch(config.apiUrl + '/games/getTopics', {
        method: 'GET',
        headers: {
            authorization: accessToken,
        }
    })
};

export const getVocaboraiesByTopicId = (accessToken, topicId) => {
    console.log("vocabularies api:")
    return fetch(config.apiUrl + '/games/getWordsByTopic?topicId=' + topicId, {
        method: 'GET',
        headers: {
            authorization: accessToken,
        },
    })
};