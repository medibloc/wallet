import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import throttle from 'lodash.throttle';

import actionTypes from '../constants/actions';
import * as reducers from './reducers';
import middleWares from './middlewares';
import savedAccountsSubscriber from './subscribers/savedAccounts';
import settingsSubscriber from './subscribers/settings';
import pendingTxSubscriber from './subscribers/transactions';

const App = combineReducers(reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
  predicate: (getState, action) => action.type !== '',
});

const store = createStore(App, composeEnhancers(applyMiddleware(...middleWares.concat(logger))));

store.dispatch({ type: actionTypes.storeCreated });
// throttle prevents subscribers called too often to prevent poor performance
store.subscribe(throttle(savedAccountsSubscriber.bind(null, store), 1000));
store.subscribe(throttle(settingsSubscriber.bind(null, store), 1000));
store.subscribe(throttle(pendingTxSubscriber.bind(null, store), 5000));


// ignore this in coverage as it is hard to test and does not run in production
/* istanbul ignore if */
if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextReducer = combineReducers(require('./reducers'));
    store.replaceReducer(nextReducer);
  });
}

export default store;
