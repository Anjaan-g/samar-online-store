import React from "react";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { FaProductHunt } from "react-icons/fa";
import { BiCategoryAlt, BiImages } from "react-icons/bi";
import {
    AiOutlineDashboard,
    AiFillControl,
    AiOutlineInfoCircle,
} from "react-icons/ai";
import { Dropdown } from "../Dropdown/Dropdown";
import {
    BsShieldLockFill,
    BsShareFill,
    BsFillBootstrapFill,
} from "react-icons/bs";
import { MdRequestQuote } from "react-icons/md";

import "./sidebar.scss";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export const AdminSidebar = () => {
    const token = Cookies.get("token");
    const decodedData = jwtDecode(token);
    const isSuperUser = decodedData.is_superuser;

    return (
        <div
            className={`side-menu bg-raisin text-white w-full d-flex flex-column gap-3 p-3 ${
                open && "active"
            }`}
        >
            <LinkContainer to="/admin/dashboard">
                <Nav.Link>
                    <AiOutlineDashboard size={20} /> &nbsp; Dashboard
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin/products">
                <Nav.Link>
                    <FaProductHunt size={20} /> &nbsp; Products
                </Nav.Link>
            </LinkContainer>
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

                    <Dropdown
                        header={"Site Data"}
                        items={[
                            <LinkContainer to="/admin/site/info">
                                <Nav.Link>
                                    <AiOutlineInfoCircle size={20} /> &nbsp;
                                    Basic Info
                                </Nav.Link>
                            </LinkContainer>,
                            <LinkContainer to="/admin/site/banner">
                                <Nav.Link>
                                    <BiImages size={20} /> &nbsp; Banners
                                </Nav.Link>
                            </LinkContainer>,
                        ]}
                    />
                    <LinkContainer to="/admin/orders">
                        <Nav.Link>
                            <MdRequestQuote size={20} /> &nbsp; Orders
                        </Nav.Link>
                    </LinkContainer>
                </>
            )}
        </div>
    );
};
