import axios, { AxiosError } from "axios";
import { BASE_URL } from "../config/env";
import { useAuthStore } from "../store/auth";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().authenticatedUser?.token;
    config.headers.withCredentials = true;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosInstance.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => {
        if (error?.response?.status === 401) {
            const state = useAuthStore.getState();
            state.setUnauthUser();
            window.location.href = "/login";
        }
        throw error;
    },
);

export default axiosInstance;
