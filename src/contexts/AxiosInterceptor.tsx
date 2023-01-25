import { useEffect } from "react";
import authorizedAxios from "../api/authorizedAxios";
import { refreshTokenExpired, getRefreshToken, setAccessToken } from "../utils/tokens";
import { useAuthStore } from "./AuthContex";


const AxiosInterceptor = ({ children }) => {
  const authStore = useAuthStore()

  useEffect(() => {
    const resInterceptor = (res) => {
      return res;
    }
    const errInterceptor = async (err) => {

      if (refreshTokenExpired()) {
        authStore.setLoggedIn(false)
        localStorage.clear()
        return Promise.reject(err);
      }

      const originalConfig = err.config;
      
      if (err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const response = await authorizedAxios.post('token/renew_access', { refresh_token: getRefreshToken() });
            const accessToken  = response.data.access_token;
            setAccessToken(accessToken)
            authorizedAxios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
            originalConfig.headers.Authorization = `Bearer ${accessToken}`
            return authorizedAxios(originalConfig);
          } catch (_error) {
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }

            return Promise.reject(_error);
          }
        }

        if (err.response.status === 403 && err.response.data) {
          return Promise.reject(err.response.data);
        }
      }

      return Promise.reject(err);
    }


    const interceptor = authorizedAxios.interceptors.response.use(resInterceptor, errInterceptor);

    return () => authorizedAxios.interceptors.response.eject(interceptor);

  }, [])

  return children;
}

export { AxiosInterceptor }