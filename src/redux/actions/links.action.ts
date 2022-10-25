import axios from 'axios';
import {API_KEY, BASE_URL} from '../../utilities/Config';
import {GET_MOVIE_LINKS, GET_TV_LINKS} from '../constants';

export const getMovieLinks = (movieId: any) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/movie/${movieId}/external_ids?api_key=${API_KEY}`;
      const res = await axios.get(API_URL);
      if (res.data) {
        dispatch({
          type: GET_MOVIE_LINKS,
          payload: res.data,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};

export const getTVLinks = (tvId: any) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/tv/${tvId}/external_ids?api_key=${API_KEY}`;
      const res = await axios.get(API_URL);
      if (res.data) {
        dispatch({
          type: GET_TV_LINKS,
          payload: res.data,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};
