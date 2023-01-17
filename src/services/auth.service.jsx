import axios from "axios";

const API_URL = "http://localhost:8888/api/v1/";

class AuthService {
    async login(email, password) {
        const response = await axios.post(API_URL + "auth/login/", { email, password });
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    }
}
