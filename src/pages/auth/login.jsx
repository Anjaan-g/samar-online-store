import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/axios";
import LoginForm from "../../components/Auth/LoginForm";
import { setToken } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token);

    const navigateTo = useNavigate();
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        }
    }, [token]);

    const handleSubmit = async (formState) => {
        const { email, password } = formState;
        console.log(email, password);
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
            console.log(response);
            const { token } = response.data["token"];

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
            dispatch(setToken(token));
            navigateTo("/");
            notify();
        } catch (error) {
            console.log(error.response.data.message);
            const notify = () => {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: "toast-message",
                });
            };
            notify();
        }
    };

    return (
        <div className="container col-lg-6">
            <div className="login">
                <LoginForm title={"Login"} onSubmit={handleSubmit} />
                <ToastContainer limit={3} />
            </div>
        </div>
    );
};

export default LoginPage;
