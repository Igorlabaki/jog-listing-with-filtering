import axios from "axios";
import { parseCookies } from "nookies";

const { jobListToken: token } = parseCookies();

export const api = axios.create({
  baseURL: "https://localhost:3333",
});

api.interceptors.request.use((config) => {
  console.log(config);

  return config;
});

if (token) {
  api.defaults.headers["Authorization"] = `Bearrer ${token}`;
}
