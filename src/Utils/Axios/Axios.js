import axios from "axios";

const dummyApi = import.meta.env.VITE_DUMMY_URL;

const instance = axios.create({
  baseURL: dummyApi,
});

export default instance;
