import { cardStackReducer } from 'react-native-navigation-redux-helpers';

const initialState = {
    key: 'game',
    index: 0,
    routes: [
        {
            key: 'missing_character',
            index: 0,
        },
    ],
};

export default cardStackReducer(initialState);


//Selectors:
export const getGameNavigation = (state) => {
    return state;
};

export const getCurrentGameNavigationRouteKey = (state) => {
    return state.routes[state.routes.length - 1].key;
};