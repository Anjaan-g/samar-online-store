import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { FiCheckCircle, FiCircle, FiPlus } from "react-icons/fi";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Checkout from "./summary";
import { useDispatch, useSelector } from "react-redux";
import "./checkout.scss";
import { selectAddress, removeAddress } from "../../store/addressSlice";

const Billing = () => {
    const cart = useSelector((state) => state.cart);
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
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const [discount, setDiscount] = useState(0);

    const [modalShow, setModalShow] = useState(false);

    const handleClick = () => {
        
    }

    return (
        <Container>
            <h3 className="display-5">Billing & Address </h3>
            <div className="tracker d-flex container align-items-center justify-content-center mt-5 w-75">
                <Link to="/cart">
                    <h5>
                        <FiCheckCircle size={25} color="green" fill="white" />
                        &nbsp; Cart
                    </h5>
                </Link>
                <span className="divider d-flex"></span>
                <h5 className="text-dark-green">
                    <FiCircle size={12} color="green" />
                    &nbsp; Billing
                </h5>
                <span className="divider d-flex"></span>
                <h5>
                    <FiCircle size={12} />
                    &nbsp; Checkout
                </h5>
            </div>
            <div className="d-flex flex-row justify-content-between mt-5 flex-wrap gap-5">
                <Col lg={7} sm={12} xs={12}>
                    <Card>
                        <Card.Body>
                            <div className="d-flex flex-wrap justify-content-between">
                                <div className="d-flex flex-column">
                                    <div className="d-flex">
                                        <h4>
                                            Sagar Gaire
                                            <span className="alias display-block">
                                                Home
                                            </span>
                                        </h4>
                                        <span className="tag">Default</span>
                                    </div>
                                    <p>
                                        Sahabhagita Marga, Mid-Baneshwor,
                                        Kathmandu
                                    </p>
                                    <p>9847004480</p>
                                </div>
                                <div className="d-flex flex-column justify-content-end align-items-center">
                                    <Button
                                        variant="success"
                                        className="btn"
                                        onClick={() => {
                                            dispatch(
                                                selectAddress({
                                                    id: 1,
                                                    name: "Sagar Gaire",
                                                    address:
                                                        "Sahabhagita Marga, Mid-Baneshwor 10, Kathmandu",
                                                    contact: "9847004480",
                                                })
                                            );
                                            navigateTo("/payment");
                                        }}
                                    >
                                        Deliver to this address
                                    </Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <div className="d-flex justify-content-between align-items-center mt-5 mx-2">
                        <div className="back">
                            <Link to="/cart">
                                <Button
                                    variant="outline-light"
                                    className="text-dark-green back-button"
                                >
                                    <BiArrowBack /> &nbsp; Back
                                </Button>
                            </Link>
                        </div>
                        <div className="add-new">
                            <Button variant="danger" onClick={handleClick()}>
                                <FiPlus size={25} /> Add new Address
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col lg={4} md={12} sm={12} xs={12}>
                    <Checkout
                        totalPrice={totalPrice()}
                        totalQuantity={totalQuantity()}
                        discount={discount}
                        setDiscount={setDiscount}
                        page="billing"
                    />
                </Col>
            </div>
        </Container>
    );
};

export default Billing;
