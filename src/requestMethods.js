import axios from "axios";

const BASE_URL = "https://farmers-backend-iota.vercel.app/api/";

const getToken = () => {
  try {
    const root = localStorage.getItem("persist:root");
    if (!root) return null;

    const parsedRoot = JSON.parse(root);

    if (!parsedRoot.user) return null;

    const userData = JSON.parse(parsedRoot.user);

    return userData?.currentUser?.accessToken || null;
  } catch (err) {
    console.error("Token parse error:", err);
    return null;
  }
};

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

userRequest.interceptors.request.use(config => {
  const token = getToken();
  if (token) config.headers.token = `Bearer ${token}`;
  return config;
});