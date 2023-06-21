import React, { useEffect } from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FiCheckCircle, FiCircle, FiPlus } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import Item from "../../../assets/5.webp";
import "./Cart.scss";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Checkout from "../checkout/summary";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
    incrementQuantity,
    decrementQuantity,
    removeItem,
} from "../../store/cartSlice";

import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    // console.log(cart);

    const dispatch = useDispatch();
    const [discount, setDiscount] = useState(0);

    const totalQuantity = () => {
        let totalQuantity = 0;
        cart?.data?.forEach((item) => {
            totalQuantity += item.qty;
        });
        return totalQuantity;
    };
    const totalPrice = () => {
        let totalPrice = 0;
        cart?.data?.forEach((item) => {
            totalPrice += item.price * item.qty;
        });
        return totalPrice;
    };
    const deliveryCharge = 0

    return (
        <Container className="w-full">
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    {" "}
                    Samar Supplier | Cart | Your Cart for all purposes{" "}
                </title>
                <link rel="canonical" href="http://samarsuppliers.com/cart" />
                <meta
                    name="description"
                    content="Track your items in the cart. Add new and authentic items to cart and find similar items easily."
                />
            </Helmet>
            <h3 className="display-5">Cart</h3>
            <div className="container tracker d-flex align-items-center mt-5 w-75">
                <h5 className="text-dark-green">
                    <FiCircle size={12} color="green" fill="white" />
                    &nbsp; Cart
                </h5>
                <span className="divider d-flex"></span>
                <h5>
                    <FiCircle size={12} />
                    &nbsp; Billing
                </h5>
                <span className="divider d-flex"></span>
                <h5>
                    <FiCircle size={12} />
                    &nbsp; Checkout
                </h5>
            </div>
            <div className="table-content d-flex flex-row justify-content-between mt-5 flex-wrap">
                <Col lg={8} sm={12} xs={12} md={12} className="pe-2">
                    <Card className="me-1 bg-light">
                        <Card.Header className="pt-4">
                            <h4>Cart ({totalQuantity()} Items)</h4>
                        </Card.Header>
                        <Card.Body>
                            <Table hover borderless className="align-middle">
                                <thead className="bg-dark-green text-white">
                                    <tr className="text-center">
                                        <th>Product</th>
                                        <th>Rate</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="align-middle border">
                                    {cart?.data?.map((item) => {
                                        return (
                                            <tr
                                                key={item.product_id}
                                                className="text-center "
                                            >
                                                <td>
                                                    <img
                                                        src={item.image}
                                                        className="cart-image img-fluid rounded "
                                                    />
                                                    <Link
                                                        to={`/detail/${item.product_id}`}
                                                    >
                                                        <p className="mx-3">
                                                            {item.product_name}
                                                        </p>
                                                    </Link>
                                                </td>
                                                <td> Rs. {item.price}</td>
                                                <td className="text-center align-center">
                                                    <Card className="quantity-card mt-2">
                                                        <div className="quantity d-flex flex-row align-items-center justify-content-between mx-1">
                                                            <Button
                                                                variant=""
                                                                className={`quantity-button ${
                                                                    item.qty <=
                                                                    1
                                                                        ? "disabled"
                                                                        : ""
                                                                }`}
                                                                onClick={() => {
                                                                    dispatch(
                                                                        decrementQuantity(
                                                                            item.product_id
                                                                        )
                                                                    );
                                                                    // handleUpdateCart();
                                                                }}
                                                            >
                                                                <AiOutlineMinus />
                                                            </Button>
                                                            <h6 className="item-quantity mt-2 text-dark align-center">
                                                                {item.qty}
                                                            </h6>
                                                            <Button
                                                                variant=""
                                                                className={`quantity-button ${
                                                                    item.qty >=
                                                                    item.stock
                                                                        ? "disabled"
                                                                        : ""
                                                                }`}
                                                                onClick={() => {
                                                                    dispatch(
                                                                        incrementQuantity(
                                                                            item.product_id
                                                                        )
                                                                    );
                                                                    // handleUpdateCart();
                                                                }}
                                                            >
                                                                <AiOutlinePlus />
                                                            </Button>
                                                        </div>
                                                    </Card>
                                                    <div className="d-flex flex-row justify-content-center mx-1">
                                                        {item.stock <= 10 && (
                                                            <p className="text-danger">
                                                                Available:{" "}
                                                                {item.stock}
                                                            </p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    Rs. {item.price * item.qty}
                                                </td>
                                                <td>
                                                    <FaTrash
                                                        className="mx-2"
                                                        color="red"
                                                        cursor="pointer"
                                                        size={20}
                                                        onClick={() => {
                                                            dispatch(
                                                                removeItem(
                                                                    item.product_id
                                                                )
                                                            );
                                                        }}
                                                        data-bs-toggle="tooltip"
                                                        title="Remove Item"
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                <tfoot className="text-center border">
                                    <tr>
                                        <th>Grand Total</th>
                                        <th></th>
                                        <th className="pe-5">
                                            {" "}
                                            {totalQuantity()}{" "}
                                        </th>
                                        <th> Rs. {totalPrice()} </th>
                                        <th></th>
                                    </tr>
                                </tfoot>
                            </Table>
                        </Card.Body>
                    </Card>
                    <div className="d-flex justify-content-between align-items-center mt-5">
                        <div className="back">
                            <Link to="/">
                                <Button
                                    variant="outline-light"
                                    className="text-dark-green back-button"
                                >
                                    <BiArrowBack /> Continue Shopping
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Col>
                <Col lg={4} md={12} sm={12} xs={12} className="ps-2">
                    <Checkout
                        totalPrice={totalPrice()}
                        totalQuantity={totalQuantity()}
                        deliveryCharge={deliveryCharge}
                        discount={discount}
                        setDiscount={setDiscount}
                        page="cart"
                    />
                </Col>
            </div>
        </Container>
    );
};

export default Cart;
