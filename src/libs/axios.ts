import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { set } from 'lodash-es';

const apiKey = import.meta.env.VITE_API_KEY;

const axiosClient = axios.create({
  baseURL: '/api/',
});

axiosClient.interceptors.request.use((config) => {
  set(config, 'params.apiKey', apiKey);
  return config;
}, Promise.reject);

type ParamsFn<P> = (params: P) => AxiosRequestConfig;

function createRequest<P, T>(paramsFn: ParamsFn<P>) {
  return async (params: P, config: AxiosRequestConfig = {}) => {
    const response = await axiosClient.request<T>({
      ...paramsFn(params),
      ...config,
    });

    return response.data;
  };
}

export {
  axiosClient,
  createRequest,
};
