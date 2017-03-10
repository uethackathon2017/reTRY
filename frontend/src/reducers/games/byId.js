import * as actionTypes from '../../actions/types';

const byId = (state= {}, action) => {
    switch (action.type) {
        case actionTypes.GET_GAME_SUCCESS:

            let quizzes = {};

            action.data.quizzes.map((quiz) => {
                quizzes[quiz._id] = {
                    ...quiz,
                    relatedWords: quiz.relatedWords.map((word) => {
                        return word._id;
                    })
                };
            });

            return quizzes;
        case actionTypes.GET_GAME_FAILURE:
        case actionTypes.GET_GAMES_REQUEST:
            return null;
        default:
            return state;
    }
};

export default byId;

export const getGameWithId = (state, id) => {
    return state[id];
};