import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import "./profile.scss";
import { FaUserAstronaut } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import { FiEdit3, FiPlus, FiTrash } from "react-icons/fi";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useGetAddressQuery } from "../../store/addressSlice";
import AddAddressModal from "../../components/Modals/AddAddressModal";
import EditAddressModal from "../../components/Modals/EditAddressModal";
import { toast } from "react-toastify";
import DeleteAddressModal from "../../components/Modals/DeleteAddressModal";
import { useGetHistoryQuery } from "../../store/historySlice";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { useGetDataQuery } from "../../store/userDataSlice";

const Profile = () => {
    const [activeTab, setActiveTab] = useState("account");

    const [searchParams, setSearchParams] = useSearchParams();

    const { data: user = [], loading, error } = useGetDataQuery();

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
                    <Card className="bg-light mb-3">
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

/* Done with this too */
function Account({ user }) {
    const { data = [], error, isLoading } = useGetDataQuery();
    const { message, data: user_info = [] } = data;

    const [editing, setEditing] = useState(false);

    const [values, setValues] = useState({
        fullName: "",
        email: "",
        phone: "",
        avatar: "",
    });

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const fullName = user_info.first_name + " " + user_info.last_name;

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullName = e.target.elements.fullName.value;
        const email = e.target.elements.email.value;
        const phone = e.target.elements.phone.value;
        const avatar = e.target.elements.avatar.value;

        const splitName = fullName.split(" ");
        const firstName = splitName[0];
        const lastName = splitName.slice(1, splitName.length()).join(" ");

        console.log(firstName, lastName);
    };

    if (isLoading){
        return(
            <div className="d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        )
    }

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
            <Form >
                <div className="d-flex justify-content-start align-items-center">
                    <h3 className="pe-5"> My Account </h3>
                    {!editing && (
                        <FiEdit3
                            size={25}
                            color="green"
                            onClick={() => setEditing(!editing)}
                            className="edit"
                        />
                    )}
                </div>
                <div className="d-flex justify-content-between align-items-start pe-4 flex-wrap">
                    <Col lg={4} md={2} sm={12} xs={12}>
                        <div className="d-flex flex-column align-items-start mt-4 mb-4">
                            <Card className="bg-light">
                                <Card.Body>
                                    <Form.Group>
                                        <FaUserAstronaut size={200} />
                                        {/* {!fileDataURL ? (
                                        ) : null} */}
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>

                    <Col lg={8} md={6} sm={12} xs={12}>
                        <div className="w-100 d-flex flex-column mt-5 ps-2">
                            <Form.Group
                                as={Row}
                                controlId="fullName"
                                className="mb-2"
                            >
                                <Form.Label column sm="4">
                                    <h5>Full Name</h5>
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control
                                        plaintext={!editing}
                                        readOnly={!editing}
                                        className=""
                                        defaultValue={fullName}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                controlId="email"
                                className="mb-2"
                            >
                                <Form.Label column sm="4">
                                    <h5>Email</h5>
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control
                                        plaintext={!editing}
                                        readOnly={!editing}
                                        className=""
                                        defaultValue={user_info.email}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                controlId="phone"
                                className="mb-2"
                            >
                                <Form.Label column sm="4">
                                    <h5>Phone</h5>
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control
                                        plaintext={!editing}
                                        readOnly={!editing}
                                        className=""
                                        defaultValue={user_info.phone_no}
                                    />
                                </Col>
                            </Form.Group>
                            {editing && (
                                <div className="d-flex justify-content-center align-items-center">
                                    <Col lg={6} sm={6}>
                                        <Button
                                            variant="danger"
                                            type="submit"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setEditing(!editing);
                                            }}
                                            className="btn-sm mt-3"
                                        >
                                            Cancel
                                        </Button>
                                    </Col>
                                    <Col lg={6} sm={6}>
                                        <Button
                                            variant="success"
                                            type="submit"
                                            onClick={() => handleSubmit()}
                                            className="btn-sm mt-3"
                                        >
                                            Save
                                        </Button>
                                    </Col>
                                </div>
                            )}
                        </div>
                    </Col>
                </div>
            </Form>
        </div>
    );
}

// DONE with address book
function AddressBook() {
    const { data = [], error, isLoading } = useGetAddressQuery();
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(undefined);
    const [showDeleteModal, setShowDeleteModal] = useState(undefined);

    if(isLoading){
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        )
    }
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
            <div className="d-flex justify-content-between align-items-center">
                <h3> Address Book </h3>
                <Button
                    variant="success"
                    className="me-3 text-white"
                    onClick={() => setShowModal(true)}
                >
                    <FiPlus size={22} /> Add new Address
                </Button>
                <AddAddressModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                />
            </div>
            <div className="d-flex flex-column align-items-start pe-3">
                <EditAddressModal
                    show={showEditModal !== undefined}
                    onHide={() => setShowEditModal(undefined)}
                    data={data.find((x) => x.id === showEditModal)}
                />

                {data?.map((item) => {
                    return (
                        <Card className="mt-2 w-100 bg-light" key={item.id}>
                            <Card.Body>
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex flex-column">
                                        <div className="d-flex align-items-center">
                                            <h5>{item.contact_person}</h5>
                                            <span className="d-inline text-dark">
                                                ( {item.tag} )
                                            </span>
                                            {item.default && (
                                                <span className="d-inline text-white bg-dark-green rounded">
                                                    Default
                                                </span>
                                            )}
                                        </div>
                                        <p className="lead">{item.address}</p>
                                        <p>{item.phone_no}</p>
                                    </div>
                                    <div className="d-flex flex-column justify-content-end">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Button
                                                variant="secondary"
                                                className="me-3 text-white"
                                                onClick={() =>
                                                    setShowEditModal(item.id)
                                                }
                                            >
                                                <FiEdit3
                                                    size={20}
                                                    color="white"
                                                />
                                            </Button>

                                            <Button
                                                variant="danger"
                                                className="me-3 text-white"
                                                onClick={() => {
                                                    if (item.default) {
                                                        const notify = () => {
                                                            toast.error(
                                                                "Can't delete default address, select a different default and then try again",
                                                                {
                                                                    position:
                                                                        toast
                                                                            .POSITION
                                                                            .TOP_RIGHT,
                                                                    className:
                                                                        "toast-message",
                                                                }
                                                            );
                                                        };
                                                        notify();
                                                    } else {
                                                        setShowDeleteModal(
                                                            item.id
                                                        );
                                                    }
                                                }}
                                            >
                                                <FiTrash size={20} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>
            <DeleteAddressModal
                show={showDeleteModal !== undefined}
                onHide={() => setShowDeleteModal(undefined)}
                data={data.find((x) => x.id === showDeleteModal)}
            />
        </div>
    );
}

function OrderHistory() {
    const { data = [], error, isLoading } = useGetHistoryQuery();

    if(isLoading){
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        )
    }
    return (
        <div className="history">
            {/* {loading && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden"> Loading...</span>
                </Spinner>
            )} */}
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
            <div className="d-flex justify-content-center flex-column">
                <Accordion defaultActiveKey="0" >
                    {data?.map((item) => {
                        return (
                            <Accordion.Item
                                eventKey={item.id}
                                key={item.id}
                                className="mt-4 mb-4 rounded bg-light"
                            >
                                <Accordion.Header className="bg-light">
                                    <h5>{item.timestamp}</h5>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Table hover className="text-center">
                                        <thead>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total Price</th>
                                        </thead>
                                        <tbody>
                                            {item.history_items.map((item) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td>
                                                            {item.product.name}
                                                        </td>
                                                        <td>{item.price}</td>
                                                        <td>
                                                            {item.quantity}
                                                        </td>
                                                        <td>
                                                            {item.quantity *
                                                                item.price}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th colSpan={1}>
                                                    Grand Total
                                                </th>
                                                <th></th>
                                                <td>{item.total_items}</td>
                                                <td>{item.grand_total}</td>
                                            </tr>
                                        </tfoot>
                                    </Table>
                                </Accordion.Body>
                            </Accordion.Item>
                        );
                    })}
                </Accordion>
                {data.length <= 0 && (
                    <div className="d-flex justify-content-center align-items-center flex-column h-100">
                        <p className="lead">Order history not available</p>
                    </div>
                )}
            </div>
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
