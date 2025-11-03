import axios from "axios";

// Membuat instance axios
export const api = axios.create({
  baseURL: "http://localhost:5018/",
  // baseURL: "https://api-arsip-surat.psti-ubl.id/",
  withCredentials: true // Memastikan cookies dikirim dalam setiap request
});

// Tambahkan interceptors untuk request
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Tambahkan interceptors untuk response
api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await api.post('/user/refreshtoken', {}, {
          withCredentials: true // Memastikan cookies dikirim dalam request
        });
        // console.log(response)
        const newToken = response.data.accessToken;
        localStorage.setItem('access-token', newToken);
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);
        // Redirect to login or handle error as needed
      }
    }
    return Promise.reject(error);
  }
);

export const region = axios.create({
  baseURL: "http://localhost:3002/"
});