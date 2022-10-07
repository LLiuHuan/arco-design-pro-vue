import axios from 'axios';
import qs from 'qs';

export const getAccessToken = (url: string, params: any) => {
  // return service({
  //   url,
  //   method: 'post',
  // });

  return axios.post(url, qs.stringify(params), {
    headers: {
      Accept: 'application/json',
    },
  });
};
