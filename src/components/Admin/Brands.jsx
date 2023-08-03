import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

import { FiEdit3, FiPlus, FiTrash } from "react-icons/fi";
import Modal from "react-bootstrap/Modal";
import "./Admin.scss";

import {
    useGetAllBrandsQuery,
    useAddBrandMutation,
    useDeleteBrandMutation,
    useEditBrandMutation,
} from "../../store/brandsSlice";
import { toast } from "react-toastify";

/*
 * Brands modals
 */
export const Brands = () => {
    const { data = [], loading, error } = useGetAllBrandsQuery();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(undefined);
    const [showDeleteModal, setShowDeleteModal] = useState(undefined);

    return (
        <div className="d-flex flex-column align-items-center mt-3 ms-3 me-3 text-white">
            <div className="d-flex justify-content-between align-items-center w-100 mb-3 text-white">
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
            <Table hover bordered className="text-center text-white border-dark">
                <thead className="table-header">
                    <tr>
                        <th colSpan={3}> Name </th>
                        {/* <th> Sub_categories </th> */}
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody className="text-white">
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
        <Modal
            {...props}
            size="lg"
            aria-labelledby="add-brand-modal"
            centered
            className="custom-modal text-white"
        >
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
            className="custom-modal text-white"
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
            className="custom-modal text-white"
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
