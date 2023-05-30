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

const routesConfig = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        element: <Layout />,
        children: [
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

    return (
        <RouterProvider router={router} />
        // <div className={` app w-100 ${darkTheme && "app__dark"}`}>
        //     <Routes>
        //         <Route
        //             path="/"
        //             element={
        //                 <Layout>
        //                     <Home />
        //                 </Layout>
        //             }
        //         />
        //         <Route
        //             path="/login"
        //             element={
        //                 <Layout>
        //                     <Login />
        //                 </Layout>
        //             }
        //         />
        //         <Route
        //             path="/register"
        //             element={
        //                 <Layout>
        //                     <Register />
        //                 </Layout>
        //             }
        //         />
        //         <Route
        //             path="/contact"
        //             element={
        //                 <Layout>
        //                     <Contact />
        //                 </Layout>
        //             }
        //         />
        //         <Route
        //             path="/cart"
        //             element={
        //                 <PrivateRoute>
        //                     <Layout>
        //                         <Cart />
        //                     </Layout>
        //                 </PrivateRoute>
        //             }
        //         />
        //         <Route
        //             path="/detail/:id"
        //             element={
        //                 <Layout>
        //                     <ProductDetail />
        //                 </Layout>
        //             }
        //         />
        //         <Route
        //             path="/billing"
        //             element={
        //                 <PrivateRoute>
        //                     <Layout>
        //                         <Billing />
        //                     </Layout>
        //                 </PrivateRoute>
        //             }
        //         />
        //         <Route
        //             path="/payment"
        //             element={
        //                 <PrivateRoute>
        //                     <Layout>
        //                         <Payment />
        //                     </Layout>
        //                 </PrivateRoute>
        //             }
        //         />
        //         <Route
        //             path="/profile"
        //             element={
        //                 <PrivateRoute>
        //                     <Layout>
        //                         <Profile />
        //                     </Layout>
        //                 </PrivateRoute>
        //             }
        //         />
        //         <Route
        //             path="/admin"
        //             element={
        //                 <PrivateRoute>
        //                     <AdminLayout>
        //                         <Admin />
        //                     </AdminLayout>
        //                 </PrivateRoute>
        //             }
        //         />
        //         <Route
        //             path="*"
        //             element={
        //                 <Layout>
        //                     <NotFound />
        //                 </Layout>
        //             }
        //         />
        //     </Routes>
        // </div>
    );
}

export default App;
