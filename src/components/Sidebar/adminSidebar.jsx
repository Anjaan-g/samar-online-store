import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { FaProductHunt } from "react-icons/fa";
import { BsDot, BsBoxSeam } from "react-icons/bs";
import { BiCategoryAlt, BiImages } from "react-icons/bi";
import {
    AiOutlineDashboard,
    AiFillControl,
    AiOutlineInfoCircle,
    AiOutlineDatabase,
} from "react-icons/ai";
import { Dropdown } from "../Dropdown/Dropdown";
import {
    BsShieldLockFill,
    BsShareFill,
    BsFillBootstrapFill,
    BsFillCaretRightFill,
    BsFillCaretDownFill,
} from "react-icons/bs";
import { MdRequestQuote } from "react-icons/md";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./sidebar.scss";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export const AdminSidebar = () => {
    const token = Cookies.get("token");
    const decodedData = jwtDecode(token);
    const isSuperUser = decodedData.is_superuser;

    const [productMenu, setProductMenu] = useState(false);
    const [siteMenu, setSiteMenu] = useState(false);

    return (
        <Nav
            className={`side-menu bg-raisin d-flex flex-column gap-3 p-3 ${
                open && "active"
            }`}
        >
            <LinkContainer to="/admin/dashboard">
                <Nav.Link>
                    <AiOutlineDashboard size={20} /> &nbsp; Dashboard
                </Nav.Link>
            </LinkContainer>
            <Nav.Link onClick={() => setProductMenu(!productMenu)}>
                <BsBoxSeam /> &nbsp; Products{" "}
                {productMenu ? (
                    <BsFillCaretDownFill />
                ) : (
                    <BsFillCaretRightFill />
                )}
            </Nav.Link>
            {productMenu && (
                <div className="lh-2 ">
                    <LinkContainer to="/admin/products/list">
                        <Nav.Link>
                            <BsDot size={25} /> List
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/admin/products/create">
                        <Nav.Link>
                            <BsDot size={25} /> Create
                        </Nav.Link>
                    </LinkContainer>
                </div>
            )}
            {isSuperUser && (
                <>
                    <LinkContainer to="/admin/admins">
                        <Nav.Link>
                            <BsShieldLockFill size={20} /> &nbsp; Admins
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/admin/vendors">
                        <Nav.Link>
                            <BsShareFill size={20} /> &nbsp; Vendors
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/admin/categories">
                        <Nav.Link>
                            <BiCategoryAlt size={20} /> &nbsp; Categories
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/admin/brands">
                        <Nav.Link>
                            <BsFillBootstrapFill size={20} /> &nbsp; Brands
                        </Nav.Link>
                    </LinkContainer>

                    <Nav.Link onClick={() => setSiteMenu(!siteMenu)}>
                        <AiOutlineDatabase /> Site Data{" "}
                        {siteMenu ? (
                            <BsFillCaretDownFill />
                        ) : (
                            <BsFillCaretRightFill />
                        )}
                    </Nav.Link>
                    {siteMenu && (
                        <div className="lh-2 ">
                            <LinkContainer to="/admin/site/info">
                                <Nav.Link>
                                    <BsDot size={25} /> Basic Info
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/admin/site/banner">
                                <Nav.Link>
                                    <BsDot size={25} /> Banners
                                </Nav.Link>
                            </LinkContainer>
                        </div>
                    )}

                    <LinkContainer to="/admin/orders">
                        <Nav.Link>
                            <MdRequestQuote size={20} /> &nbsp; Orders
                        </Nav.Link>
                    </LinkContainer>
                </>
            )}
        </Nav>
    );
};
