import {
  GET_DISCOVER_TV,
  GET_TRENDING_TV,
  GET_NOW_PLAYING_TV,
  GET_TOP_RATED_TV,
  GET_TV_DETAILS,
  GET_TV_IMAGES,
  GET_SIMILAR_TV,
} from '../constants';

const initialState = {
  discoverTV: [],
  trendingTV: [],
  nowPlayingTV: [],
  topRatedTV: [],
  tvDetails: [],
  tvImages: [],
  similarTV: [],
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
    case GET_TV_DETAILS:
      return {...state, tvDetails: action.payload};
    case GET_TV_IMAGES:
      return {...state, tvImages: action.payload};
    case GET_SIMILAR_TV:
      return {...state, similarTV: action.payload};
    default:
      return state;
  }
}

export default tvReducer;
