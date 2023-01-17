import React, { useState } from "react";
import "./LoginForm.scss";
import Logo from "../../../assets/shopee.png";
import { Link } from "react-router-dom";
import InputField from "../Fields/InputField";

const LoginForm = ({ onSubmit, title }) => {

    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Email Address",
            errorMessage: "It should be a valid email address!",
            label: "Email:",
            required: true,
        },

        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Password",
            label: "Password:",
            required: true,
        },
    ];

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;
        onSubmit({ email, password });
    }

    return (
        <div className="login-container">
            <figure className="header_image">
                <img src={Logo} alt="logo" />
            </figure>
            <h2>{title}</h2>
            <form onSubmit={handleSubmit}>
                {inputs.map((input) => (
                    <InputField
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                    />
                ))}
                <div className="form-btn ">
                    <button className="btn btn-primary" type="submit">
                        Login
                    </button>
                </div>
                <div className="text-end">
                    <a href="#login">forgot password?</a>
                </div>
            </form>

            <div className="text-end">
                <Link className="btn" to={"/register"}>
                    Don't have an account? <strong> Register </strong>
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;
