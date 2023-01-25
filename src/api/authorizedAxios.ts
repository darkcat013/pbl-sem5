import axios from "axios"
import { getAccessToken, refreshTokenExpired, getRefreshToken, setAccessToken } from '../utils/tokens';

const authorizedAxios = axios.create()

authorizedAxios.interceptors.request.use(
  (config) => {
    config.baseURL = import.meta.env.VITE_API_ADDRESS
    config.headers.Authorization = `Bearer ${getAccessToken()}`
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
)

export default authorizedAxios