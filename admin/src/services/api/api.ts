import axios from 'axios';
import { SERVER_URL } from '~/configs';
import { PERSIST_STORE_NAME } from '~/constants/app.constant';
import deepParseJson from '~/utility/deepParseJson';
import store from '~/store';

const apiClient = axios.create({
  //   baseURL: 'http://localhost:8000',
  baseURL: `${SERVER_URL}/api/v1`,
});

apiClient.interceptors.request.use(
  (config) => {
    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME);
    const persistData = deepParseJson(rawPersistData);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let accessToken = (persistData as any).auth.session.token;

    if (!accessToken) {
      const { auth } = store.getState();
      accessToken = auth.session.token;
    }

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const get = async (endpoint: string) => {
  return await apiClient.get(endpoint);
};

export const post = async (endpoint: string, data: any) => {
  return await apiClient.post(endpoint, data);
};

export const patch = async (endpoint: string, data: any) => {
  return await apiClient.patch(endpoint, data);
};

export const deleteApi = async (endpoint: string) => {
  return await apiClient.delete(endpoint);
};
export const multiDeleteCageHomeApi = async (endpoint: string, data) => {
  return await apiClient.delete(endpoint, {
    data,
  });
};
export const multiPublishCareHomes = async (endpoint: string, data) => {
  return await apiClient.put(endpoint, data);
};
export const multiVerifiedCareHomes = async (endpoint: string, data) => {
  return await apiClient.put(endpoint, data);
};

export const put = async (endpoint: string, data: any) => {
  return await apiClient.put(endpoint, data);
};
