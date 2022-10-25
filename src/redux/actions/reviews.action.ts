import axios from 'axios';
import {API_KEY, BASE_URL} from '../../utilities/Config';
import {GET_MOVIE_REVIEWS, GET_TV_REVIEWS} from '../constants';

export const getMovieReviews = (movieId: any) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`;
      const res = await axios.get(API_URL);
      if (res.data.results) {
        dispatch({
          type: GET_MOVIE_REVIEWS,
          payload: res.data.results,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};

export const getTVReviews = (tvId: any) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/tv/${tvId}/reviews?api_key=${API_KEY}`;
      const res = await axios.get(API_URL);
      if (res.data.results) {
        dispatch({
          type: GET_TV_REVIEWS,
          payload: res.data.results,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};
