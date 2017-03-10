import {combineReducers} from 'redux';

import rootNavigation, * as fromRootNavigation from './rootNavigation';
import login, * as fromLogin from './login';
import loadingPopup, * as fromLoadingPopup from './loadingPopup';
import gameNavigation, * as fromGameNavigation from './gameNavigation';
import games, * as fromGames from './games';
import profile, * as fromProfile from './profile';
import leaders, * as fromLeaders from './leaders';

export default combineReducers({
    rootNavigation,
    login,
    loadingPopup,
    games,
    gameNavigation,
    profile,
    leaders,
});


// Selectors:
/**
 * Get root navigation
 * @param state
 */
export const getRootNavigation = (state) => {
    return fromRootNavigation.getRootNavigation(state.rootNavigation);
};

/**
 * Get current route key of game navigation
 * @param state
 */
export const getCurrentGameNavigationRouteKey = (state) => {
    return fromGameNavigation.getCurrentGameNavigationRouteKey(state.gameNavigation);
};

/**
 * Get game navigation
 * @param state
 */
export const getGameNavigation = (state) => {
    return fromGameNavigation.getGameNavigation(state.gameNavigation);
};

/**
 * Get current route key of root navigation
 * @param state
 */
export const getCurrentRootNavigationRouteKey = (state) => {
    return fromRootNavigation.getCurrentRootNavigationRouteKey(state.rootNavigation);
};

/**
 * get login status
 * @param state
 */
export const getLoginStatus = (state) => {
    return fromLogin.getLoginStatus(state.login);
};

export const getAccessToken = (state) => {
    return fromLogin.getAccessToken(state.login);
};

/**
 * get error message of login
 * @param state
 */
export const getLoginErrorMessage = (state) => {
    return fromLogin.getLoginErrorMessage(state.login);
};

/**
 * check if loading popup is being showed
 * @param state
 */
export const getIsLoadingPopupShowing = (state) => {
    return fromLoadingPopup.getIsShowing(state.loadingPopup);
};

/**
 * check find status
 * @param state
 */
export const getFindStatus = (state) => {
    return fromGames.getFindStatus(state.games);
};

/**
 * get oponent data
 * @param state
 */
export const getOpponentData = (state) => {
    return fromGames.getOpponentData(state.games);
};

/**
 * get count down second amount
 * @param state
 */
export const getCountDown = (state) => {
    return fromGames.getCountDown(state.games);
};

/**
 * get all words of current game
 * @param state
 */
export const getAllWords = (state) => {
    return fromGames.getAllWords(state.games);
};

/**
 * get user profile
 * @param state
 */
export const getProfile = (state) => {
    return fromProfile.getProfile(state.profile);
};


/**
 * Get current game id
 * @param state
 */
export const getCurrentGameId = (state) => {
    return fromGames.getCurrentGameId(state.games);
};

/**
 * Get current game
 * @param state
 */
export const getCurrentGame = (state) => {
    return  fromGames.getCurrentGame(state.games);
};

/**
 * get all game ids
 * @param state
 */
export const getGameIds = (state) => {
    return fromGames.getGameIds(state.games);
};

/**
 * get new words count down
 * @param state
 */
export const getNewWordsCountDown = (state) => {
    return fromGames.getNewWordsCountDown(state.games);
};

export const getLeaders = (state) => {
    return fromLeaders.getLeaders(state.leaders);
};

export const checkShouldGetApi = (state) => {
    return fromProfile.checkShouldGetApi(state.profile);
};