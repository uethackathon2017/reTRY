import * as actionTypes from '../../actions/types';

const result = (state = {
    selfScore: 0,
    opponentScore: 0,
    selfDataBeforeGame: {},
    opponentDataBeforeGame: {}
}, action) => {
    switch (action.type) {
        case actionTypes.GAME_END:
            return {
                selfScore: action.data.selfScore,
                opponentScore: action.data.opponentScore,
                selfDataBeforeGame: action.data.selfData,
                opponentDataBeforeGame: action.data.opponentData
            };
        default:
            return state;
    }
};

export default result;

export const getSelfScoreAfterGame = (state) => state.selfScore;
export const getOpponentScoreAfterGame = (state) => state.opponentScore;
export const getsSelfDataBeforeGame =  (state) => state.selfDataBeforeGame;
export const getOpponentDataBeforeGame = (state) => state.opponentDataBeforeGame;