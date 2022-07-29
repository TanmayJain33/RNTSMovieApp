/* eslint-disable prettier/prettier */
import { API_KEY, BASE_URL } from '../utilities/Config';

export const GET = async (url: any) => {
   const API_URL = `${BASE_URL}${url}?api_key=${API_KEY}`;
   const response = await fetch(API_URL, { method: 'GET' });
   const responseJson = await response.json();
   return responseJson;
};
