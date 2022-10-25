import {GET_MOVIE_LINKS, GET_TV_LINKS} from '../constants';

const initialState = {
  movieLinks: [],
  tvLinks: [],
};

function linksReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_MOVIE_LINKS:
      return {...state, movieLinks: action.payload};
    case GET_TV_LINKS:
      return {...state, tvLinks: action.payload};
    default:
      return state;
  }
}

export default linksReducer;
