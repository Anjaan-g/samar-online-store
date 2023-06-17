import React, { useState } from "react";
import "./LoginForm.scss";
import Logo from "../../../assets/shopee.png";
import InputField from "../Fields/InputField";
import { Link } from "react-router-dom";
import Figure from "react-bootstrap/Figure";

const RegisterForm = ({ onSubmit, title }) => {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        avatar: null,
        password: "",
        confirmPassword: "",
    });

    const inputs = [
        {
            id: 1,
            name: "firstName",
            type: "text",
            placeholder: "First Name",
            errorMessage: "It should not be empty!",
            label: "First Name:",
            required: true,
        },
        {
            id: 2,
            name: "lastName",
            type: "text",
            placeholder: "Last Name",
            errorMessage: "It should not be empty!",
            label: "Last Name:",
            required: true,
        },
        {
            id: 3,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "It should be a valid email address!",
            label: "Email:",
            required: true,
        },
        {
            id: 4,
            name: "phoneNo",
            type: "number",
            placeholder: "Phone Number",
            errorMessage: "It should be a valid phone number!",
            label: "Phone Number:",
            pattern: `^(00|\+)[1-9]{1}([0-9][\s]*){9,16}$`,
            required: true,
        },
        {
            id: 5,
            name: "avatar",
            type: "file",
            placeholder: "Avatar",
            errorMessage: "It should be a jpeg,jpg,png,gif or bmp file!",
            label: "Avatar:",
            pattern: `([^\\s]+(\\.(?i)(jpe?g|png|gif|bmp))$)`,
            required: false,
        },
        {
            id: 6,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage:
                "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
            label: "Password:",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id: 7,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            errorMessage: "Passwords don't match!",
            label: "Confirm Password:",
            pattern: values.password,
            required: true,
        },
    ];

    async function handleSubmit(event) {
        event.preventDefault();
        const firstName = event.target.elements.firstName.value;
        const lastName = event.target.elements.lastName.value;
        const email = event.target.elements.email.value;
        const phoneNo = event.target.elements.phoneNo.value;
        const avatar = event.target.elements.avatar.files[0];
        const password = event.target.elements.password.value;
        onSubmit({ firstName, lastName, email, phoneNo, avatar, password });
    }

    const onChange = (e) => {
        if (e.target.name == "avatar") {
            setValues({ ...values, [e.target.name]: e.target.files[0] });
        } else {
            setValues({ ...values, [e.target.name]: e.target.value });
        }
    };

    return (
        <div className="login-container mt-5 mb-5">
            <Figure className="header_image mb-4 mt-3">
                <Figure.Image src="https://samarmart.s3.ap-south-1.amazonaws.com/logo/logo-only.svg" alt="logo" />
            </Figure>
            <h2 className="mb-4">{title}</h2>
            <form onSubmit={handleSubmit}>
                {inputs.map((input) => (
                    <InputField
                        key={input.id}
                        {...input}
                        defaultValue={values[input.name]}
                        onChange={onChange}
                    />
                ))}

                <div className="form-btn mt-4">
                    <button className="btn btn-primary btn-lg" type="submit">
                        Register
                    </button>
                </div>
            </form>
            <div className="text-end mt-4">
                <Link className="" to={"/login"}>
                    Already have an account? <strong>Login</strong>
                </Link>
            </div>
        </div>
    );
};

export default RegisterForm;
