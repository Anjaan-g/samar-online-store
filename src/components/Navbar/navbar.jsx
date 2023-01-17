import React, { useEffect } from "react";
import "./navbar.scss";
import Shoppee from "../../../assets/logo_3.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { Search } from "../Search/search";
import logout from "../Auth/LogOut";
// import { NotificationCard } from "../Card/NotificationCard";
import { BiShoppingBag } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
// import UserCard from "../Card/UserCard";

export const Navbar = ({ darkTheme, setDarkTheme }) => {
    const themeMode = useSelector((state) => state.themeMode);
    const dispatch = useDispatch();
    const token = useSelector((token) => token);

    useEffect(() => {}, []);

    const cart = useSelector((state) => state.cart);
    const getTotalQuantity = () => {
        let total = 0;

        cart.cart.forEach((item) => {
            total += item.quantity;
        });
        return total;
    };

    return (
        <div className="navbar navbar-expand-sm sticky-top bg-dark-green">
            <div className="container d-flex justify-content-between align-items-center ">
                <div className="navbar-brand">
                    <Link to="/">
                        <img src={Shoppee} alt="shopee" />
                    </Link>
                </div>
                <button
                    className="navbar-toggler navbar-toggler-right bg-white"
                    type="button"
                    data-toggle="collapse"
                    data-target="#colNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="colNav"
                >
                    <ul className="navbar-nav d-flex gap-5 align-items-center justify-content-between">
                        <li className="nav-item">
                            <Link
                                to="/contact"
                                className="text-white fw-bold text-decoration-none"
                            >
                                Contact
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link
                                to="/cart"
                                className="text-white fw-bold text-decoration-none"
                            >
                                <BiShoppingBag
                                    className="shop_icon"
                                    size={"30px"}
                                />
                                <span className="item-count">
                                    {getTotalQuantity() || 0}
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item text-white cursor">
                            <BsFillPersonFill size={"30px"} />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
