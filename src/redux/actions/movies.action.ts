import axios from 'axios';
import {API_KEY, BASE_URL} from '../../utilities/Config';
import {
  GET_DISCOVER_MOVIES,
  GET_NOW_PLAYING_MOVIES,
  GET_TRENDING_MOVIES,
  GET_TOP_RATED_MOVIES,
  GET_MOVIE_DETAILS,
  GET_MOVIE_IMAGES,
  GET_SIMILAR_MOVIES,
} from '../constants';

export const getDiscoverMovies = (language: string) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${language}`;
      const res = await axios.get(API_URL);
      if (res.data.results) {
        dispatch({
          type: GET_DISCOVER_MOVIES,
          payload: res.data.results,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};

export const getTrendingMovies = (language: string) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=${language}`;
      const res = await axios.get(API_URL);
      if (res.data.results) {
        dispatch({
          type: GET_TRENDING_MOVIES,
          payload: res.data.results,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};

export const getNowPlayingMovies = (language: string) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&region=IN&language=${language}`;
      const res = await axios.get(API_URL);
      if (res.data.results) {
        dispatch({
          type: GET_NOW_PLAYING_MOVIES,
          payload: res.data.results,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};

export const getTopRatedMovies = (language: string) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=${language}`;
      const res = await axios.get(API_URL);
      if (res.data.results) {
        dispatch({
          type: GET_TOP_RATED_MOVIES,
          payload: res.data.results,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};

export const getSimilarMovies = (movieId: any, language: string) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=${language}`;
      const res = await axios.get(API_URL);
      if (res.data.results) {
        dispatch({
          type: GET_SIMILAR_MOVIES,
          payload: res.data.results,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};

export const getMovieDetails = (movieId: any, language: string) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${language}`;
      const res = await axios.get(API_URL);
      if (res.data) {
        dispatch({
          type: GET_MOVIE_DETAILS,
          payload: res.data,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};

export const getMovieImages = (movieId: any) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/movie/${movieId}/images?api_key=${API_KEY}`;
      const res = await axios.get(API_URL);
      if (res.data) {
        dispatch({
          type: GET_MOVIE_IMAGES,
          payload: res.data,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};
