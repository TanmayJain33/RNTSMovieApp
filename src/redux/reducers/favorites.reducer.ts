import {GET_FAVORITE_MOVIES, GET_FAVORITE_TV} from '../constants';

const initialState = {
  favoriteMovies: [],
  favoriteTV: [],
};

function favoritesReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_FAVORITE_MOVIES:
      return {...state, favoriteMovies: action.payload};
    case GET_FAVORITE_TV:
      return {...state, favoriteTV: action.payload};
    default:
      return state;
  }
}

export default favoritesReducer;
