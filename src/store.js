import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './state/reducer';
import saga from './state/saga';

import actions from './state/actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
window.__store__ = store;

saga.forEach(sagaItem => sagaMiddleware.run(sagaItem))

export default store;