import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/home/home";
import { useEffect, useState } from "react";
import Contact from "./pages/contact/Contact";
import Cart from "./pages/cart/Cart";
import ProductDetail from "./pages/productDetail/ProductDetail";
import Checkout from "./pages/checkout/checkout";
import { PrivateRoute } from "./actions/PrivateRoute";
import { useSelector } from "react-redux";

function App() {
    const [darkTheme, setDarkTheme] = useState(false);

    return (
        <div className={` app ${darkTheme && "app__dark"}`}>
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
                    path="/checkout"
                    element={
                        <PrivateRoute>
                            <Checkout />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
