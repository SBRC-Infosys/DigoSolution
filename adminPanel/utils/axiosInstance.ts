
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api', // base url
});

export default axiosInstance;
