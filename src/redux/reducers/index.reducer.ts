import {combineReducers} from 'redux';
import themeReducer from './theme.reducer';
import moviesReducer from './movies.reducer';
import tvReducer from './tv.reducer';
import peopleReducer from './people.reducer';
import videosReducer from './videos.reducer';
import reviewsReducer from './reviews.reducer';
import linksReducer from './links.reducer';
import settingReducer from './setting.reducer';
import favoritesReducer from './favorites.reducer';

export default combineReducers({
  themeReducer,
  moviesReducer,
  tvReducer,
  peopleReducer,
  videosReducer,
  reviewsReducer,
  linksReducer,
  settingReducer,
  favoritesReducer,
});
