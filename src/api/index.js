import axios from 'axios';
import useUserStore from '@/stores/user';
// Creating an instance
const instance = axios.create({
  baseURL: '/backend',
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const response = error.response;
    if (response.status === 401) {
      useUserStore().logoutFn(false);
    } else if (response.status === 403) {
      alert('Forbidden: ' + response.data.message);
    } else if (response.status === 404) {
      alert('Not Found: ' + response.data.message);
    } else if ([400, 422].includes(response.status)) {
      alert('Error: ' + response.data.message);
    } else if (response.status >= 500) {
      alert('Server Error: ' + response.data.message);
    } else {
      alert('Something went wrong.');
    }

    return Promise.reject(error);
  }
);

export default instance;
