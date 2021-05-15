import axios from 'axios';
import { createBrowserHistory } from 'history';

const api = axios.create({
  baseURL: 'http://localhost:3333/',
});
const token = localStorage.getItem('@Coal:token');

api.interceptors.response.use(
  response => response,
  error => {
    console.log(error.response.status);
    if (error.response.status === 403) {
      createBrowserHistory().push('/signout');
      createBrowserHistory().go(0);
    }
    return Promise.reject(error);
  },
);

api.defaults.headers.common.Authorization = `Bearer ${token}`;
export default api;
