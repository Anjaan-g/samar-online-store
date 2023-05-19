import React, { useEffect, useState } from "react";
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
    useUpdateAdminMutation,
} from "../../store/userSlice";
import { FiEdit3, FiPlus, FiTrash, FiCheck, FiX } from "react-icons/fi";
import { Helmet } from "react-helmet";
import Modal from "react-bootstrap/Modal";
import "./Admin.scss";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import {
    useGetAllVendorsQuery,
    useAddVendorsMutation,
    useEditVendorMutation,
    useDeleteVendorMutation,
} from "../../store/vendorSlice";
import { useGetAllCategoriesQuery } from "../../store/categoriesSlice";
import {
    useGetAllBrandsQuery,
    useAddBrandMutation,
    useDeleteBrandMutation,
    useEditBrandMutation,
} from "../../store/brandsSlice";
import { toast } from "react-toastify";

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
    const products = data.data
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
                    {products?.map((item) => {
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

/*
    TODO: Add, Update, Delete modals for admins.
*/
function Admins() {
    const { data = [], loading, error } = useGetAllAdminsQuery();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(undefined);
    const [showDeleteModal, setShowDeleteModal] = useState(undefined);

    console.log(data);
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        );
    }
    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        );
    }
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
                    <EditAdminModal
                        show={showEditModal}
                        onHide={() => setShowEditModal(undefined)}
                        data={data.find((x) => x.id === showEditModal)}
                    />
                    <DeleteAdminModal
                        show={showDeleteModal}
                        onHide={() => setShowDeleteModal(undefined)}
                        data={data.find((x) => x.id === showDeleteModal)}
                    />
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
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() =>
                                                setShowEditModal(item.id)
                                            }
                                        >
                                            <FiEdit3 size={15} />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() =>
                                                setShowDeleteModal(item.id)
                                            }
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
        </>
    );
}

const AddAdminModal = ({ data, ...props }) => {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        vendor: "",
        password: "",
    });
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const [addAdmin, { isLoading: isLoadingAddAdmin }] = useAddAdminMutation();

    const {
        data: vendorsData,
        isLoading,
        isError,
        error,
    } = useGetAllVendorsQuery();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const firstName = values["firstName"];
        const lastName = values["lastName"];
        const email = values["email"];
        const phoneNo = values["phoneNo"];
        const vendor = values["vendor"];
        const password = values["password"];

        try {
            const response = await addAdmin({
                firstName,
                lastName,
                email,
                phoneNo,
                vendor,
                password,
            });
            console.log(response);
            const notify = () => {
                toast.success(response.data["message"], {
                    position: toast.POSITION.TOP_RIGHT,
                    className: "toast-message",
                });
            };
            notify();
            document.getElementById("closeButton").click();
        } catch (error) {
            const notify = () => {
                toast.error(response.data["message"], {
                    position: toast.POSITION.TOP_RIGHT,
                    className: "toast_message",
                });
            };
            notify();
            document.getElementById("closeButton").click();
        }
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        );
    }
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
                                defaultValue={values["firstName"]}
                                onChange={onChange}
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
                                defaultValue={values["lastName"]}
                                onChange={onChange}
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
                                defaultValue={values["email"]}
                                onChange={onChange}
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
                                type="number"
                                defaultValue={values["phoneNo"]}
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="password"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Password</h6>
                        </Form.Label>
                        <Col cm="8">
                            <Form.Control
                                name="password"
                                htmlFor="password"
                                type="alphanumeric"
                                defaultValue={values["password"]}
                                onChange={onChange}
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
                            <Form.Select
                                name="vendor"
                                htmlFor="vendor"
                                defaultValue={values["vendor"]}
                                onChange={onChange}
                            >
                                {vendorsData.map((item) => {
                                    return (
                                        <option value={item.id} key={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </Form.Select>
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
                <Button onClick={handleSubmit} variant="success">
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const EditAdminModal = ({ data, ...props }) => {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        vendor: "",
    });

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    console.log(values);
    // console.log(data.vendor.id)
    const {
        data: vendorsData,
        isLoading: isLoadingVendors,
        isError,
        error,
    } = useGetAllVendorsQuery();
    console.log(vendorsData);
    useEffect(() => {
        if (data) {
            setValues({
                firstName: data.first_name,
                lastName: data.last_name,
                email: data.email,
                phoneNo: data.phone_no,
                vendor: data.vendor,
            });
        }
    }, [data]);

    const [updateAdmin, { isLoading: isLoadingUpdateAdmin }] =
        useUpdateAdminMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const firstName = values["firstName"];
        const lastName = values["lastName"];
        const email = values["email"];
        const phoneNo = values["phoneNo"];
        const vendor = values["vendor"];
        const id = data.id;

        try {
            const response = await updateAdmin({
                id,
                firstName,
                lastName,
                email,
                phoneNo,
                vendor,
            });
            console.log(response);
            const notify = () => {
                toast.success("Successfully updated admin's data", {
                    position: toast.POSITION.TOP_RIGHT,
                    className: "toast-message",
                });
            };
            notify();
            document.getElementById("closeButton").click();
        } catch (error) {
            const notify = () => {
                toast.error("Sorry! Some error occured.", {
                    position: toast.POSITION.TOP_RIGHT,
                    className: "toast_message",
                });
            };
            notify();
            document.getElementById("closeButton").click();
        }
    };

    if (isLoadingUpdateAdmin) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        );
    }

    if (isLoadingVendors) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        );
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="add-admin-modal" centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Admin</Modal.Title>
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
                                value={values && values["firstName"]}
                                onChange={onChange}
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
                                value={values && values["lastName"]}
                                onChange={onChange}
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
                                value={values && values["email"]}
                                onChange={onChange}
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
                                type="number"
                                value={values && values["phoneNo"]}
                                onChange={onChange}
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
                            <Form.Select
                                name="vendor"
                                htmlFor="vendor"
                                value={values && values["vendor"]}
                                onChange={onChange}
                            >
                                {vendorsData.map((item) => {
                                    return (
                                        <option value={item.id} key={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </Form.Select>
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
                <Button onClick={handleSubmit} variant="success">
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
const DeleteAdminModal = ({ data, ...props }) => {};
/*
  TODO: Add different modals for vendors (add, edit, delete)
  * DONE !!
*/
function Vendors() {
    const { data = [], loading, error } = useGetAllVendorsQuery();

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(undefined);
    const [showDeleteModal, setShowDeleteModal] = useState(undefined);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        );
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="d-flex">All Vendors</h5>
                <Button
                    variant="success"
                    size="md"
                    onClick={() => setShowAddModal(true)}
                >
                    <FiPlus size={20} /> Add New Vendor
                </Button>
                <AddVendorModal
                    show={showAddModal}
                    onHide={() => setShowAddModal(false)}
                />
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
                    <EditVendorModal
                        show={showEditModal}
                        onHide={() => setShowEditModal(undefined)}
                        data={data.find((x) => x.id === showEditModal)}
                    />
                    <DeleteVendorModal
                        show={showDeleteModal}
                        onHide={() => setShowDeleteModal(undefined)}
                        data={data.find((x) => x.id === showDeleteModal)}
                    />
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
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() =>
                                                setShowEditModal(item.id)
                                            }
                                        >
                                            <FiEdit3 size={15} />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() =>
                                                setShowDeleteModal(item.id)
                                            }
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
        </>
    );
}

const AddVendorModal = ({ data, ...props }) => {
    const [values, setValues] = useState({
        name: "",
        contactPerson: "",
        email: "",
        address: "",
        contactNo: "",
    });

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const [addVendor, { isLoading: isLoadingAddVendor }] =
        useAddVendorsMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = values["name"];
        const contactPerson = values["contactPerson"];
        const email = values["email"];
        const address = values["address"];
        const contactNo = values["contactNo"];

        try {
            const response = await addVendor({
                name,
                contactPerson,
                email,
                address,
                contactNo,
            });
            const notify = () => {
                toast.success(response.data["message"], {
                    position: toast.POSITION.TOP_RIGHT,
                    className: "toast-message",
                });
            };
            notify();
            document.getElementById("closeButton").click();
        } catch (error) {
            const notify = () => {
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: "toast_message",
                });
            };
            notify();
            document.getElementById("closeButton").click();
        }
    };

    if (isLoadingAddVendor) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        );
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="add-vendor-modal"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Add Vendor</Modal.Title>
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
                        <Col>
                            <Form.Control
                                name="name"
                                htmlFor="name"
                                defaultValue={values["name"]}
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="contactPerson"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Contact Person</h6>
                        </Form.Label>
                        <Col>
                            <Form.Control
                                name="contactPerson"
                                htmlFor="contactPerson"
                                defaultValue={values["contactPerson"]}
                                onChange={onChange}
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
                        <Col>
                            <Form.Control
                                name="email"
                                htmlFor="email"
                                defaultValue={values["email"]}
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="address"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Address</h6>
                        </Form.Label>
                        <Col>
                            <Form.Control
                                name="address"
                                htmlFor="address"
                                defaultValue={values["address"]}
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="contactNo"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Contact No.</h6>
                        </Form.Label>
                        <Col>
                            <Form.Control
                                name="contactNo"
                                htmlFor="contactNo"
                                defaultValue={values["contactNo"]}
                                onChange={onChange}
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
                <Button onClick={handleSubmit} variant="success">
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const EditVendorModal = ({ data, ...props }) => {
    const [values, setValues] = useState({
        name: "",
        contactPerson: "",
        email: "",
        address: "",
        contactNo: "",
    });

    useEffect(() => {
        if (data) {
            setValues({
                name: data.name,
                contactPerson: data.contact_person,
                email: data.email,
                address: data.address,
                contactNo: data.contact_no,
            });
        }
    }, [data]);

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const [editVendor, { isLoading: isLoadingEditVendor }] =
        useEditVendorMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = data.id;
        const name = values["name"];
        const contactPerson = values["contactPerson"];
        const email = values["email"];
        const address = values["address"];
        const contactNo = values["contactNo"];

        try {
            const response = await editVendor({
                id,
                name,
                contactPerson,
                email,
                address,
                contactNo,
            });
            const notify = () => {
                toast.success(response.data["message"], {
                    position: toast.POSITION.TOP_RIGHT,
                    className: "toast-message",
                });
            };
            notify();
            document.getElementById("closeButton").click();
        } catch (error) {
            const notify = () => {
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: "toast_message",
                });
            };
            notify();
            document.getElementById("closeButton").click();
        }
    };

    if (isLoadingEditVendor) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        );
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="add-vendor-modal"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Vendor</Modal.Title>
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
                        <Col>
                            <Form.Control
                                name="name"
                                htmlFor="name"
                                value={values && values["name"]}
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="contactPerson"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Contact Person</h6>
                        </Form.Label>
                        <Col>
                            <Form.Control
                                name="contactPerson"
                                htmlFor="contactPerson"
                                value={values && values["contactPerson"]}
                                onChange={onChange}
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
                        <Col>
                            <Form.Control
                                name="email"
                                htmlFor="email"
                                value={values && values["email"]}
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="address"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Address</h6>
                        </Form.Label>
                        <Col>
                            <Form.Control
                                name="address"
                                htmlFor="address"
                                value={values && values["address"]}
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="contactNo"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Contact No.</h6>
                        </Form.Label>
                        <Col>
                            <Form.Control
                                name="contactNo"
                                htmlFor="contactNo"
                                value={values && values["contactNo"]}
                                onChange={onChange}
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
                <Button onClick={handleSubmit} variant="success">
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const DeleteVendorModal = ({ data, ...props }) => {
    const [deleteVendor, { isLoading: isLoadingDeleteVendor }] =
        useDeleteVendorMutation();

    async function handleSubmit(event) {
        event.preventDefault();
        const id = data.id;
        try {
            const response = await deleteVendor({
                id,
            });
            const notify = () => {
                toast.success("Successfully deleted Vendor!", {
                    position: toast.POSITION.TOP_RIGHT,
                    className: "toast-message",
                });
            };
            notify();
            document.getElementById("closeButton").click();
        } catch (error) {
            const notify = () => {
                toast.error("Some error occured!", {
                    position: toast.POSITION.TOP_RIGHT,
                    className: "toast-message",
                });
            };
            notify();
            document.getElementById("closeButton").click();
        }
    }

    if (isLoadingDeleteVendor) {
        <div className="d-flex justify-content-center align-items-center">
            <Spinner />
        </div>;
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="delete-vendor-modal"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title> Delete Vendor? </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Are you sure you want to delete this Vendor?</p>
            </Modal.Body>

            <Modal.Footer className="justify-content-between">
                <Button
                    onClick={props.onHide}
                    id="closeButton"
                    variant="danger"
                >
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="success">
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

/* 
    TODO: Add different modals for Categories.
    * DONE: Categories add, edit, delete modals 
*/
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

/* 
    TODO: Add different modals for brands.
    * DONE: Brands add, edit, delete modals 
*/
function Brands() {
    const { data = [], loading, error } = useGetAllBrandsQuery();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(undefined);
    const [showDeleteModal, setShowDeleteModal] = useState(undefined);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="d-flex">All Brands</h5>
                <Button
                    variant="success"
                    size="md"
                    onClick={() => setShowAddModal(true)}
                >
                    <FiPlus size={20} /> Add New Brand
                </Button>
                <AddBrandModal
                    show={showAddModal}
                    onHide={() => setShowAddModal(false)}
                />
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
                    <EditBrandModal
                        show={showEditModal !== undefined}
                        onHide={() => setShowEditModal(undefined)}
                        data={data.find((x) => x.id === showEditModal)}
                    />
                    <DeleteBrandModal
                        show={showDeleteModal !== undefined}
                        onHide={() => setShowDeleteModal(undefined)}
                        data={data.find((x) => x.id === showDeleteModal)}
                    />
                    {data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td colSpan={3}>{item.name}</td>
                                <td>
                                    <div className="d-flex justify-content-around align-items-center">
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() =>
                                                setShowEditModal(item.id)
                                            }
                                        >
                                            <FiEdit3 size={15} />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() =>
                                                setShowDeleteModal(item.id)
                                            }
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
        </>
    );
}

const AddBrandModal = ({ data, ...props }) => {
    const [values, setValues] = useState({
        name: "",
    });
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const [addBrand, { isLoading: isLoadingBrand }] = useAddBrandMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = values["name"];

        try {
            const response = await addBrand({
                name,
            });
            const notify = () => {
                toast.success(response.data["message"], {
                    position: toast.POSITION.TOP_RIGHT,
                    className: "toast-message",
                });
            };
            notify();
            document.getElementById("closeButton").click();
        } catch (error) {
            const notify = () => {
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: "toast_message",
                });
            };
            notify();
            document.getElementById("closeButton").click();
        }
    };

    if (isLoadingBrand) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        );
    }
    return (
        <Modal {...props} size="lg" aria-labelledby="add-brand-modal" centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Brand</Modal.Title>
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
                        <Col>
                            <Form.Control
                                name="name"
                                htmlFor="name"
                                defaultValue={values["name"]}
                                onChange={onChange}
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
                <Button onClick={handleSubmit} variant="success">
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const EditBrandModal = ({ data, ...props }) => {
    const [values, setValues] = useState({ name: "" });

    useEffect(() => {
        if (data) {
            setValues({
                name: data.name,
            });
        }
    }, [data]);

    const [updateBrand, { isLoading: isLoadingBrandUpdate }] =
        useEditBrandMutation();

    async function handleSubmit(event) {
        event.preventDefault();
        const name = values["name"];
        const id = data.id;
        console.log(id, name);
        try {
            const response = await updateBrand({
                id,
                name,
            });
            const notify = () => {
                toast.success(response.data["message"], {
                    position: toast.POSITION.TOP_RIGHT,
                    className: "toast-message",
                });
            };
            notify();
            props.onHide;
        } catch (error) {
            const notify = () => {
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: "toast-message",
                });
            };
            notify();
            props.onHide;
        }
        document.getElementById("closeButton").click();
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="edit-brand-modal"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Brand</Modal.Title>
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
                        <Col>
                            <Form.Control
                                name="name"
                                htmlFor="name"
                                value={values && values["name"]}
                                onChange={onChange}
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
                <Button onClick={handleSubmit} variant="success">
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const DeleteBrandModal = ({ data, ...props }) => {
    const [deleteBrand, { isLoading: isLoadingDeleteBrand }] =
        useDeleteBrandMutation();
    async function handleSubmit(event) {
        event.preventDefault();
        const id = data.id;
        try {
            const response = await deleteBrand({
                id,
            });
            const notify = () => {
                toast.success("Successfully deleted brand!", {
                    position: toast.POSITION.TOP_RIGHT,
                    className: "toast-message",
                });
            };
            notify();
            document.getElementById("closeButton").click();
        } catch (error) {
            const notify = () => {
                toast.error("Some error occured!", {
                    position: toast.POSITION.TOP_RIGHT,
                    className: "toast-message",
                });
            };
            notify();
            document.getElementById("closeButton").click();
        }
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="delete-brand-modal"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title> Delete Brand? </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Are you sure you want to delete this brand?</p>
            </Modal.Body>

            <Modal.Footer className="justify-content-between">
                <Button
                    onClick={props.onHide}
                    id="closeButton"
                    variant="danger"
                >
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="success">
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default Admin;
