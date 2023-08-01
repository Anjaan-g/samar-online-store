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
import { toast } from "react-toastify";

export const Create = () => {
    const [dragActive, setDragActive] = useState(false);

    const [selectedFiles, setSelectedFiles] = useState([]); // Files are handled separately for RTK query

    console.log("These are selected files under the useState method");
    console.log(selectedFiles);

    const [values, setValues] = useState({
        name: "",
        buyPrice: 0,
        sellPrice: 0,
        stock: 1000,
        warranty: "",
        status: "",
        category: "",
        highlight: "",
        description: "",
        publish: false,
        brand: "",
    });
    console.log(values);

    const {
        data: brands = [],
        isError: brandsError,
        isLoading: brandsLoading,
    } = useGetAllBrandsQuery();

    const {
        data: categories = [],
        isError: categoriesError,
        isLoading: categoriesLoading,
    } = useGetAllCategoriesQuery();

    const onChange = (e) => {
        // console.log(e);
        if (e.target.name == "publish") {
            setValues({ ...values, publish: e.target.checked });
        } else {
            setValues({ ...values, [e.target.name]: e.target.value });
        }
    };

    const inputRef = useRef(null);

    // When dragging an image or multiple images
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // Update the files array with files
    const handleFiles = (files) => {
        // Array.from(files).forEach(file => console.log(file))
        console.log("These are selected files under the handle files method");
        console.log(files);
        // Array.from(files).forEach((file) =>
        setSelectedFiles([...selectedFiles, ...files]);
        // );
    };

    // Handle image dropped through dragging
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    // Add files to the files state
    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    // Remove all files from the files state
    const removeAll = () => {
        setSelectedFiles([]);
    };

    // Remove single file from the list of files on clicking X icon
    const handleRemove = (index) => {
        setSelectedFiles(selectedFiles.filter((file, i) => i !== index));
    };

    if (brandsLoading) {
        <div className="d-flex justify-content-center align-items-center">
            <Spinner size={100} />
        </div>;
    }
    if (categoriesLoading) {
        <div className="d-flex justify-content-center align-items-center">
            <Spinner size={100} />
        </div>;
    }

    const [addProduct, { isLoading: isLoadingAddProduct }] =
        useAddProductsMutation();

    async function handleSubmit(event) {
        event.preventDefault();

        let formData = new FormData();

        formData.append("name", values["name"]);
        formData.append("buy_price", values["buyPrice"]);
        formData.append("sell_price", values["sellPrice"]);
        formData.append("stock", values["stock"]);
        formData.append("warranty", values["warranty"]);
        formData.append("status", values["status"]);
        formData.append("category", values["category"]);
        formData.append("highlights", values["highlight"]);
        formData.append("description", values["description"]);
        formData.append("publish", values["publish"]);
        formData.append("brand", values["brand"]);

        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append("images", selectedFiles[i]);
        }

        try {
            const response = await addProduct(formData);
            console.log(response);
            const notify = () => {
                toast.success(response?.data["message"], {
                    position: toast.POSITION.TOP_RIGHT,
                    className: "toast-message",
                });
            };
            notify();
        } catch (error) {
            console.log(error);
            const notify = () => {
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT,
                    className: "toast_message",
                });
            };
            notify();
        }
    }

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
                {/* Details Name, highlight, content*/}
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
                                                name="name"
                                                htmlFor="product-name"
                                                className="bg-dark text-white"
                                                placeholder="Product Name"
                                                defaultValue={values["name"]}
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
                                                name="highlight"
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
                                                        Drop files here or
                                                        <u className="text-dark-green">
                                                            browse
                                                        </u>
                                                        through your machine.
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
                                        <div className="d-flex flex-wrap">
                                            {selectedFiles?.map(
                                                (item, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <span
                                                                className="d-inline-flex cross-button"
                                                                onClick={() =>
                                                                    handleRemove(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <BsFillXCircleFill
                                                                    size={20}
                                                                    color="red"
                                                                />
                                                            </span>
                                                            <img
                                                                src={URL.createObjectURL(
                                                                    item
                                                                )}
                                                                alt=""
                                                                className="image-preview me-1 mt-2"
                                                            />
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                        <div className="d-flex justify-content-end align-items-center flex-wrap">
                                            {selectedFiles.length >= 1 && (
                                                <Button
                                                    variant="outline-secondary"
                                                    className="text-white"
                                                    onClick={() => removeAll()}
                                                >
                                                    Remove all
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </div>

                {/* Properties: warranty, category, brand, status */}
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
                                        className="mb-2 align-items-center"
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
                                                <option value="null">
                                                    {" "}
                                                    ------Select one------{" "}
                                                </option>
                                                {categories?.map((item) => {
                                                    return (
                                                        <option
                                                            value={item.id}
                                                            key={item.id}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    );
                                                })}
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                </div>
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
                                                onChange={onChange}
                                            >
                                                <option value="null">
                                                    {" "}
                                                    ------Select one------{" "}
                                                </option>
                                                {brands?.map((item) => {
                                                    return (
                                                        <option
                                                            value={item.id}
                                                            key={item.id}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    );
                                                })}
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                </div>
                                <br />
                                <div className="d-flex flex-column">
                                    <h6> Status </h6>

                                    <Form.Group
                                        as={Row}
                                        controlId="status"
                                        className="mb-2 align-items-center "
                                    >
                                        <Col>
                                            <Form.Select
                                                name="status"
                                                htmlFor="status"
                                                className="bg-dark text-white "
                                                defaultValue={values["status"]}
                                                onChange={onChange}
                                            >
                                                <option value="null">
                                                    ------Select one------
                                                </option>
                                                {["NEW", "HOT", "SALE"]?.map(
                                                    (item, index) => {
                                                        return (
                                                            <option
                                                                value={item}
                                                                key={index}
                                                            >
                                                                {item}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                </div>
                                <br />
                            </Card.Body>
                        </Card>
                    </Col>
                </div>

                {/* Pricing details */}
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
                                        controlId="buyPrice"
                                        className="mb-2 align-items-center "
                                    >
                                        <Col>
                                            <Form.Control
                                                type="number"
                                                name="buyPrice"
                                                htmlFor="buyPrice"
                                                className="bg-dark text-white"
                                                placeholder="Buy Price"
                                                defaultValue={
                                                    values["buyPrice"]
                                                }
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
                                    controlId="sellPrice"
                                    className="mb-2 align-items-center "
                                >
                                    <Col>
                                        <Form.Control
                                            type="number"
                                            name="sellPrice"
                                            htmlFor="sellPrice"
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

                {/* Publish */}
                <div className="d-flex justify-content-between align-items-center flex-wrap mt-4">
                    <Col lg={3} sm={12} md={12} className="pe-2"></Col>
                    <Col lg={8} sm={12} md={12}>
                        <div className="d-flex justify-content-between align-items-center">
                            <Form.Check
                                type="switch"
                                name="publish"
                                id="publish-switch"
                                label="Publish"
                                className="publish"
                                defaultChecked={values["publish"]}
                                onChange={onChange}
                            />
                            <Button
                                variant="light"
                                className="publish-button"
                                onClick={(e) => handleSubmit(e)}
                            >
                                <b>Create Product</b>
                            </Button>
                        </div>
                    </Col>
                </div>
            </div>
        </div>
    );
};
