import { useState } from "react";
import "./InputField.scss";

const InputField = ({ label, errorMessage, onChange, id, ...inputProps }) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className="form-row mt-4 ">
            <div className="row">
                <div className="col-lg-5 col-sm-6 ">
                    <label
                        // style={"width: fit-content;"}
                        className="col-sm-2 col-form-label"
                    >
                        {label}
                    </label>
                </div>

                <div className="col-lg-7 col-sm-6 ">
                    <input
                        className="form-control"
                        onChange={onChange}
                        onBlur={handleFocus}
                        onFocus={() =>
                            inputProps.name === "confirmPassword" &&
                            setFocused(true)
                        }
                        {...inputProps}
                    />
                </div>
                <span>{errorMessage}</span>
            </div>
        </div>
    );
};

export default InputField;
