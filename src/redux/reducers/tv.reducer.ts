import {
  GET_DISCOVER_TV,
  GET_TRENDING_TV,
  GET_NOW_PLAYING_TV,
  GET_TOP_RATED_TV,
} from '../constants';

const initialState = {
  discoverTV: [],
  trendingTV: [],
  nowPlayingTV: [],
  topRatedTV: [],
};

function tvReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_DISCOVER_TV:
      return {...state, discoverTV: action.payload};
    case GET_TRENDING_TV:
      return {...state, trendingTV: action.payload};
    case GET_NOW_PLAYING_TV:
      return {...state, nowPlayingTV: action.payload};
    case GET_TOP_RATED_TV:
      return {...state, topRatedTV: action.payload};
    default:
      return state;
  }
}

export default tvReducer;
