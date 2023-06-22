import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const PrivateRoute = ({
    isAllowed,
    redirectPath = "/",
    children,
}) => {
    const isAuthenticated = Cookies.get("token");

    if (!isAuthenticated) {
        toast.error("Authentication credentials not met", {
            position: toast.POSITION.TOP_RIGHT,
            className: "toast-message",
        });
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};
