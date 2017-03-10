import * as types from '../actions/types';

const initialState = {
    show : false,
    title: '',
    subTitle: ''
};

const loadingPopup = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_LOADING_POPUP:
            return {
                show: true,
                title: action.title,
                subtitle: action.subTitle
            };
        case types.HIDE_LOADING_POPUP:
            return {
                show: false,
                title: '',
                subtitle: ''
            };
        default:
            return state
    }
};

export default loadingPopup;


//Selectors:
export const getIsShowing = (state) => {
    return state.show;
};