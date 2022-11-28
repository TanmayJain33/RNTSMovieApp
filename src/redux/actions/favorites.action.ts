import axios from 'axios';
import {Alert} from 'react-native';
import {API_KEY, BASE_URL, SESSION_ID} from '../../utilities/Config';
import {GET_FAVORITE_MOVIES, GET_FAVORITE_TV} from '../constants';

export const getFavoriteMovies = (selectedLanguage: string) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/account/{account_id}/favorite/movies?api_key=${API_KEY}&session_id=${SESSION_ID}&language=${selectedLanguage}`;
      const res = await axios.get(API_URL);
      if (res.data.results) {
        dispatch({
          type: GET_FAVORITE_MOVIES,
          payload: res.data.results,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};

export const postMoviesAsFavorite = (
  movieId: any,
  text: string,
  buttonText: string,
) => {
  try {
    return async () => {
      const API_URL = `${BASE_URL}/account/{account_id}/favorite?api_key=${API_KEY}&session_id=${SESSION_ID}`;
      const res = await axios.post(
        API_URL,
        {
          media_type: 'movie',
          media_id: movieId,
          favorite: true,
        },
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
        },
      );
      if (res.data.success) {
        Alert.alert(text, '', [
          {
            text: buttonText,
          },
        ]);
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};

export const postMoviesAsUnFavorite = (
  movieId: any,
  text: string,
  buttonText: string,
) => {
  try {
    return async () => {
      const API_URL = `${BASE_URL}/account/{account_id}/favorite?api_key=${API_KEY}&session_id=${SESSION_ID}`;
      const res = await axios.post(
        API_URL,
        {
          media_type: 'movie',
          media_id: movieId,
          favorite: false,
        },
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
        },
      );
      if (res.data.success) {
        Alert.alert(text, '', [
          {
            text: buttonText,
          },
        ]);
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};

export const getFavoriteTV = (selectedLanguage: string) => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/account/{account_id}/favorite/tv?api_key=${API_KEY}&session_id=${SESSION_ID}&language=${selectedLanguage}`;
      const res = await axios.get(API_URL);
      if (res.data.results) {
        dispatch({
          type: GET_FAVORITE_TV,
          payload: res.data.results,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};

export const postTVAsFavorite = (
  TVId: any,
  text: string,
  buttonText: string,
) => {
  try {
    return async () => {
      const API_URL = `${BASE_URL}/account/{account_id}/favorite?api_key=${API_KEY}&session_id=${SESSION_ID}`;
      const res = await axios.post(
        API_URL,
        {
          media_type: 'tv',
          media_id: TVId,
          favorite: true,
        },
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
        },
      );
      if (res.data.success) {
        Alert.alert(text, '', [
          {
            text: buttonText,
          },
        ]);
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};

export const postTVAsUnFavorite = (
  TVId: any,
  text: string,
  buttonText: string,
) => {
  try {
    return async () => {
      const API_URL = `${BASE_URL}/account/{account_id}/favorite?api_key=${API_KEY}&session_id=${SESSION_ID}`;
      const res = await axios.post(
        API_URL,
        {
          media_type: 'tv',
          media_id: TVId,
          favorite: false,
        },
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
        },
      );
      if (res.data.success) {
        Alert.alert(text, '', [
          {
            text: buttonText,
          },
        ]);
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};
