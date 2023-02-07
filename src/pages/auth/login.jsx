import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/axios";
import LoginForm from "../../components/Auth/LoginForm";
import { setToken } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const LoginPage = () => {
    const navigateTo = useNavigate();

    const handleSubmit = async (formState) => {
        const { email, password } = formState;
        try {
            const response = await api.post(
                "auth/login/",
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const {
                accessToken,
                refreshToken,
                user,
            } = response.data.data;

            const notify = () => {
                if (response.status == 200) {
                    toast.success(response.data["message"], {
                        position: toast.POSITION.TOP_RIGHT,
                        className: "toast-message",
                    });
                } else {
                    toast.error(response.data["message"], {
                        position: toast.POSITION.TOP_RIGHT,
                        className: "toast-message",
                    });
                }
            };

            // dispatch(setToken({accessToken, refreshToken, user}));
            // Save to local storage
            Cookies.set("accessToken", accessToken);
            // Cookies.set("refreshToken", refreshToken);

            navigateTo("/");
            notify();
        } catch (error) {
            console.log(error);
            const notify = () => {
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: "toast-message",
                });
            };
            notify();
        }
    };

    return (
        <div className="container col-lg-6 max-h-vh">
            <div className="login">
                <LoginForm title={"Login"} onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default LoginPage;
