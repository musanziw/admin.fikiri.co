import axios from '@/app/config/axios';

export async function _post(url: string, payload: any) {
  let response: any;
  let error: string = '';

  try {
    const { data } = await axios.post(url, JSON.stringify(payload));
    response = data;
  } catch (e: any) {
    error = e.response.data.message;
  }
  return {
    response,
    error,
  };
}

