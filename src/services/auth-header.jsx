import Cookies from "js-cookie";
export default function authHeader() {
    const token = Cookies.get("accessToken");

    if (token) {
        return { Authorization: "Bearer " + token };
    } else {
        return {};
    }
}

// import { $CombinedState } from "@reduxjs/toolkit";
// import axios from "axios";

// const axiosInstance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_BASE_API,
// });

// /* ------------------- create a interceptors of axios ------------------- */
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = cookie.get("token");
//         if (token) config.headers.Authorization = token;
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export const axiosI

// export const requestEditProfile = async (data) =>
//     axiosInstance.patch(ADMIN_PROFILE_API, {...data});

