import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8888/api/v1/",
});

export const login = async (email, password) => {
    response = await api.post(
        "auth/login/",
        { email, password },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    console.log(response)
    return response
};

export const register = async (email, password) => {
    response = await api.post(
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
    return response
};

export const refresh = async ({refreshToken}) => {
    response = await api.post(
        "auth/refresh/",
        {
            refresh_token: refreshToken,
        },
        {
            headers: {
                "content-type": "multipart/form-data",
            },
        }
    );
    return response
};

export default api;
