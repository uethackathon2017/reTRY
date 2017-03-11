import * as actionTypes from '../../actions/types';


const currentGameId = (state = "", action) => {
    switch (action.type){
        case actionTypes.SHOW_GAME:
            return action.id;
        default:
            return state;
    }
};

export default currentGameId;

//Selectors:
export const getCurrentGameId = (state) => {
    return state;
};