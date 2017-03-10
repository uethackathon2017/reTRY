import { cardStackReducer } from 'react-native-navigation-redux-helpers';

const initialState = {
    key: 'root',
    index: 0,
    routes: [
        {
            key: 'gameResult',
            index: 0,
        },
    ],
};

export default cardStackReducer(initialState);


//Selectors:
export const getRootNavigation = (state) => {
    return state;
};

export const getCurrentRootNavigationRouteKey = (state) => {
    return state.routes[state.routes.length - 1].key;
};