import {combineReducers} from 'redux';
import * as actionTypes from '../../actions/types';
import byId from './byId';
import ids from './ids';
import currentGame from './currentGameId';
import errorMessage from './errorMessage';
import isFetching from './isFetching';
import rivalPlayer from './rivalPlayer';
import find, * as fromFind from './find';
import words, * as fromWord from './words';

const games = combineReducers({
    byId,
    ids,
    currentGame,
    errorMessage,
    isFetching,
    rivalPlayer,
    find,
    words
});

export default games;

// Selectors

// export const getCurrentGame = (state) => {
//     return state.byId[state.currentGameId];
// };
//
// export const getCurrentGameIndex = (state) => {
//     return state.ids.indexOf(state.currentGameId);
// };
//
// export const getUserAnswerForCurrentGame = (state) => {
//     let game = getCurrentGame(state);
//     return game.answerById[game.userAnswerId];
// };

export const getFindStatus = (state) => {
    return fromFind.getFindStatus(state.find);
};

export const getOpponentData = (state) => {
    return fromFind.getOpponentData(state.find);
};

export const getCountDown = (state) => {
    return fromFind.getCountDown(state.find);
};

export const getAllWords = (state) => {
    return fromWord.getAllWords(state.words);
};