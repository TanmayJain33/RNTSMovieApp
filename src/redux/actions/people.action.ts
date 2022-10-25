import axios from 'axios';
import {API_KEY, BASE_URL} from '../../utilities/Config';
import {GET_MOVIE_PEOPLE, GET_TV_PEOPLE} from '../constants';

export const getMoviePeople = (movieId: any) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;
      const res = await axios.get(API_URL);
      if (res.data.cast) {
        dispatch({
          type: GET_MOVIE_PEOPLE,
          payload: res.data.cast,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};

export const getTVPeople = (tvId: any) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/tv/${tvId}/credits?api_key=${API_KEY}`;
      const res = await axios.get(API_URL);
      if (res.data.cast) {
        dispatch({
          type: GET_TV_PEOPLE,
          payload: res.data.cast,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};
