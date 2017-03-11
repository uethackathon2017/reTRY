import {AsyncStorage, Platform} from 'react-native';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import {persistStore} from 'redux-persist';
import reducer from './reducers';
import createLogger from 'redux-logger';
const logger = createLogger();


export default function configureStore(onCompletion: ()=>void): any {
    const enhancer = compose(
        applyMiddleware(thunk, promise, logger)
    );

    const store = createStore(reducer,{}, enhancer);
    persistStore(store, {storage: AsyncStorage}, onCompletion);

    return store;
}
