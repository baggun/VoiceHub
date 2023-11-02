import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const client = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
client.defaults.withCredentials = true; // 세션
