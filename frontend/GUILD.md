# UET - reTRY

> Develop uet reTRY

## Version
Status: Developing

Begin date: 10/03/2017

## Structure

Resource doc: /resource-doc

## Document

Detailed guides in /resource-doc

## Technology

### Front-end: Mobile app

React native

### Back-end: Webservice, websocket

NodeJs

Hapi

Mongo

Redis


## Requirement system


## Development


## Library

FB SDK

## Deployment

### Backend 

$ npm install 

$ mv env.example.json env.json

$ sudo mongod

$ redis-server

$ node app.js

### Frontend

$ npm i

$ react-native link

$ react-native run-ios

$ react-native run-android


## Members

Tran Minh Tuan - UET - tuantmtb@gmail.com

Nguyen Van Nhat - UET - nguyenvannhat152@gmail.com

Tran Viet Thang - UET - thangtv1702@gmail.com

Dang Hai Trieu - UET - dangtrieu25@gmail.com


## 
1. Action type
export const GET_VOCABULARIES_REQUEST = 'GET_VOCABULARIES_REQUEST';
export const GET_VOCABULARIES_SUCCESS = 'GET_VOCABULARIES_SUCCESS';
export const GET_VOCABULARIES_FAILURE = 'GET_VOCABULARIES_FAILURE';
2. Tạo action : vocabulary.js
để Thông báo cho UI
export const getVocabularies = (topicId) => (dispatch, getState) => {
    if (getVocabularyByTopic(getState())) {
        dispatch({
            type: actions.GET_VOCABULARIES_REQUEST,
        });

        profile(getAccessToken(getState()))
            .then(response => response.json())
            .then(responseJson => {
                dispatch({
                    type: actions.GET_VOCABULARIES_SUCCESS,
                    response: responseJson,
                });
            })
            .catch(error => {
                dispatch({
                    type: actions.GET_VOCABULARIES_FAILURE,
                    error: error,
                });
            });
    }
};
3. Viết API
export const getVocaboraiesByTopicId = (accessToken, topicId) => {
    console.log("vocabularies api:")
    return fetch(config.apiUrl + '/games/getWordsByTopic?topicId=' + topicId, {
        method: 'GET',
        headers: {
            authorization: accessToken,
        },
    })
};
4. Action creater
export const getTopics = () => (dispatch, getState) => {
    console.log("getTopic action");
    dispatch({
        type: actions.GET_TOPICS_REQUEST,
    });

    topics(getAccessToken(getState()))
        .then(response => response.json())
        .then(responseJson => {
            dispatch({
                type: actions.GET_TOPICS_SUCCESS,
                response: responseJson,
            });
        })
        .catch(error => {
            dispatch({
                type: actions.GET_TOPICS_FAILURE,
                error: error,
            });
        });
};

5. Reducer
Vocabulary:
topicById.js, topicIds, vocabularyIds, vocabularyById

6, Selecter
Lấy ra dữ liệu
