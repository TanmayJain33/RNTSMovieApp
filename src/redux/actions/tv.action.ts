import axios from 'axios';
import {API_KEY, BASE_URL} from '../../utilities/Config';
import {
  GET_DISCOVER_TV,
  GET_TRENDING_TV,
  GET_NOW_PLAYING_TV,
  GET_TOP_RATED_TV,
  GET_TV_DETAILS,
  GET_TV_IMAGES,
  GET_SIMILAR_TV,
} from '../constants';

export const getDiscoverTV = (language: string) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=${language}`;
      const res = await axios.get(API_URL);
      if (res.data.results) {
        dispatch({
          type: GET_DISCOVER_TV,
          payload: res.data.results,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};

export const getTrendingTV = (language: string) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=${language}`;
      const res = await axios.get(API_URL);
      if (res.data.results) {
        dispatch({
          type: GET_TRENDING_TV,
          payload: res.data.results,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};

export const getNowPlayingTV = (language: string) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=${language}`;
      const res = await axios.get(API_URL);
      if (res.data.results) {
        dispatch({
          type: GET_NOW_PLAYING_TV,
          payload: res.data.results,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};

export const getTopRatedTV = (language: string) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=${language}`;
      const res = await axios.get(API_URL);
      if (res.data.results) {
        dispatch({
          type: GET_TOP_RATED_TV,
          payload: res.data.results,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};

export const getSimilarTV = (tvId: any, language: string) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/tv/${tvId}/similar?api_key=${API_KEY}&language=${language}`;
      const res = await axios.get(API_URL);
      if (res.data.results) {
        dispatch({
          type: GET_SIMILAR_TV,
          payload: res.data.results,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};

export const getTVDetails = (tvId: any, language: string) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&language=${language}`;
      const res = await axios.get(API_URL);
      if (res.data) {
        dispatch({
          type: GET_TV_DETAILS,
          payload: res.data,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};

export const getTVImages = (tvId: any) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/tv/${tvId}/images?api_key=${API_KEY}`;
      const res = await axios.get(API_URL);
      if (res.data) {
        dispatch({
          type: GET_TV_IMAGES,
          payload: res.data,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};
