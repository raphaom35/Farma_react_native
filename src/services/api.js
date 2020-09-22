import axios from 'axios';

const api = axios.create({
  baseURL: 'https://farmacia20-09-20.herokuapp.com',
  // baseURL: 'http://192.168.0.100:3000',
});

export default api;
