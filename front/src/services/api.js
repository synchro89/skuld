import axios from 'axios';
import storage from '@/utils/storage';

const kitsu = axios.create({
  baseURL: 'https://kitsu.io/api/edge/anime',
});

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

api.interceptors.request.use((config) => {
  const token = storage.getToken();

  const headers = { ...config.headers };

  if (token) headers.authorization = `Bearer ${token}`;

  return { ...config, headers };
});

export { api, kitsu };
