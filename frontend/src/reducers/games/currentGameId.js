import * as actionTypes from '../../actions/types';


const currentGameId = (state = "", action) => {
    switch (action.type){
        case actionTypes.GET_GAME_SUCCESS:
            return action.data.quizzes[0]._id;
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