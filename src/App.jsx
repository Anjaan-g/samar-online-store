import { Route, Routes } from "react-router-dom";
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

function App() {
    const [darkTheme, setDarkTheme] = useState(false);

    return (
        <div className={` app w-100 ${darkTheme && "app__dark"}`}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                    path="/cart"
                    element={
                        <PrivateRoute>
                            <Cart />
                        </PrivateRoute>
                    }
                />
                <Route path="/detail" element={<ProductDetail />} />
                <Route
                    path="/billing"
                    element={
                        <PrivateRoute>
                            <Billing />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/payment"
                    element={
                        <PrivateRoute>
                            <Payment />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
