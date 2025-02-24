import axios from "axios";
import { useUserStore } from "@/stores/user";

// Creating an instance
const instance = axios.create({
  baseURL:
    import.meta.env.VITE_USE_PROXY === "true"
      ? import.meta.env.VITE_API_PROXY_PATH
      : import.meta.env.VITE_API_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
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
    const status = response.status;
    const data = response.data;
    const message = data.message;

    if (status === 401) {
      useUserStore().logout(false);
    } else if (status === 403) {
      alert("Forbidden: " + message);
    } else if (status === 404) {
      alert("Not Found: " + message);
    } else if ([400, 422].includes(status)) {
      alert("Error: " + message);
    } else if (status >= 500) {
      alert("Server Error: " + message);
    } else {
      alert("Something went wrong.");
    }

    return Promise.reject(error);
  }
);

export default instance;
