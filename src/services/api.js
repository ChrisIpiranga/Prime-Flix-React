import axiox from 'axios';

const api = axiox.create({
  baseURL: "https://api.themoviedb.org/3"
});

export default api;

