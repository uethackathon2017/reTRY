import {combineReducers} from 'redux';
import * as actionTypes from '../../actions/types';

const byId = (state = {}, action) => {
    switch (action.type){
        case actionTypes.GET_GAME_SUCCESS:

            let newState = {};

            action.data.quizzes.map((quiz) => {
                quiz.relatedWords.map((word) => {
                    if (!state[word._id]) {
                        newState[word._id] = word;
                    }
                });
            });

            return newState;
        default:
            return state;
    }
};

const ids = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_GAME_SUCCESS:

            let newState = [];

            action.data.quizzes.map((quiz) => {
                quiz.relatedWords.map((word) => {
                    if (newState.indexOf(word._id) === -1) {
                        newState.push(word._id);
                    }
                })
            });

            return newState;
        default:
            return state;
    }
};

export const getAllWords = (state) => {

    return state.ids.map((id) => {
        return state.byId[id];
    })
};

export default combineReducers({
    byId,
    ids
});
