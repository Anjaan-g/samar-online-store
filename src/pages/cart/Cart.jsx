import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    removeItem,
    incrementQuantity,
    decrementQuantity,
} from "../../store/cartSlice";
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
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);

    const [discount, setDiscount] = useState(0);

    const totalQuantity = () => {
        let totalQuantity = 0;
        cart.cart.forEach((item) => {
            totalQuantity += item.quantity;
        });
        return totalQuantity;
    };
    const totalPrice = () => {
        let totalPrice = 0;
        cart.cart.forEach((item) => {
            totalPrice += item.rate * item.quantity;
        });
        return totalPrice;
    };

    return (
        <Container className="w-full">
            <Helmet>
                <meta charSet="utf-8" />
                <title> Samar Supplier | Cart | Your Cart for all purposes </title>
                <link rel="canonical" href="http://samarsuppliers.com/cart" />
                <meta
                    name="description"
                    content="Track your items in the cart. Add new and authentic items to cart and find similar items easily."
                />
                
            </Helmet>
            <h3 className="display-5">Checkout</h3>
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
            <div className="table-content d-flex flex-row justify-content-between mt-5 flex-wrap gap-5">
                <Col lg={7} sm={12} xs={12}>
                    <Card>
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
                                <tbody className="align-middle">
                                    {cart.cart.map((item) => {
                                        return (
                                            <tr
                                                key={item.id}
                                                className="text-center "
                                            >
                                                <td>
                                                    <img
                                                        src={Item}
                                                        className="cart-image img-fluid rounded "
                                                    />
                                                    <Link to="/detail">
                                                        <p className="mx-3">
                                                            {item.name}
                                                        </p>
                                                    </Link>
                                                </td>
                                                <td> Rs. {item.rate}</td>
                                                <td className="text-center align-center">
                                                    <Card className="quantity-card mt-2">
                                                        <div className="quantity d-flex flex-row align-items-center justify-content-between mx-1">
                                                            <Button
                                                                variant=""
                                                                className={`quantity-button ${
                                                                    item.quantity <=
                                                                    1
                                                                        ? "disabled"
                                                                        : ""
                                                                }`}
                                                                onClick={() =>
                                                                    dispatch(
                                                                        decrementQuantity(
                                                                            item.id
                                                                        )
                                                                    )
                                                                }
                                                            >
                                                                <AiOutlineMinus />
                                                            </Button>
                                                            <h6 className="item-quantity mt-2 text-dark align-center">
                                                                {item.quantity}
                                                            </h6>
                                                            <Button
                                                                variant=""
                                                                className={`quantity-button ${
                                                                    item.quantity >=
                                                                    item.stock
                                                                        ? "disabled"
                                                                        : ""
                                                                }`}
                                                                onClick={() =>
                                                                    dispatch(
                                                                        incrementQuantity(
                                                                            item.id
                                                                        )
                                                                    )
                                                                }
                                                            >
                                                                <AiOutlinePlus />
                                                            </Button>
                                                        </div>
                                                    </Card>
                                                    <div className="d-flex flex-row justify-content-center mx-1">
                                                        {item.stock <= 20 && (
                                                            <p className="text-danger">
                                                                Available:{" "}
                                                                {item.stock}
                                                            </p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    Rs.{" "}
                                                    {item.rate * item.quantity}
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
                                                                    item.id
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
                        <div className="add-new">
                            {/* <Button variant="danger">
                                <FiPlus size={25} /> Add new Address
                            </Button> */}
                        </div>
                    </div>
                </Col>
                <Col lg={4} md={12} sm={12} xs={12}>
                    <Checkout
                        totalPrice={totalPrice()}
                        totalQuantity={totalQuantity()}
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
