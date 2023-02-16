import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: "http://localhost:8888/api/v1/",
});

api.interceptors.request.use(function (config) {
    const token = Cookies.get("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});

export const login = async (email, password) => {
    try {
        const response = await api.post(
            "auth/login/",
            { email: email, password: password },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response;
    } catch (e) {
        console.log(e);
        return;
    }
};

export const register = async (
    firstName,
    lastName,
    email,
    phoneNo,
    avatar,
    password
) => {
    try {
        const response = await api.post(
            "auth/register/",
            {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone_no: phoneNo,
                avatar: avatar,
                password: password,
            },
            {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }
        );
        return response;
    } catch (e) {
        console.log(e);
        return;
    }
};

export default api;
