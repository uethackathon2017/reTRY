import * as actionTypes from '../../actions/types';

const byId = (state= {}, action) => {
    switch (action.type) {
        case actionTypes.GET_GAME_SUCCESS:
            return action.response.games.map((game) => {
                return game.id;
            });
        case actionTypes.GET_GAME_FAILURE:
        case actionTypes.GET_GAMES_REQUEST:
            return null;
        default:
            return state;
    }
};

export default byId;