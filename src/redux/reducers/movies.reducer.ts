import {
  GET_DISCOVER_MOVIES,
  GET_TRENDING_MOVIES,
  GET_NOW_PLAYING_MOVIES,
  GET_TOP_RATED_MOVIES,
  GET_MOVIE_DETAILS,
  GET_MOVIE_IMAGES,
  GET_SIMILAR_MOVIES,
} from '../constants';

const initialState = {
  discoverMovies: [],
  trendingMovies: [],
  nowPlayingMovies: [],
  topRatedMovies: [],
  movieDetails: [],
  similarMovies: [],
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
    case GET_MOVIE_DETAILS:
      return {...state, movieDetails: action.payload};
    case GET_MOVIE_IMAGES:
      return {...state, movieImages: action.payload};
    case GET_SIMILAR_MOVIES:
      return {...state, similarMovies: action.payload};
    default:
      return state;
  }
}

export default moviesReducer;
