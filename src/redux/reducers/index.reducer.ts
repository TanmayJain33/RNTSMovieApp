import {combineReducers} from 'redux';
import themeReducer from './theme.reducer';
import moviesReducer from './movies.reducer';
import tvReducer from './tv.reducer';

export default combineReducers({
  themeReducer,
  moviesReducer,
  tvReducer,
});
