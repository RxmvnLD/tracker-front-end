import axios, { AxiosError, AxiosHeaders } from "axios";
import { BASE_URL } from "../config/constants";
import { useAuthStore } from "../store/auth";

const instance = axios.create({
    baseURL: BASE_URL,
});
const token = useAuthStore.getState().authenticatedUser?.token;

instance.interceptors.request.use((config) => {
    config.headers.withCredentials = true;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const axiosGet = async (url: string, _headers?: AxiosHeaders) => {
    try {
        const res = await instance.get(url);
        if (res.status === 200) return res.data;
        else return res;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            throw error.message;
        }
    }
};
export const axiosPost = async (
    url: string,
    data: object,
    _headers?: AxiosHeaders,
) => {
    try {
        const res = await instance.post(url, data);
        if (res.status === 200) return res.data;
        else return res;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw error.response?.data;
        }
    }
};
export const axiosPut = async (
    url: string,
    data: object,
    _headers?: AxiosHeaders,
) => {
    try {
        const res = await instance.put(url, data);
        if (res.status === 200) return res.data;
        else return res;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            throw error.message;
        }
    }
};
export const axiosDelete = async (
    url: string,
    data?: object,
    _headers?: AxiosHeaders,
) => {
    try {
        const res = await instance.delete(url, data);
        return res.data;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            throw error.message;
        }
    }
};
