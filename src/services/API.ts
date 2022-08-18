import {API_KEY, BASE_URL, SESSION_ID} from '../utilities/Config';

export const GET = async (url: any, region?: any) => {
  const API_URL = region
    ? `${BASE_URL}${url}?api_key=${API_KEY}&region=${region}`
    : `${BASE_URL}${url}?api_key=${API_KEY}`;
  const response = await fetch(API_URL, {method: 'GET'});
  const responseJson = await response.json();
  return responseJson;
};

export const GETFAV = async () => {
  const API_URL = `${BASE_URL}/account/{account_id}/favorite/movies?api_key=${API_KEY}&session_id=${SESSION_ID}`;
  const response = await fetch(API_URL, {method: 'GET'});
  const responseJson = await response.json();
  return responseJson;
};

export const POST = async (
  url: any,
  media_type: string,
  media_id: any,
  favorite: boolean,
) => {
  const API_URL = `${BASE_URL}${url}?api_key=${API_KEY}&session_id=${SESSION_ID}`;
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      media_type: media_type,
      media_id: media_id,
      favorite: favorite,
    }),
  });
  const responseJson = await response.json();
  return responseJson;
};
