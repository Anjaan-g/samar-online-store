import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import "./profile.scss";
import { FaUserAstronaut } from "react-icons/fa";
import Image from "react-bootstrap/Image";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";

const Profile = () => {
    const [activeTab, setActiveTab] = useState("account");

    const [searchParams, setSearchParams] = useSearchParams();

    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        let queryParam = searchParams.get("active");
        if (queryParam) {
            setActiveTab(searchParams.get("active"));
        } else {
            setSearchParams({ active: "account" });
        }
        return () => {};
    }, [searchParams]);

    const handleActiveTab = (key) => {
        setActiveTab(key);
        setSearchParams({ active: key });
    };

    return (
        <Container>
            <h4 className="display-5">Profile</h4>
            <div className="d-flex flex-row justify-content-between mt-5 flex-wrap">
                <Col lg={2} sm={2} xs={2} className="profile-sidebar">
                    <Card>
                        <Card.Header>Manage Profile</Card.Header>
                        <Card.Body>
                            <Nav className="flex-column">
                                <div className="profile mt-2 mb-2">
                                    <h5>Profile</h5>
                                    <p
                                        className={`tablink ps-3 text-dark-green pointer ${
                                            activeTab === "account"
                                                ? "active-tab"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleActiveTab("account")
                                        }
                                    >
                                        Account
                                    </p>
                                    <p
                                        className={`tablink ps-3 text-dark-green ${
                                            activeTab === "addressBook"
                                                ? "active-tab"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleActiveTab("addressBook")
                                        }
                                    >
                                        Address Book
                                    </p>
                                </div>
                                <div className="orders mt-2 mb-2">
                                    <h5>Orders</h5>
                                    <p
                                        className={`tablink ps-3 text-dark-green ${
                                            activeTab === "orderHistory"
                                                ? "active-tab"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleActiveTab("orderHistory")
                                        }
                                    >
                                        History
                                    </p>
                                    <p
                                        className={`tablink ps-3 text-dark-green ${
                                            activeTab === "returns"
                                                ? "active-tab"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleActiveTab("returns")
                                        }
                                    >
                                        Returns
                                    </p>
                                </div>
                                <div
                                    className={`tablink reviews mt-2 mb-2 text-dark-green ${
                                        activeTab === "reviews"
                                            ? "active-tab"
                                            : ""
                                    }`}
                                    onClick={() => handleActiveTab("reviews")}
                                >
                                    <h5>Reviews</h5>
                                </div>
                                <div
                                    className={`tablink wishlist mt-2 mb-2 text-dark-green ${
                                        activeTab === "wishlist"
                                            ? "active-tab"
                                            : ""
                                    }`}
                                    onClick={() => handleActiveTab("wishlist")}
                                >
                                    <h5>Wishlist</h5>
                                </div>
                            </Nav>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={10} md={10} sm={8} xs={8} className="ps-3">
                    {activeTab == "account" && <Account user={user} />}
                    {activeTab == "addressBook" && <AddressBook />}
                    {activeTab == "orderHistory" && <OrderHistory />}
                    {activeTab == "returns" && <Returns />}
                    {activeTab == "reviews" && <Reviews />}
                    {activeTab == "wishlist" && <Wishlist />}
                </Col>
            </div>
        </Container>
    );
};

function Account({ user }) {
    const [editing, setEditing] = useState(false);
    return (
        <div className="account">
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    Samar Supplier | Profile | Manage your account, address
                    book and history
                </title>
                <link
                    rel="canonical"
                    href="http://samarsuppliers.com/profile"
                />
                <meta
                    name="description"
                    content="Setup your profile with authentic information to get your products easily and fast."
                />
            </Helmet>
            <div className="d-flex justify-content-start align-items-center">
                <h3 className="pe-5"> My Account </h3>
                <FiEdit3
                    size={25}
                    color="green"
                    onClick={() => setEditing(!editing)}
                    className="edit"
                />
            </div>
            <div className="d-flex justify-content-between align-items-center pe-4 flex-wrap">
                <Col lg={6} md={6} sm={12}>
                    <div className="d-flex flex-column align-items-center mt-4 flex-wrap mb-4">
                        <Card>
                            <Card.Body>
                                <FaUserAstronaut size={200} />
                            </Card.Body>
                        </Card>
                    </div>
                </Col>

                <Col lg={6} md={6} sm={12}>
                    <div className="d-flex flex-column align-items-center mt-3">
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <h4>Full Name</h4>
                            <p className="lead">{user.name || "User"}</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <h4>Email Address</h4>
                            <p className="lead">{user.email || "email"}</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <h4>Contact No.</h4>
                            <p className="lead">
                                {user.phone || "98xxxxxxxx"}
                            </p>
                        </div>
                        {/* <div className="d-flex justify-content-between align-items-center w-full">
                            <h3>Full Name</h3>
                            <p className="lead">{user.name || "User"}</p>
                        </div> */}
                    </div>
                </Col>
            </div>
        </div>
    );
}
function AddressBook() {
    return (
        <div className="addressBook">
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    {" "}
                    Samar Supplier | Address Book | Manage your billing address
                    here{" "}
                </title>
                <link
                    rel="canonical"
                    href="http://samarsuppliers.com/profile"
                />
                <meta
                    name="description"
                    content="Add new billing address, modify previously added addresses, set default billing address or remove old addresses."
                />
            </Helmet>
            <h3> Address Book </h3>
        </div>
    );
}
function OrderHistory() {
    return (
        <div className="history">
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    {" "}
                    Samar Supplier | Order History | All your buy history will
                    appear here{" "}
                </title>
                <link
                    rel="canonical"
                    href="http://samarsuppliers.com/profile"
                />
                <meta
                    name="description"
                    content="Easily track your buying history with items details, price, date and quantity here."
                />
            </Helmet>
            <h3> Order History </h3>
        </div>
    );
}
function Returns() {
    return (
        <div className="returns">
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    {" "}
                    Samar Supplier | My Returns | List your returns of any
                    products{" "}
                </title>
                <link
                    rel="canonical"
                    href="http://samarsuppliers.com/profile"
                />
                <meta
                    name="description"
                    content="Track your return of gadgets here easily."
                />
            </Helmet>
            <h3> Returns </h3>
        </div>
    );
}
function Reviews() {
    return (
        <div className="reviews">
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    {" "}
                    Samar Supplier | My Reviews | Track your reviews on any
                    products here.{" "}
                </title>
                <link
                    rel="canonical"
                    href="http://samarsuppliers.com/profile"
                />
                <meta
                    name="description"
                    content="Add more reviews or edit previously added reviews to let other users know of this product's validity"
                />
            </Helmet>
            <h3> Reviews </h3>
        </div>
    );
}
function Wishlist() {
    return (
        <div className="wishlist">
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    {" "}
                    Samar Supplier | My Wishlist | Anything you wish for{" "}
                </title>
                <link
                    rel="canonical"
                    href="http://samarsuppliers.com/profile"
                />
                <meta
                    name="description"
                    content="Add items to your wishlist and buy them whenever you feel like buying it."
                />
            </Helmet>
            <h3> Wishlist </h3>
        </div>
    );
}

export default Profile;
