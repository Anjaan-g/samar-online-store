import React, { useState } from "react";
import {
    useAddBannerMutation,
    useGetBannersQuery,
} from "../../store/bannersSlice";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FiEdit3, FiPlus, FiTrash, FiCheck } from "react-icons/fi";

import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

export const Banner = () => {
    const {
        data: bannersData = [],
        isLoading,
        isError,
    } = useGetBannersQuery();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(undefined);
    const [showDeleteModal, setShowDeleteModal] = useState(undefined);
    const banners = bannersData.data;

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        );
    }
    return (
        <div className="d-flex flex-column  align-items-center m-3 text-white">
            <div className="d-flex justify-content-between align-items-center w-100 mb-3 text-white">
                <h5 className="d-flex">Banners</h5>
                <Button
                    variant="success"
                    size="md"
                    onClick={() => setShowAddModal(true)}
                >
                    <FiPlus size={20} /> Add New Banner
                </Button>
                <AddBannerModal
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
                        <th>SN</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>URL</th>
                        <th>Created At</th>
                        <th>Archive</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="text-white">
                    {banners.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                    />
                                </td>
                                <td>{item.url}</td>
                                <td>{item.created_at}</td>
                                <td>{item.archive}</td>
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

const AddBannerModal = ({ data, ...props }) => {
    const [values, setValues] = useState({
        name: "",
        image: null,
        url: "",
    });

    const onChange = (e) => {
        console.log(e);
        if (e.target.name == "image") {
            setValues({ ...values, image: e.target.files[0] });
        } else {
            setValues({ ...values, [e.target.name]: e.target.value });
        }
    };

    const [addBanner, { isLoading: isLoadingBanner }] = useAddBannerMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = values["name"];
        const image = values["image"];
        const url = values["url"];
        console.log(image);

        try {
            const response = await addBanner({
                name,
                image,
                url,
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
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: "toast_message",
                });
            };
            notify();
            // document.getElementById("closeButton").click();
        }
    };

    if (isLoadingBanner) {
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
                <Modal.Title>Add Banner</Modal.Title>
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
                                type="text"
                                name="name"
                                htmlFor="name"
                                value={values["name"]}
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="image"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Image</h6>
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="file"
                                name="image"
                                htmlFor="image"
                                defaultValue={values["image"]}
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="url"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Url</h6>
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                name="url"
                                htmlFor="url"
                                value={values["url"]}
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
