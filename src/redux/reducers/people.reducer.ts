import {GET_MOVIE_PEOPLE, GET_TV_PEOPLE} from '../constants';

const initialState = {
  moviePeople: [],
  tvPeople: [],
};

function peopleReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_MOVIE_PEOPLE:
      return {...state, moviePeople: action.payload};
    case GET_TV_PEOPLE:
      return {...state, tvPeople: action.payload};
    default:
      return state;
  }
}

export default peopleReducer;
