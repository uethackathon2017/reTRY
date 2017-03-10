import * as actionTypes from '../../actions/types';

const ids = (state= [], action) => {
    switch (action.type) {
        case actionTypes.GET_GAME_SUCCESS:
            return action.response.games.map((game) => {
                return game.id;
            });
        case actionTypes.GET_GAME_FAILURE:
        case actionTypes.GET_GAMES_REQUEST:
            return [];
        default:
            return state;
    }
};

export default ids;