import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import {
    useGetAllProductsQuery,
    useAddProductsMutation,
} from "../../store/productSlice";
import {
    useAddAdminMutation,
    useGetAllAdminsQuery,
    useGetAllUsersQuery,
} from "../../store/userSlice";
import { FiEdit3, FiPlus, FiTrash, FiCheck, FiX } from "react-icons/fi";
import { Helmet } from "react-helmet";
import Modal from "react-bootstrap/Modal";
import "./Admin.scss";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useGetAllVendorsQuery } from "../../store/vendorSlice";
import { useGetAllCategoriesQuery } from "../../store/categoriesSlice";
import { useGetAllBrandsQuery } from "../../store/brandsSlice";

const Admin = () => {
    const [activeTab, setActiveTab] = useState("products");

    const handleActiveTab = (key) => {
        setActiveTab(key);
    };

    const token = Cookies.get("token");
    const decodedData = jwtDecode(token);
    const isSuperUser = decodedData.is_superuser;

    return (
        <Container>
            <div className="d-flex flex-column justify-content-between mt-2 flex-wrap w-100">
                <Col className="admin-nav">
                    <Card className="ms-3">
                        <Nav className="flex-row align-items-center justify-content-start pb-0 ms-3">
                            <div className="profile ms-2 d-flex align-items-center justify-content-center">
                                <p
                                    className={`tablink  mt-2 ps-2 pe-2 border me-2 ms-2 rounded text-dark-green lead ${
                                        activeTab === "products"
                                            ? "active-tab"
                                            : ""
                                    }`}
                                    onClick={() => handleActiveTab("products")}
                                >
                                    Products
                                </p>
                            </div>
                            {isSuperUser && (
                                <>
                                    {/* <div className="customers">
                                        <p
                                            className={`tablink mt-2 ps-2 pe-2 border me-2 ms-2 rounded text-dark-green lead ${
                                                activeTab === "customers"
                                                    ? "active-tab"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleActiveTab("customers")
                                            }
                                        >
                                            Customers
                                        </p>
                                    </div> */}
                                    <div>
                                        <p
                                            className={`tablink mt-2 ps-2 pe-2 border me-2 ms-2 rounded text-dark-green lead ${
                                                activeTab === "admins"
                                                    ? "active-tab"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleActiveTab("admins")
                                            }
                                        >
                                            Admins
                                        </p>
                                    </div>
                                    <div>
                                        <p
                                            className={`tablink mt-2 ps-2 pe-2 border me-2 ms-2 rounded text-dark-green lead ${
                                                activeTab === "vendors"
                                                    ? "active-tab"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleActiveTab("vendors")
                                            }
                                        >
                                            Vendors
                                        </p>
                                    </div>
                                    <div>
                                        <p
                                            className={`tablink mt-2 ps-2 pe-2 border me-2 ms-2 rounded text-dark-green lead ${
                                                activeTab === "categories"
                                                    ? "active-tab"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleActiveTab("categories")
                                            }
                                        >
                                            Categories
                                        </p>
                                    </div>
                                    <div>
                                        <p
                                            className={`tablink mt-2 ps-2 pe-2 border me-2 ms-2 rounded text-dark-green lead ${
                                                activeTab === "brands"
                                                    ? "active-tab"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleActiveTab("brands")
                                            }
                                        >
                                            Brands
                                        </p>
                                    </div>
                                </>
                            )}
                        </Nav>
                    </Card>
                </Col>
                <Col className="ps-3 mt-3">
                    {activeTab == "products" && (
                        <Products superUser={isSuperUser} />
                    )}
                    {/* {activeTab == "customers" && <Customers />} */}
                    {activeTab == "admins" && <Admins />}
                    {activeTab == "vendors" && <Vendors />}
                    {activeTab == "categories" && <Categories />}
                    {activeTab == "brands" && <Brands />}
                </Col>
            </div>
        </Container>
    );
};

function Products({ superUser }) {
    const { data = [], error, loading } = useGetAllProductsQuery();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    return (
        <div className="products">
            <div className="d-flex justify-content-between align-items-center">
                {superUser ? (
                    <h5 className="d-flex">All Products</h5>
                ) : (
                    <h5>My Products</h5>
                )}
                <Button
                    variant="success"
                    onClick={() => setShowAddModal(true)}
                >
                    <FiPlus size={20} /> Add New Product
                </Button>
                <AddProductModal
                    show={showAddModal}
                    onHide={() => setShowAddModal(false)}
                />
            </div>
            <Table
                responsive="md"
                striped
                bordered
                hover
                variant="light"
                className="text-center mt-4"
            >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Sell Price</th>
                        <th>Stock</th>
                        <th>Warranty</th>
                        {superUser ? <th>Vendor</th> : <></>}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.brand}</td>
                                <td>{item.category}</td>
                                <td>{item.sell_price}</td>
                                <td>{item.stock}</td>
                                <td>{item.warranty}</td>
                                {superUser && <td>{item.vendor}</td>}
                                <td>
                                    <div className="d-flex justify-content-around align-items-center gap-1">
                                        <Button
                                            variant="secondary"
                                            className="text-white"
                                            size="sm"
                                            onClick={() =>
                                                setShowEditModal(item.id)
                                            }
                                        >
                                            <FiEdit3 size={15} color="white" />
                                        </Button>

                                        <Button
                                            variant="danger"
                                            className="text-white"
                                            size="sm"
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
                                            <FiTrash size={15} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

// function Customers() {
//     const { data = [], loading, error } = useGetAllUsersQuery();
//     if (!data) {
//         return <>Loading...</>;
//     }
//     return (
//         <>
//             <h5 className="d-flex">All Customers</h5>
//             <Table striped bordered className="text-center">
//                 <thead>
//                     <tr>
//                         <th> Name </th>
//                         <th> Email </th>
//                         <th> Phone </th>
//                         <th> Active </th>
//                         <th> Actions </th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((item, index) => {
//                         return (
//                             <tr key={index}>
//                                 <td>
//                                     {item.first_name} {item.last_name}
//                                 </td>
//                                 <td>{item.email}</td>
//                                 <td>{item.phone_no}</td>
//                                 <td>
//                                     {item.is_active ? (
//                                         <FiCheck size={20} />
//                                     ) : (
//                                         <FiX />
//                                     )}
//                                 </td>
//                                 <td>
//                                     <div className="d-flex justify-content-around align-items-center">
//                                         <Button variant="secondary" size="sm">
//                                             <FiEdit3 size={15} />
//                                         </Button>
//                                         <Button variant="danger" size="sm">
//                                             <FiTrash size={15} />
//                                         </Button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </Table>
//         </>
//     );
// }

function Admins() {
    const { data = [], loading, error } = useGetAllAdminsQuery();
    const [showAddModal, setShowAddModal] = useState(false);
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="d-flex">All Admins</h5>
                <Button
                    variant="success"
                    onClick={() => setShowAddModal(true)}
                >
                    <FiPlus size={20} /> Add New Admin
                </Button>
                <AddAdminModal
                    show={showAddModal}
                    onHide={() => setShowAddModal(false)}
                />
            </div>
            <Table striped bordered className="text-center">
                <thead>
                    <tr>
                        <th> Name </th>
                        <th> Email </th>
                        <th> Phone </th>
                        <th> Vendor </th>
                        <th> Active </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    {item.first_name} {item.last_name}
                                </td>
                                <td>{item.email}</td>
                                <td>{item.phone_no}</td>
                                <td>{item.vendor}</td>
                                <td>
                                    {item.is_active ? (
                                        <FiCheck size={20} />
                                    ) : (
                                        <FiX />
                                    )}
                                </td>
                                <td>
                                    <div className="d-flex justify-content-around align-items-center">
                                        <Button variant="secondary" size="sm">
                                            <FiEdit3 size={15} />
                                        </Button>
                                        <Button variant="danger" size="sm">
                                            <FiTrash size={15} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}

const AddProductModal = ({ data, ...props }) => {
    const [values, setValues] = useState({
        name: "",
        buyPrice: "",
        sellPrice: "",
        stock: "",
        warranty: "",
        status: "",
        category: "",
        images: [],
    });

    const onChange = (e) => {
        if (e.target.name == "images") {
            setValues({ ...values, images: [...e.target.files] });
        } else {
            setValues({ ...values, [e.target.name]: e.target.value });
        }
    };

    const [addProduct, { isLoading: isLoadingAddProduct }] =
        useAddProductsMutation();

    async function handleSubmit(event) {
        event.preventDefault();
        const name = values["name"];
        const buyPrice = values["buyPrice"];
        const sellPrice = values["sellPrice"];
        const stock = values["stock"];
        const warranty = values["warranty"];
        const status = values["status"];
        const category = values["category"];
        const images = values["images"];

        try {
            const response = await addProduct({
                name,
                buyPrice,
                sellPrice,
                stock,
                warranty,
                status,
                category,
                images,
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="add-product-modal"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="add-new-product">Add New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group
                        as={Row}
                        controlId="name"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Name</h6>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="name"
                                htmlFor="name"
                                value={values["name"]}
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="buyPrice"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Buy Price</h6>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="number"
                                name="buyPrice"
                                htmlFor="buyPrice"
                                value={values["buyPrice"]}
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="sellPrice"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Sell Price</h6>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="number"
                                name="sellPrice"
                                htmlFor="sellPrice"
                                value={values["sellPrice"]}
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="stock"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Stock</h6>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="number"
                                name="stock"
                                htmlFor="stock"
                                value={values["stock"]}
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="warranty"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Warranty</h6>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="warranty"
                                htmlFor="warranty"
                                value={values["warranty"]}
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="category"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Category</h6>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Select
                                name="category"
                                htmlFor="category"
                                value={values["category"]}
                                onChange={onChange}
                            >
                                <option value="">Android</option>
                                <option value="">I-Phone</option>
                                <option value="">Smart Watch</option>
                                <option value="">Earphone</option>
                                <option value="">HeadPhone</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="images"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Images</h6>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="file"
                                multiple
                                name="images"
                                htmlFor="images"
                                defaultValue={values["images"]}
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
                <Button variant="danger" onClick={props.onHide}>
                    Cancel
                </Button>
                <Button variant="success" onClick={handleSubmit}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const AddAdminModal = ({ data, ...props }) => {
    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phoneNo: "",
        vendor: "",
        password: "",
    });

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const [addAdmin, { isLoading: isLoadingAddAdmin }] = useAddAdminMutation();

    return (
        <Modal {...props} size="lg" aria-labelledby="add-admin-modal" centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Admin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group
                        as={Row}
                        controlId="firstName"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>First Name</h6>
                        </Form.Label>
                        <Col cm="8">
                            <Form.Control
                                name="firstName"
                                htmlFor="firstName"
                                value={values["firstName"]}
                                onChange={onchange}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        controlId="lastName"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Last Name</h6>
                        </Form.Label>
                        <Col cm="8">
                            <Form.Control
                                name="lastName"
                                htmlFor="lastName"
                                value={values["lastName"]}
                                onChange={onchange}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        controlId="email"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Email</h6>
                        </Form.Label>
                        <Col cm="8">
                            <Form.Control
                                name="email"
                                htmlFor="email"
                                value={values["email"]}
                                onChange={onchange}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        controlId="phoneNo"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Phone Number</h6>
                        </Form.Label>
                        <Col cm="8">
                            <Form.Control
                                name="phoneNo"
                                htmlFor="phoneNo"
                                value={values["phoneNo"]}
                                onChange={onchange}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        controlId="vendor"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Vendor</h6>
                        </Form.Label>
                        <Col cm="8">
                            <Form.Control
                                name="vendor"
                                htmlFor="vendor"
                                value={values["vendor"]}
                                onChange={onchange}
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
                <Button
                    onClick={props.onHide}
                    id="closeButton"
                    variant="danger"
                >
                    Close
                </Button>
                <Button variant="success">Save</Button>
            </Modal.Footer>
        </Modal>
    );
};

function Vendors() {
    const { data = [], loading, error } = useGetAllVendorsQuery();
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="d-flex">All Vendors</h5>
                <Button variant="success" size="md">
                    <FiPlus size={20} /> Add New Vendor
                </Button>
            </div>
            <Table striped bordered className="text-center">
                <thead>
                    <tr>
                        <th> Name </th>
                        <th> Contact Person </th>
                        <th> Email </th>
                        <th> Phone </th>
                        <th> Address </th>
                        <th> Active </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.contact_person || "-"}</td>
                                <td>{item.email || "-"}</td>
                                <td>{item.contact_no || "-"}</td>
                                <td>{item.address}</td>
                                <td>
                                    {item.active ? (
                                        <FiCheck size={20} />
                                    ) : (
                                        <FiX />
                                    )}
                                </td>
                                <td>
                                    <div className="d-flex justify-content-around align-items-center">
                                        <Button variant="secondary" size="sm">
                                            <FiEdit3 size={15} />
                                        </Button>
                                        <Button variant="danger" size="sm">
                                            <FiTrash size={15} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}

function Categories() {
    const { data = [], loading, error } = useGetAllCategoriesQuery();
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="d-flex">All Categories</h5>
                <Button variant="success" size="md">
                    <FiPlus size={20} /> Add New Category
                </Button>
            </div>
            <Table striped bordered className="text-center">
                <thead>
                    <tr>
                        <th> Name </th>
                        <th> Sub_categories </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>
                                    {item.children?.map((children) => {
                                        return (
                                            <p key={children.id}>
                                                {children.name}
                                            </p>
                                        );
                                    })}
                                </td>
                                <td>
                                    <div className="d-flex justify-content-around align-items-center">
                                        <Button variant="secondary" size="sm">
                                            <FiEdit3 size={15} />
                                        </Button>
                                        <Button variant="danger" size="sm">
                                            <FiTrash size={15} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}

function Brands() {
    const { data = [], loading, error } = useGetAllBrandsQuery();
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="d-flex">All Brands</h5>
                <Button variant="success" size="md">
                    <FiPlus size={20} /> Add New Brand
                </Button>
            </div>
            <Table striped bordered className="text-center">
                <thead>
                    <tr>
                        <th colSpan={3}> Name </th>
                        {/* <th> Sub_categories </th> */}
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td colSpan={3}>{item.name}</td>
                                <td>
                                    <div className="d-flex justify-content-around align-items-center">
                                        <Button variant="secondary" size="sm">
                                            <FiEdit3 size={15} />
                                        </Button>
                                        <Button variant="danger" size="sm">
                                            <FiTrash size={15} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}
export default Admin;
