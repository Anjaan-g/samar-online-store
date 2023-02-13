import LoginForm from "../../components/Auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { login } from "../../services/axios";

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
            Cookies.set("token", token);
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
