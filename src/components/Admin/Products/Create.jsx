import React, { useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import InputGroup from "react-bootstrap/InputGroup";
import "./Product.scss";
import { BsFillXCircleFill, BsCloudArrowUpFill } from "react-icons/bs";
import Image from "../../../../assets/upload_files.svg";
import { useAddProductsMutation } from "../../../store/productSlice";
import { useGetAllBrandsQuery } from "../../../store/brandsSlice";
import { useGetAllVendorsQuery } from "../../../store/vendorSlice";
import { useGetAllCategoriesQuery } from "../../../store/categoriesSlice";

export const Create = () => {
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState([]);
    const [values, setValues] = useState({
        name: "",
        buyPrice: 0,
        sellPrice: 0,
        stock: 0,
        warranty: "",
        status: "",
        category: "",
        hightlight: "",
        description: "",
        publish: false,
    });

    const { data: brands = [], isError, isLoading } = useGetAllBrandsQuery();
    console.log(brands);

    const onChange = (e) => {
        console.log(e);
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const inputRef = useRef(null);

    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleFiles = (files) => {
        // Array.from(files).forEach(file => console.log(file))
        Array.from(files).forEach((file) =>
            setFiles((current) => [...current, file])
        );
    };

    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    const handleRemove = (index) => {};

    return (
        <div className="d-flex flex-column align-items-start text-white m-3 ">
            <div className="d-flex flex-column">
                <h4>Create a new product</h4>
                <Breadcrumb className="text-white bread">
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item className="text-white">
                        Product
                    </Breadcrumb.Item>

                    <Breadcrumb.Item className="text-light" active>
                        Create
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="bg-dark p-2 w-100">
                <div className="d-flex justify-content-between align-items-top flex-wrap gap-2 pt-2">
                    <Col lg={3} sm={12} md={12} className="pe-2">
                        <h4>Details</h4>
                        <p>Title, short description, image...</p>
                    </Col>
                    <Col lg={8} sm={12} md={12}>
                        <Card className="bg-dark me-2 w-100">
                            <Card.Body>
                                <div className="d-flex flex-column">
                                    <h6>Name</h6>

                                    <Form.Group
                                        as={Row}
                                        controlId="product-name"
                                        className="mb-2 align-items-center "
                                    >
                                        <Col>
                                            <Form.Control
                                                name="product-name"
                                                htmlFor="product-name"
                                                className="bg-dark text-white"
                                                placeholder="Product Name"
                                                value={values["name"]}
                                                onChange={onChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                </div>
                                <br />
                                <div className="d-flex flex-column">
                                    <h6>Highlight</h6>
                                    <Form.Group
                                        as={Row}
                                        controlId="sub-description"
                                        className="mb-2 align-items-center "
                                    >
                                        <Col>
                                            <Form.Control
                                                as="textarea"
                                                name="sub-description"
                                                htmlFor="sub-description"
                                                className="bg-dark text-white sub-description"
                                                placeholder="Main highlights for the product"
                                                value={values["highlight"]}
                                                onChange={onChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                </div>
                                <br />
                                <div className="d-flex flex-column">
                                    <h6> Content </h6>

                                    <Form.Group
                                        as={Row}
                                        controlId="description"
                                        className="mb-2 align-items-center "
                                    >
                                        <Col>
                                            <Form.Control
                                                as="textarea"
                                                name="description"
                                                htmlFor="description"
                                                className="bg-dark text-white prod-description"
                                                placeholder="Whole product specifications"
                                                value={values["description"]}
                                                onChange={onChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                </div>
                                <br />
                                <div className="d-flex flex-column">
                                    <h6>Images</h6>
                                    <Form.Group
                                        as={Row}
                                        controlId="image-upload-multiple"
                                        className="image-upload-area ms-2 "
                                        onDragEnter={handleDrag}
                                        onSubmit={(e) => e.preventDefault()}
                                    >
                                        <input
                                            type="file"
                                            multiple={true}
                                            id="image-upload-multiple"
                                            className={`d-none `}
                                            ref={inputRef}
                                            onChange={handleChange}
                                        />
                                        <label
                                            htmlFor="image-upload-multiple"
                                            className={`${
                                                dragActive ? "drag-active" : ""
                                            }`}
                                        >
                                            <div className="d-flex flex-column align-items-center pt-5 gap-4">
                                                <img
                                                    src={Image}
                                                    alt=""
                                                    width={80}
                                                />
                                                <div className="align-items-center d-flex flex-column">
                                                    <b>Drop or Select Files</b>

                                                    <p>
                                                        Drop files here or{" "}
                                                        <u className="text-dark-green">
                                                            browse
                                                        </u>{" "}
                                                        through your machine.{" "}
                                                    </p>
                                                </div>
                                            </div>
                                        </label>
                                        {dragActive && (
                                            <div
                                                id="drag-file-element"
                                                onDragEnter={handleDrag}
                                                onDragLeave={handleDrag}
                                                onDragOver={handleDrag}
                                                onDrop={handleDrop}
                                            ></div>
                                        )}
                                    </Form.Group>
                                    <div className="d-flex flex-column mt-3">
                                        <div className="d-flex">
                                            {files?.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <span className="d-inline-flex cross-button">
                                                            <BsFillXCircleFill
                                                                size={20}
                                                                color="white"
                                                            />
                                                        </span>
                                                        <img
                                                            src={URL.createObjectURL(
                                                                item
                                                            )}
                                                            alt=""
                                                            className="image-preview me-1"
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="d-flex justify-content-end align-items-center">
                                            {files.length >= 1 && (
                                                <div className="d-flex ">
                                                    <Button
                                                        variant="outline-secondary"
                                                        className="text-white"
                                                    >
                                                        Remove all
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </div>

                <div className="d-flex justify-content-between align-items-top flex-wrap gap-2 mt-3">
                    <Col lg={3} sm={12} md={12} className="pe-2">
                        <h4>Properties</h4>
                        <p>Additional properties</p>
                    </Col>
                    <Col lg={8} sm={12} md={12}>
                        <Card className="bg-dark">
                            <Card.Body>
                                <div className="d-flex flex-column">
                                    <h6>Warranty</h6>

                                    <Form.Group
                                        as={Row}
                                        controlId="warranty"
                                        className="mb-2 align-items-center "
                                    >
                                        <Col>
                                            <Form.Control
                                                name="warranty"
                                                htmlFor="warranty"
                                                className="bg-dark text-white"
                                                placeholder="Warranty Period"
                                                value={values["warranty"]}
                                                onChange={onChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                </div>
                                <br />
                                <div className="d-flex flex-column">
                                    <h6>Category</h6>
                                </div>
                                <Form.Group
                                    as={Row}
                                    controlId="category"
                                    className="mb-2 align-items-center "
                                >
                                    <Col>
                                        <Form.Select
                                            name="category"
                                            htmlFor="category"
                                            className="bg-dark text-white "
                                            placeholder="Main highlights for the product"
                                            value={values["category"]}
                                            onChange={onChange}
                                        >
                                            <option value=""></option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <br />
                                <div className="d-flex flex-column">
                                    <h6> Brand </h6>

                                    <Form.Group
                                        as={Row}
                                        controlId="brand"
                                        className="mb-2 align-items-center "
                                    >
                                        <Col>
                                            <Form.Select
                                                name="brand"
                                                htmlFor="brand"
                                                className="bg-dark text-white "
                                                placeholder="Whole product specifications"
                                                // defaultValue={values["brand"]}
                                                // onChange={onChange}
                                            >
                                                {brands?.map((item, index) => {
                                                    return(
                                                        <option value={item} key={index}>{item}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                </div>
                                <br />
                                <br />
                                <div className="d-flex flex-column">
                                    <h6> Status </h6>

                                    <Form.Group
                                        as={Row}
                                        controlId="status"
                                        className="mb-2 align-items-center "
                                    >
                                        <Col>
                                            <Form.Control
                                                name="status"
                                                htmlFor="status"
                                                className="bg-dark text-white "
                                                placeholder="Whole product specifications"
                                                defaultValue={values["status"]}
                                                onChange={onChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                </div>
                                <br />
                            </Card.Body>
                        </Card>
                    </Col>
                </div>

                <div className="d-flex justify-content-between align-items-top flex-wrap gap-2 mt-3">
                    <Col lg={3} sm={12} md={12} className="pe-2">
                        <h4>Pricing</h4>
                        <p>Price related data</p>
                    </Col>
                    <Col lg={8} sm={12} md={12}>
                        <Card className="bg-dark">
                            <Card.Body>
                                <div className="d-flex flex-column">
                                    <h6>Buy Price</h6>

                                    <Form.Group
                                        as={Row}
                                        controlId="buy-price"
                                        className="mb-2 align-items-center "
                                    >
                                        <Col>
                                            <Form.Control
                                                name="buy-price"
                                                htmlFor="buy-price"
                                                className="bg-dark text-white"
                                                placeholder="Buy Price"
                                                value={values["buyPrice"]}
                                                onChange={onChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                </div>
                                <br />
                                <div className="d-flex flex-column">
                                    <h6>Sell Price</h6>
                                </div>
                                <Form.Group
                                    as={Row}
                                    controlId="selling-price"
                                    className="mb-2 align-items-center "
                                >
                                    <Col>
                                        <Form.Control
                                            name="selling-price"
                                            htmlFor="selling-price"
                                            className="bg-dark text-white "
                                            placeholder="Selling Price"
                                            defaultValue={values["sellPrice"]}
                                            onChange={onChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                </div>

                <div className="d-flex justify-content-between align-items-center flex-wrap mt-4">
                    <Col lg={3} sm={12} md={12} className="pe-2"></Col>
                    <Col lg={8} sm={12} md={12}>
                        <div className="d-flex justify-content-between align-items-center">
                            <Form.Check
                                type="switch"
                                id="publish-switch"
                                label="Publish"
                                className="publish"
                                defaultChecked
                                value={values["publish"]}
                            />
                            <Button variant="light" className="publish-button">
                                <b>Create Product</b>
                            </Button>
                        </div>
                    </Col>
                </div>
            </div>
        </div>
    );
};
