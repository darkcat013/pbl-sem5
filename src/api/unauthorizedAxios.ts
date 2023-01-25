import axios from 'axios';

const unauthorizedAxios = axios.create({
  baseURL: import.meta.env.VITE_API_ADDRESS
})

export default unauthorizedAxios