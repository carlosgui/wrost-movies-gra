import axios from "axios";

const api = axios.create({
  baseURL: "https://tools.texoit.com/backend-java/api/movies",
});

export default api;
