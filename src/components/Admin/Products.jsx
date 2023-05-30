import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import {
    useGetAllProductsQuery,
    useAddProductsMutation,
} from "../../store/productSlice";

import { FiEdit3, FiPlus, FiTrash, FiSearch } from "react-icons/fi";
import Modal from "react-bootstrap/Modal";
import "./Admin.scss";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

import { toast } from "react-toastify";

export const Products = () => {
    const token = Cookies.get("token");
    const decodedData = jwtDecode(token);
    const superUser = decodedData.is_superuser;
    const { data = [], error, loading } = useGetAllProductsQuery();
    const products = data.data;
    console.log(products);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(undefined);
    const [showDeleteModal, setShowDeleteModal] = useState(undefined);

    return (
        <div className="products d-flex flex-column w-100 me-3 ms-3 mt-3 text-white">
            <div className="d-flex justify-content-between align-items-center text-white">
                {superUser ? (
                    <h5 className="d-flex">All Products</h5>
                ) : (
                    <h5>My Products</h5>
                )}
                <div className="d-flex justify-content-between align-items-center gap-4">
                    <Button
                        variant="success"
                        onClick={() => setShowAddModal(true)}
                    >
                        <FiSearch size={20} /> Review Products
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => setShowAddModal(true)}
                    >
                        <FiPlus size={20} /> Add New Product
                    </Button>
                </div>
                <AddProductModal
                    show={showAddModal}
                    onHide={() => setShowAddModal(false)}
                />
            </div>
            <Table
                responsive="md"
                bordered
                hover
                className="text-center mt-4 text-white border-dark"
            >
                <thead className="table-header">
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
                                            variant="primary"
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
};

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
            className="custom-modal text-white"
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

const EditProductModal = ({ data, ...props }) => {};
const DeleteProductModal = ({ data, ...props }) => {};
