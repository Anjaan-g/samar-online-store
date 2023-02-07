import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const PrivateRoute = ({
    isAllowed,
    redirectPath = "/login",
    children,
}) => {
    const isAuthenticated = Cookies.get("accessToken")

    if (!isAuthenticated) {
        toast.success("Please Login to view your Cart", {
            position: toast.POSITION.TOP_RIGHT,
            className: "toast-message",
        });
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};
