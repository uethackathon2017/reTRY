import {combineReducers} from 'redux';
import * as actionTypes from '../../actions/types';
import byId, * as fromById from './byId';
import ids, * as fromIds from './ids';
import currentGameId, * as fromCurrentGameId from './currentGameId';
import errorMessage from './errorMessage';
import isFetching from './isFetching';
import rivalPlayer from './rivalPlayer';
import find, * as fromFind from './find';
import words, * as fromWord from './words';
import newWordsCountDown, * as fromNewWordsCountDown from './newWordsCountDown';

const games = combineReducers({
    byId,
    ids,
    currentGameId,
    errorMessage,
    isFetching,
    rivalPlayer,
    find,
    words,
    newWordsCountDown
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

export const getCurrentGameId = (state) => {
    return fromCurrentGameId.getCurrentGameId(state.currentGameId);
};

export const getCurrentGame = (state) => {
    return fromById.getGameWithId(state.byId, getCurrentGameId(state));
};

export const getGameIds = (state) => {
    return fromIds.getGameIds(state.ids);
};

export const getNewWordsCountDown = (state) => {
    return fromNewWordsCountDown.getNewWordsCountDown(state.newWordsCountDown);
};