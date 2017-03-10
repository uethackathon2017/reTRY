import {actions} from 'react-native-navigation-redux-helpers';
import {getGameNavigation, getCurrentGameNavigationRouteKey} from '../reducers';

const {
    replaceAt,
    popRoute,
    pushRoute,
} = actions;

export const navReplaceAt = (route) => (dispatch, getState) => {
    const state = getState();
    const navigation = getGameNavigation(state);
    const currentRouteKey = getCurrentGameNavigationRouteKey(state);
    dispatch(replaceAt(currentRouteKey, {key: route, index: 1}, navigation.key));
};

export const navPopRoute = () => (dispatch, getState) => {
    const state = getState();
    const navigation = getGameNavigation(state);
    dispatch(popRoute(navigation.key));
};

export const navPushRoute = (route) => (dispatch, getState) => {
    const state = getState();
    const navigation = getGameNavigation(state);
    dispatch(pushRoute({key: route, index: 1}, navigation.key));
};