import { useEffect, useState } from "react";
import RegisterForm from "../../components/Auth/RegisterForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setToken } from "../../store/authSlice";

import api from "../../services/axios";

export default function Register() {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.auth.accessToken);

    const navigateTo = useNavigate();

    const handleSubmit = async (formState) => {
        const { firstName, lastName, email, phoneNo, avatar, password } =
            formState;

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
            const { accessToken, refreshToken, user } = response.data.data;

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
            // store JWT token in local storage
            dispatch(setToken({ accessToken, refreshToken, user }));
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            // localStorage.setItem("jwt", data.token);
            // redirect to dashboard or home page
            navigateTo("/");
            notify();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container col-lg-6">
            <div className="register">
                <RegisterForm onSubmit={handleSubmit} title={"Register"} />
            </div>
        </div>
    );
}
