import axios from "axios";

import {
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  REFRESH_TOKEN_LOCAL_STORAGE_KEY,
} from "@/shared/consts";
import type { ApiSuccessResponse } from "../lib/types";
import type { AuthTokenResponse } from "@repo/schemas";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const getAccessToken = () =>
  localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY) || "";

export const plainAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise: Promise<string> | null = null;

async function refreshTokens(): Promise<string> {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY);
  if (!refreshToken) {
    throw new Error("Отсутствует refresh-токен");
  }

  const { data } = await plainAxios.post<ApiSuccessResponse<AuthTokenResponse>>(
    "/auth/refresh",
    { refreshToken },
  );

  const { accessToken, refreshToken: nextRefreshToken } = data.data;
  localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY, nextRefreshToken);

  return accessToken;
}

function getRefresh(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = refreshTokens().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

async function clearSession(): Promise<void> {
  localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
  localStorage.removeItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY);
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await getRefresh();
        return api(originalRequest);
      } catch (refreshError) {
        await clearSession();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
