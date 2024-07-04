
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://GST-PORTAL.cfapps.eu10.hana.ondemand.com', 
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});


axiosInstance.interceptors.request.use(
  config => {
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // Handle request error here
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // Handle response data here
    return response;
  },
  error => {
    // Handle response error here
    if (error.response && error.response.status === 401) {
      // handle unauthorized error
      console.log('Unauthorized, redirecting to login...');
      // perform logout or redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
