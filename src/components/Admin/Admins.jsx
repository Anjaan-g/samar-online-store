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
import Modal from "react-bootstrap/Modal";

import {
    useAddAdminMutation,
    useGetAllAdminsQuery,
    useUpdateAdminMutation,
} from "../../store/userSlice";
import {
    FiEdit3,
    FiPlus,
    FiTrash,
    FiCheck,
    FiX,
    FiSearch,
} from "react-icons/fi";
import {
    useGetAllVendorsQuery,
    useAddVendorsMutation,
    useEditVendorMutation,
    useDeleteVendorMutation,
} from "../../store/vendorSlice";

export function Admins() {
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
        <div className="d-flex flex-column w-100 m-3 align-items-center text-white">
            <div className="d-flex justify-content-between w-100 align-items-center text-white mb-3">
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
            <Table
                hover
                bordered
                className="text-center text-white border-dark"
            >
                <thead className="table-header">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Vendor</th>
                        <th>Active</th>
                        <th>Actions</th>
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
                                        <FiCheck size={20} color="white" />
                                    ) : (
                                        <FiX />
                                    )}
                                </td>
                                <td>
                                    <div className="d-flex justify-content-around align-items-center">
                                        <Button
                                            variant="primary"
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
        </div>
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
        <Modal
            {...props}
            size="lg"
            aria-labelledby="add-admin-modal"
            centered
            className="custom-modal text-white"
        >
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
        <Modal
            {...props}
            size="lg"
            aria-labelledby="add-admin-modal"
            centered
            className="custom-modal text-white"
        >
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
