/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // send refresh cookie
});

// Access token store in-memory (also mirror to localStorage for reloads)
let accessToken: string | null = localStorage.getItem("accessToken");

export function setAccessToken(token: string | null) {
  accessToken = token;
  if (token) localStorage.setItem("accessToken", token);
  else localStorage.removeItem("accessToken");
}

// Attach Authorization header
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers ?? {};
    (config.headers as any)["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// Refresh on 401
let isRefreshing = false;
let queue: Array<() => void> = [];

async function refreshAccessToken() {
  if (isRefreshing) return new Promise<void>((resolve) => queue.push(resolve));
  isRefreshing = true;
  try {
    const { data } = await api.post("/api/v1/user/refresh");
    const newAccess = data.newAccess ?? data.accessToken ?? data.token;
    if (newAccess) setAccessToken(newAccess);
  } finally {
    isRefreshing = false;
    queue.forEach((fn) => fn());
    queue = [];
  }
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      await refreshAccessToken();
      return api(original);
    }
    return Promise.reject(error);
  }
);

export default api;
