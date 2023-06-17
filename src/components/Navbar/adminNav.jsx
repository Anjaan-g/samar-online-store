import React from "react";
import Nav from "react-bootstrap/Nav";
import { FaBell } from "react-icons/fa";
import { default as NavBar } from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { HiOutlineMail, HiOutlineMailOpen } from "react-icons/hi";
import { LinkContainer } from "react-router-bootstrap";
import { BiLogOut } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import NavDropdown from "react-bootstrap/NavDropdown";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export const AdminNav = () => {
    const token = Cookies.get("token");
    const decodedData = jwtDecode(token);
    const isSuperUser = decodedData.is_superuser;
    const dispatch = useDispatch();

    const logout = () => {
        Cookies.remove("token");
        dispatch(clearCart());
        localStorage.clear();
        navigateTo("/login");
    };
    return (
        <NavBar sticky="top" bg="raisin" expand="md" className="w-100">
            <div className="d-flex px-3 w-100 justify-content-between align-items-center">
                <div className="">
                    <LinkContainer to="/" className="mb-1">
                        <NavBar.Brand className="text-white">
                            Home
                        </NavBar.Brand>
                    </LinkContainer>
                </div>
                <div className="d-flex gap-2 justify-content-center align-items-center">
                    <LinkContainer to="/">
                        <FaBell color="white" size={20} />
                    </LinkContainer>
                    <LinkContainer to="/">
                        <HiOutlineMail color="white" size={20} />
                    </LinkContainer>

                    {token ? (
                        <NavDropdown
                            title={
                                <BsFillPersonFill size={25} color="white" />
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
                                <BiLogOut size={25} color="red" /> &nbsp;
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <LinkContainer to="/login">
                            <Nav.Link className="text-white">
                                Login/Register
                            </Nav.Link>
                        </LinkContainer>
                    )}
                </div>
            </div>
        </NavBar>
    );
};
