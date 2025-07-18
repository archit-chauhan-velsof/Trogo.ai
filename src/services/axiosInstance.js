import axios from "axios";



export const axiosInstance = (token) =>  axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Authorization': `Bearer ${token}`,
    // 'Content-Type': 'application/json',
  }
});

export const axiosInstanceWithoutToken = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosInstanceWithoutBaseURL = (token) => axios.create({
  headers: {
    'Authorization': `Bearer ${token}`,
    // 'Content-Type': 'application/json',
  }
})