import * as actionTypes from './types';

export const showLoadingPopup = (title = 'Loading...', subTitle='Please wait.') => ({
    type: actionTypes.SHOW_LOADING_POPUP,
    title,
    subTitle
});

export const hideLoadingPopup = () => ({
    type: actionTypes.HIDE_LOADING_POPUP,
});