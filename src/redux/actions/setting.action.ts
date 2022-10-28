import axios from 'axios';
import {API_KEY, BASE_URL, SESSION_ID} from '../../utilities/Config';
import {GET_USER_DETAILS} from '../constants';

export const getUserDetails = () => {
  try {
    return async (dispatch: any) => {
      const API_URL = `${BASE_URL}/account?api_key=${API_KEY}&session_id=${SESSION_ID}`;
      const res = await axios.get(API_URL);
      if (res.data) {
        dispatch({
          type: GET_USER_DETAILS,
          payload: res.data,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {}
};
