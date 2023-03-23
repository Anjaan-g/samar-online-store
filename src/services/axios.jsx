import axios from "axios";
import authHeader from "./auth-header";

const api = axios.create({
    baseURL: "http://localhost:8888/api/v1/",
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
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response;
    } catch (e) {
        console.log(e);
        return;
    }
};

export const cartItems = async () => {
    try {
        const response = await api.get("auth/user/cart/", {
            headers: authHeader,
        });
        return response;
    } catch (e) {
        console.log(e);
        return;
    }
};

export default api;
