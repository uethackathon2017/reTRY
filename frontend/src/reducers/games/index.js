import {combineReducers} from 'redux';
import * as actionTypes from '../../actions/types';
import byId, * as fromById from './byId';
import ids, * as fromIds from './ids';
import currentGameId, * as fromCurrentGameId from './currentGameId';
import find, * as fromFind from './find';
import words, * as fromWord from './words';
import newWordsCountDown, * as fromNewWordsCountDown from './newWordsCountDown';
import gameCountDown, * as fromGameCountDown from './gameCountDown';
import score, * as fromScore from './score';
import currentAnswer, * as fromCurrentAnswer from './currentAnswer';
import currentRightAnswer, * as fromCurrentRightAnswer from './currentRightAnswer';
import result, * as fromResult from './result';

const games = combineReducers({
    byId,
    ids,
    currentGameId,
    find,
    words,
    newWordsCountDown,
    gameCountDown,
    score,
    currentAnswer,
    currentRightAnswer,
    result
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

export const getSelfData = (state) => {
    return fromFind.getSelfData(state.find);
}

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

export const getGameCountDown = (state) => {
    return fromGameCountDown.getGameCountDown(state.gameCountDown);
};

export const getSelfScore = (state) => {
    return fromScore.getSelfScore(state.score);
};

export const getOpponentScore = (state) => {
    return fromScore.getOpponentScore(state.score);
};

export const getCurrentAnswerKey = (state) => {
    return fromCurrentAnswer.getCurrentAnswerKey(state.currentAnswer);
};

export const getCurrentRightAnswerKey = (state) => {
    return fromCurrentRightAnswer.getCurrentRightAnswerKey(state.currentRightAnswer);
};

export const getSelfScoreAfterGame = (state) => {
    return fromResult.getSelfScoreAfterGame(state.result);
};

export const getOpponentScoreAfterGame = (state) => {
    return fromResult.getOpponentScoreAfterGame(state.result);
};

export const getsSelfDataBeforeGame = (state) => {
    return fromResult.getsSelfDataBeforeGame(state.result);
};

export const getOpponentDataBeforeGame = (state) => {
    return fromResult.getOpponentDataBeforeGame(state.result);
};

export const getCurrentGameIndexOverTotal = (state) => {
    return (fromIds.getGameIds(state.ids).indexOf(fromCurrentGameId.getCurrentGameId(state.currentGameId)) + 1) + "/" + fromIds.getGameIds(state.ids).length;
};