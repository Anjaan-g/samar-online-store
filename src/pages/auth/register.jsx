import RegisterForm from "../../components/Auth/RegisterForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import api from "../../services/axios";
import { Helmet } from "react-helmet";

export default function Register() {
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
            const token = response.data.token;

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
            Cookies.set("token", token);
            navigateTo("/login");
            notify();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container col-lg-6">
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    {" "}
                    Samar Supplier | Register | Come join us for authentic
                    gadgets{" "}
                </title>
                <link rel="canonical" href="http://samarsuppliers.com/home" />
                <meta
                    name="description"
                    content="Samar supplier is your one and only place to get authentic gadgets and accessories for your smart phone or computers."
                />
            </Helmet>
            <div className="register">
                <RegisterForm onSubmit={handleSubmit} title={"Register"} />
            </div>
        </div>
    );
}
