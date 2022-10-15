import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index.reducer';

var middlewares = applyMiddleware(thunk);
export const store = createStore(reducers, middlewares);
