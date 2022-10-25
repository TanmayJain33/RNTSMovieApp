import {GET_MOVIE_VIDEOS, GET_TV_VIDEOS} from '../constants';

const initialState = {
  movieVideos: [],
  tvVideos: [],
};

function videosReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_MOVIE_VIDEOS:
      return {...state, movieVideos: action.payload};
    case GET_TV_VIDEOS:
      return {...state, tvVideos: action.payload};
    default:
      return state;
  }
}

export default videosReducer;
