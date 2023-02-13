import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8888/api/v1/",
});
// api.defaults.headers.common["Content-Type"] = "application/json";

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
    // return response;
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

export const refresh = async ({ refreshToken }) => {
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
    return response;
};

export default api;
