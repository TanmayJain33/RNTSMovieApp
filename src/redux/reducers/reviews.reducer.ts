import {GET_MOVIE_REVIEWS, GET_TV_REVIEWS} from '../constants';

const initialState = {
  movieReviews: [],
  tvReviews: [],
};

function reviewsReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_MOVIE_REVIEWS:
      return {...state, movieReviews: action.payload};
    case GET_TV_REVIEWS:
      return {...state, tvReviews: action.payload};
    default:
      return state;
  }
}

export default reviewsReducer;
