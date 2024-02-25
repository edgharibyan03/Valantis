import axios from 'axios';
import keys from './keys';
import generateCurrentDate from '../utils/date';

import md5 from 'md5'

const API = axios.create({
  baseURL: keys.SERVER_URL,
  responseType: 'json',
  timeout: 10000,
});


API.interceptors.request.use(
  req => {
    req.headers["x-auth"] = md5(`${import.meta.env.VITE_API_PASS}_${generateCurrentDate()}`)

    return req
  },
)

export default API;