import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { useGetAllBrandsQuery } from "../../../store/brandsSlice";
import { useGetAllCategoriesQuery } from "../../../store/categoriesSlice";

import {
    BsThreeDotsVertical,
    BsFillEyeFill,
    BsTrash,
    BsPenFill,
} from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import Pagination from "react-bootstrap/Pagination";

import "./Product.scss";
import {
    useGetAllProductsQuery,
    useAddProductsMutation,
} from "../../../store/productSlice";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import DropdownButton from "react-bootstrap/DropdownButton";

export const ListProducts = () => {
    const { data = [], error, loading } = useGetAllProductsQuery();
    const products = data.data;
    console.log(products);

    const [indeterminateCheckbox, setIndeterminateCheckbox] = useState(false);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="d-flex flex-column w-100 text-white m-3">
            <h4>List</h4>
            <Breadcrumb className="text-white bread">
                <Breadcrumb.Item
                    className="text-white"
                    href="/admin/dashboard"
                >
                    Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item className="text-white">
                    Product
                </Breadcrumb.Item>

                <Breadcrumb.Item className="text-light" active>
                    List
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card className="bg-dark">
                <Card.Header>
                    <Dropdown data-bs-theme="dark">
                        <Dropdown.Toggle variant="dark">
                            Publish
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">
                                Action
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                                Another action
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                                Something else
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Header>
                <Table
                    responsive="md"
                    hover
                    className="text-center"
                    variant="dark"
                >
                    <thead className="table-header">
                        <tr className="align-middle start-left">
                            <th>
                                <Form>
                                    <Form.Check
                                        type="checkbox"
                                        label=""
                                        id="select-all-checkbox "
                                        className=" :indeterminate "
                                    />
                                </Form>
                            </th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Publish</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((item) => {
                            return (
                                <tr key={item.id} className="align-middle">
                                    <td className="text-center align-middle">
                                        {/* <Form> */}
                                        <Form.Check
                                            type="checkbox"
                                            label=""
                                            id={`${item.id}`}
                                        />
                                        {/* </Form> */}
                                    </td>
                                    <td className="text-center align-middle">
                                        <Card.Body>
                                            <div className="d-flex justify-content-start align-items-center gap-2">
                                                <img
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_MEDIA_BASE_URL
                                                    }${item?.image}`}
                                                    alt=""
                                                    className="img-fluid rounded product-place"
                                                />
                                                {item.name}
                                            </div>
                                        </Card.Body>
                                    </td>
                                    <td>{item.sell_price}</td>
                                    <td>
                                        {item.publish ? (
                                            <Badge
                                                bg="accent"
                                                className="text-dark-green"
                                            >
                                                Published
                                            </Badge>
                                        ) : (
                                            <Badge
                                                bg="secondary"
                                                className="text-red"
                                            >
                                                Draft
                                            </Badge>
                                        )}
                                    </td>
                                    <td>
                                        <Dropdown
                                            variant="link"
                                            data-bs-theme="dark"
                                            drop="start"
                                            aria-labelledby="dropdownMenu"
                                        >
                                            <Dropdown.Toggle
                                                id={item.id}
                                                className="product-dropdown-toggle circle"
                                                variant="link"
                                                show="false"
                                                drop="start"
                                            >
                                                <BsThreeDotsVertical
                                                    size={20}
                                                    color="white"
                                                    className="circle"
                                                />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu variant="dark">
                                                <Dropdown.Item eventKey="view">
                                                    <BsFillEyeFill
                                                        size={20}
                                                        color="orange"
                                                    />
                                                    {"  "}
                                                    View
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey="edit">
                                                    <BsPenFill
                                                        size={20}
                                                        color="green"
                                                    />{" "}
                                                    Edit
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey="delete">
                                                    <BsTrash
                                                        size={20}
                                                        color="red"
                                                    />{" "}
                                                    Delete
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Card>
        </div>
    );
};
