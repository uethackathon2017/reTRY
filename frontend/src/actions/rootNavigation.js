import {actions} from 'react-native-navigation-redux-helpers';
import {getRootNavigation, getCurrentRootNavigationRouteKey} from '../reducers';

const {
    replaceAt,
    popRoute,
    pushRoute,
    reset
} = actions;

export const navReplaceAt = (route) => (dispatch, getState) => {
    const state = getState();
    const navigation = getRootNavigation(state);
    const currentRouteKey = getCurrentRootNavigationRouteKey(state);
    dispatch(replaceAt(currentRouteKey, {key: route, index: 1}, navigation.key));
};

export const navPopRoute = () => (dispatch, getState) => {
    const state = getState();
    const navigation = getRootNavigation(state);
    dispatch(popRoute(navigation.key));
};

export const navPushRoute = (route) => (dispatch, getState) => {
    const state = getState();
    const navigation = getRootNavigation(state);
    dispatch(pushRoute({key: route, index: 1}, navigation.key));
};

export const navReset = () => (dispatch, getState) => {
    dispatch(reset())
};