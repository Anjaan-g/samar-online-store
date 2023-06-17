import {
    Route,
    Routes,
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./App.scss";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/home/home";
import { useState } from "react";
import Contact from "./pages/contact/Contact";
import Cart from "./pages/cart/Cart";
import ProductDetail from "./pages/productDetail/ProductDetail";
import { PrivateRoute } from "./actions/PrivateRoute";
import Billing from "./pages/checkout/billing";
import Payment from "./pages/checkout/payment";
import Profile from "./pages/profile/Profile";
import NotFound from "./pages/error/404";
import Admin from "./components/Admin/Admin";
import { Layout } from "./components/Layout/Layout";
import { Brands } from "./components/Admin/Brands";
import { Vendors } from "./components/Admin/Vendors";
import { AdminLayout } from "./components/Layout/Layout";
import { Products } from "./components/Admin/Products";
import { Admins } from "./components/Admin/Admins";
import { Categories } from "./components/Admin/Categories";
import { Orders } from "./components/Admin/Orders";
import { Logo } from "./components/Admin/Logo";
import { Info } from "./components/Admin/Info";

const routesConfig = [
    {
        element: <Layout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/detail/:id",
                element: <ProductDetail />,
            },
            {
                path: "/payment",
                element: <Payment />,
            },
            {
                path: "/billing",
                element: <Billing />,
            },
        ],
    },
    {
        element: <AdminLayout />,
        children: [
            {
                path: "/admin/products",
                element: <Products />,
            },
            {
                path: "/admin",
                element: <Admin />,
            },
            {
                path: "/admin/admins",
                element: <Admins />,
            },
            {
                path: "/admin/brands",
                element: <Brands />,
            },
            {
                path: "/admin/vendors",
                element: <Vendors />,
            },
            {
                path: "/admin/categories",
                element: <Categories />,
            },
            {
                path: "/admin/orders",
                element: <Orders />,
            },
            {
                path: "/admin/site/info",
                element: <Info />,
            },
            {
                path: "/admin/site/logo",
                element: <Logo />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
];

const router = createBrowserRouter(routesConfig);

function App() {
    const [darkTheme, setDarkTheme] = useState(false);

    return <RouterProvider router={router} />;
}

export default App;
