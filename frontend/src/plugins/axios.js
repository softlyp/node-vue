import axios from "axios";
import {api_host} from "../config/constants.js";

const axiosInstance = axios.create({
    baseURL: api_host,  
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Ajusta el nombre si es necesario
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 400) {
            alert(`Error: ${error.response.data.error || 'Error en la solicitud. Verifica los datos ingresados.'}`);
        } else if (error.response && error.response.status >= 500) {
            alert('Error del servidor. Intenta nuevamente más tarde.');
        }
        return Promise.reject(error);
    }
);

export default {
    install: (app) => {
        app.config.globalProperties.$axios = axiosInstance;
        app.provide("axios", axiosInstance);
    },
};
