import React, { useEffect } from "react";
import "./navbar.scss";
import Shoppee from "../../../assets/logo_3.png";
import { BiShoppingBag, BiLogOut } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { default as NavBar } from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { LinkContainer } from "react-router-bootstrap";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
    useGetCartItemsQuery,
    useUpdateCartMutation,
} from "../../store/userCartSlice";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCart, clearCart } from "../../store/cartSlice";
import dayjs from "dayjs";

export const Navbar = () => {
    const token = Cookies.get("token");

    const navigateTo = useNavigate();

    const dispatch = useDispatch();

    const {
        data: cartData = [],
        isLoading,
        isError,
        error,
    } = useGetCartItemsQuery();

    const [updateCart, { isLoading: isLoadingUpdateCart }] =
        useUpdateCartMutation();

    const cart = useSelector((state) => state.cart) || {};
    const { data = [] } = cart;

    useEffect(() => {
        if (!isLoading) {
            dispatch(setCart(cartData.data));
        }

        if (token === undefined) {
            navigateTo("/login");
        }
    }, []);

    useEffect(() => {
        if (data) {
            updateCart(data);
        }
    }, [data]);

    const getAdminStatus = () => {
        if (token !== undefined) {
            const decodedData = jwt_decode(token);
            const admin = decodedData.admin;
            const exp = decodedData.exp;
            return { admin, exp };
        }
    };

    const adminPanel = () => {
        const { admin, exp } = getAdminStatus() || false;
        if (admin) {
            return (
                <LinkContainer to="/admin">
                    <Nav.Link className="text-white">
                        <strong>Admin Panel</strong>
                    </Nav.Link>
                </LinkContainer>
            );
        }
    };

    const getTotalQuantity = () => {
        let total = 0;
        if (cart.data) {
            cart.data?.forEach((item) => {
                total += item.qty;
            });
        }
        return total;
    };

    const logout = () => {
        Cookies.remove("token");
        dispatch(clearCart());
        navigateTo("/login");
    };

    // useEffect(() => {
    //     if (exp * 1000 <= dayjs().unix() * 1000) {
    //         logout();
    //     }

    //     return () => {};
    // }, [exp]);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        );
    }

    return (
        <NavBar collapseOnSelect sticky="top" bg="dark-green" expand="md">
            <Container>
                <LinkContainer to="/" className="mb-1">
                    <NavBar.Brand className="site-logo">
                        <img src={Shoppee} alt="shopee" />
                    </NavBar.Brand>
                </LinkContainer>
                <NavBar.Toggle
                    type="button"
                    aria-controls="responsive-navbar-nav"
                    className="navbar-toggle-custom bg-white"
                />
                <NavBar.Offcanvas
                    id="responsive-navbar-nav"
                    aria-labelledby="offcanvasNavbarLabel-expand"
                    placement="end"
                    scroll
                    backdrop
                    className="offcanvas-end text-bg-dark-green"
                    tabIndex="-1"
                >
                    <Offcanvas.Header
                        closeButton
                        className="off-canvas-header text-white"
                    >
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                            <div className="">Menu</div>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="off-canvas-nav justify-content-end flex-grow-1 pe-3 gap-4 align-items-center">
                            {adminPanel()}
                            <LinkContainer to="/contact">
                                <Nav.Link className="text-white">
                                    <strong>Contact</strong>
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <BiShoppingBag
                                            className="shop_icon"
                                            size={"30px"}
                                            color="white"
                                        />
                                        {token && (
                                            <span className="item-count">
                                                {getTotalQuantity() || 0}
                                            </span>
                                        )}
                                    </div>
                                </Nav.Link>
                            </LinkContainer>
                            {token ? (
                                <NavDropdown
                                    title={
                                        <BsFillPersonFill
                                            size={30}
                                            color="white"
                                        />
                                    }
                                    id={`offcanvasNavbarDropdown-expand`}
                                    className="avatar-dropdown"
                                    drop="down"
                                    align="end"
                                >
                                    <NavDropdown.Item>
                                        <LinkContainer to="/profile">
                                            <Nav.Link className="text-dark">
                                                Profile
                                            </Nav.Link>
                                        </LinkContainer>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <LinkContainer
                                            to={{
                                                pathname: "/profile",
                                                search: "?active=orderHistory",
                                            }}
                                        >
                                            <Nav.Link className="text-dark">
                                                Order History
                                            </Nav.Link>
                                        </LinkContainer>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item
                                        onClick={(e) => {
                                            logout();
                                        }}
                                    >
                                        <BiLogOut size={25} color="red" />{" "}
                                        &nbsp; Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link className="text-white">
                                        Login/Register
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Offcanvas.Body>
                </NavBar.Offcanvas>
            </Container>
        </NavBar>
    );
};
