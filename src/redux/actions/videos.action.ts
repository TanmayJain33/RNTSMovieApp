import axios from 'axios';
import {API_KEY, BASE_URL} from '../../utilities/Config';
import {GET_MOVIE_VIDEOS, GET_TV_VIDEOS} from '../constants';

export const getMovieVideos = (movieId: any, language: string) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=${language}`;
      const res = await axios.get(API_URL);
      if (res.data.results) {
        dispatch({
          type: GET_MOVIE_VIDEOS,
          payload: res.data.results,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};

export const getTVVideos = (tvId: any, language: string) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/tv/${tvId}/videos?api_key=${API_KEY}&language=${language}`;
      const res = await axios.get(API_URL);
      if (res.data.results) {
        dispatch({
          type: GET_TV_VIDEOS,
          payload: res.data.results,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};
