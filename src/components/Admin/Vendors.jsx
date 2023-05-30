import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

import { FiEdit3, FiPlus, FiTrash, FiCheck } from "react-icons/fi";
import Modal from "react-bootstrap/Modal";
import "./Admin.scss";
import {
    useGetAllVendorsQuery,
    useAddVendorsMutation,
    useEditVendorMutation,
    useDeleteVendorMutation,
} from "../../store/vendorSlice";

import { toast } from "react-toastify";

export const Vendors = () => {
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
        <div className="d-flex flex-column w-100 align-items-center mt-3 ms-3 me-3 text-white">
            <div className="d-flex justify-content-between align-items-center mb-3 w-100 text-white">
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
            <Table
                hover
                bordered
                className="text-center text-white border-dark"
            >
                <thead className="table-header">
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
};

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
            animation
            className="custom-modal text-white"
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
            className="custom-modal text-white"
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
            className="custom-modal text-white"
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
