import storage from './storage';
import config from './../configs/index';
import axios, { AxiosError, AxiosResponse } from 'axios';

const request = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: config.API_ROOT,
  params: {}
});

request.interceptors.request.use(
  (config) => {
    const token = storage.get('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.log(error);
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const statusCode = error.response?.status;
    console.log('error', error?.response);
    if (statusCode === 401) {
      window.localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export { request };
