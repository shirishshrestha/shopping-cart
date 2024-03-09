import axios from "axios";

const jsonApi = import.meta.env.VITE_JSON_SERVER_URL;

const jsonInstance = axios.create({
  baseURL: jsonApi,
});

export default jsonInstance;
