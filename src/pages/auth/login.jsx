import LoginForm from "../../components/Auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { login } from "../../services/axios";
import { Helmet } from "react-helmet";
import jwt_decode from "jwt-decode";

const LoginPage = () => {
    const navigateTo = useNavigate();

    const handleSubmit = async (formState) => {
        const { email, password } = formState;
        try {
            const response = await login(email, password);
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

            // Save to Cookie storage
            const decodedData = jwt_decode(token);
            Cookies.set("token", token, {
                expires: new Date(decodedData.exp * 1000),
            });
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
            <Helmet>
                <meta charSet="utf-8" />
                <title> Samar Supplier | Login </title>
                <link rel="canonical" href="http://samarsuppliers.com/login" />
                <meta
                    name="description"
                    content="Samar supplier is your one and only place to get authentic gadgets and accessories for your smart phone or computers."
                />
            </Helmet>
            <div className="login">
                <LoginForm title={"Login"} onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default LoginPage;
