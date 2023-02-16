import React, { useEffect } from "react";
import "./navbar.scss";
import Shoppee from "../../../assets/logo_3.png";
import { useDispatch, useSelector } from "react-redux";
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

export const Navbar = ({ darkTheme, setDarkTheme }) => {
    const navigateTo = useNavigate();
    const themeMode = useSelector((state) => state.themeMode);
    const token = Cookies.get("token");
    const cart = useSelector((state) => state.cart);
    const getTotalQuantity = () => {
        let total = 0;

        cart.cart.forEach((item) => {
            total += item.quantity;
        });
        return total;
    };
    useEffect(() => {
      
    
      return () => {
      }
    }, [token])
    

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
                            <LinkContainer to="/contact">
                                <Nav.Link className="text-white">
                                    <strong>Contact</strong>
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/cart">
                                <Nav.Link>
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
                                </Nav.Link>
                            </LinkContainer>
                            {token && (
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
                                            e.preventDefault();
                                            Cookies.remove("token");
                                            navigateTo("/login");
                                            window.location.reload(true);
                                        }}
                                    >
                                        <BiLogOut size={25} color="red" />
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                            {!token && (
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

/*

<Nav  className="me-auto d-flex gap-5 align-items-center justify-content-between">
                        <Nav.Link className="nav-item">
                            <Link
                                to="/contact"
                                className="text-white fw-bold text-decoration-none"
                            >
                                Contact
                            </Link>
                        </Nav.Link>
                        <Nav.Link className="nav-item ">
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
                        </Nav.Link>
                        <Nav.Link className="nav-item text-white cursor">
                            <BsFillPersonFill size={"30px"} />
                        </Nav.Link>
                    </Nav>
                    
*/
