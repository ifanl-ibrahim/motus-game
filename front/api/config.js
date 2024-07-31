import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  responseType: 'json',
});

axiosInstance.interceptors.request.use(function (request) {
  if (localStorage.getItem('authenticationToken') && localStorage.getItem('authenticationToken') != "null") {
    request.headers['Authorization'] = `Bearer ${localStorage.getItem('authenticationToken')}`
  }
  return request
}, function (error) {
  console.log(error)
  return Promise.reject(error)
})

export default axiosInstance;
