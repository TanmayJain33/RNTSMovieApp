import {
  GET_DISCOVER_MOVIES,
  GET_TRENDING_MOVIES,
  GET_NOW_PLAYING_MOVIES,
  GET_TOP_RATED_MOVIES,
} from '../constants';

const initialState = {
  discoverMovies: [],
  trendingMovies: [],
  nowPlayingMovies: [],
  topRatedMovies: [],
};

function moviesReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_DISCOVER_MOVIES:
      return {...state, discoverMovies: action.payload};
    case GET_TRENDING_MOVIES:
      return {...state, trendingMovies: action.payload};
    case GET_NOW_PLAYING_MOVIES:
      return {...state, nowPlayingMovies: action.payload};
    case GET_TOP_RATED_MOVIES:
      return {...state, topRatedMovies: action.payload};
    default:
      return state;
  }
}

export default moviesReducer;
