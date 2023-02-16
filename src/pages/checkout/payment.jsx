import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { FiCheckCircle, FiCircle, FiEdit3 } from "react-icons/fi";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { CiDeliveryTruck } from "react-icons/ci";
import Checkout from "./summary";
import { useDispatch, useSelector } from "react-redux";
import "./checkout.scss";
import { Helmet } from "react-helmet";

const Payment = () => {
    const cart = useSelector((state) => state.cart);
    const deliveryAddress = useSelector((state) => state.deliveryAddress);

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

    const [discount, setDiscount] = useState(0);

    return (
        <Container>
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    {" "}
                    Samar Supplier | Payment | Choose a payment method to order
                    now{" "}
                </title>
                <link
                    rel="canonical"
                    href="http://samarsuppliers.com/payment"
                />
                <meta
                    name="description"
                    content="Select e-sewa, khalti, connect-ips or cash on delivery to pay for your products."
                />
            </Helmet>
            <h3 className="display-5">Payment</h3>
            <div className="tracker d-flex container align-items-center justify-content-center mt-5 w-75">
                <Link to="/cart">
                    <h5>
                        <FiCheckCircle size={25} color="green" fill="white" />
                        &nbsp; Cart
                    </h5>
                </Link>
                <span className="divider d-flex"></span>
                <Link to="/billing">
                    <h5>
                        <FiCheckCircle size={25} color="green" fill="white" />
                        &nbsp; Billing
                    </h5>
                </Link>
                <span className="divider d-flex"></span>
                <h5 className="text-dark-green">
                    <FiCircle size={12} color="green" />
                    &nbsp; Checkout
                </h5>
            </div>
            <Form>
                <div className="d-flex flex-row justify-content-between mt-5 flex-wrap ">
                    <Col lg={8} sm={12} xs={12}>
                        <Card>
                            <Card.Body>
                                <h4 className="mx-2">Delivery Options</h4>
                                <div className="d-flex flex-wrap justify-content-between mt-2">
                                    <Col lg={6} sm={12} xs={12}>
                                        <div className="input mb-3 mx-2">
                                            <Card>
                                                <Card.Body>
                                                    <Form.Check>
                                                        <div className="d-flex flex-row align-items-center gap-4">
                                                            <div className="">
                                                                <Form.Check.Input
                                                                    type="checkbox"
                                                                    id="free"
                                                                />
                                                            </div>
                                                            <div className="">
                                                                <Form.Check.Label
                                                                    htmlFor="free"
                                                                    type="checkbox"
                                                                >
                                                                    <div className="d-flex flex-column justify-content-start">
                                                                        <h6>
                                                                            Standard
                                                                            Delivery
                                                                            (Free)
                                                                        </h6>
                                                                        <p>
                                                                            Delivered
                                                                            on
                                                                            Feb
                                                                            20,
                                                                            2023
                                                                        </p>
                                                                    </div>
                                                                </Form.Check.Label>
                                                            </div>
                                                        </div>
                                                    </Form.Check>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </Col>
                                    <Col lg={6} sm={12} xs={12}>
                                        <div className="input mb-3 mx-2">
                                            <Card>
                                                <Card.Body>
                                                    <Form.Check>
                                                        <div className="d-flex flex-row align-items-center gap-4">
                                                            <div className="">
                                                                <Form.Check.Input
                                                                    type="checkbox"
                                                                    id="fast"
                                                                />
                                                            </div>
                                                            <div className="">
                                                                <Form.Check.Label
                                                                    htmlFor="fast"
                                                                    type="checkbox"
                                                                >
                                                                    <div className="d-flex flex-column justify-content-start">
                                                                        <h6>
                                                                            Fast
                                                                            Delivery
                                                                            (Rs.
                                                                            200)
                                                                        </h6>
                                                                        <p>
                                                                            Delivered
                                                                            on
                                                                            Feb
                                                                            12,
                                                                            2023
                                                                        </p>
                                                                    </div>
                                                                </Form.Check.Label>
                                                            </div>
                                                        </div>
                                                    </Form.Check>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </Col>
                                </div>
                            </Card.Body>
                        </Card>

                        <div className="d-flex flex-column mt-5 mx-2 ">
                            <Card>
                                <Card.Body>
                                    <h4>Payment Options</h4>
                                    <Card className="mt-3">
                                        <Card.Body>
                                            <div className="d-flex flex-row justify-content-between align-items-center">
                                                <Form.Check>
                                                    <div className="d-flex flex-row align-items-center gap-4">
                                                        <div className="">
                                                            <Form.Check.Input
                                                                type="checkbox"
                                                                id="khalti"
                                                            />
                                                        </div>
                                                        <div className="">
                                                            <Form.Check.Label
                                                                htmlFor="khalti"
                                                                type="checkbox"
                                                            >
                                                                <div className="d-flex flex-column justify-content-start">
                                                                    <h6>
                                                                        Pay
                                                                        with
                                                                        Khalti
                                                                    </h6>
                                                                    <p>
                                                                        You'll
                                                                        be
                                                                        redirected
                                                                        to
                                                                        Khalti
                                                                        portal
                                                                        for
                                                                        payment
                                                                    </p>
                                                                </div>
                                                            </Form.Check.Label>
                                                        </div>
                                                    </div>
                                                </Form.Check>
                                                <div className="khalti-logo">
                                                    <img
                                                        src="https://raw.githubusercontent.com/khalti/khalti-sdk-web/master/src/assets/icons/khalti.png"
                                                        alt="logo here"
                                                        width={150}
                                                    />
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    <Card className="mt-3">
                                        <Card.Body>
                                            <div className="d-flex flex-row justify-content-between align-items-center">
                                                <Form.Check>
                                                    <div className="d-flex flex-row align-items-center gap-4">
                                                        <div className="">
                                                            <Form.Check.Input
                                                                type="checkbox"
                                                                id="esewa"
                                                            />
                                                        </div>
                                                        <div className="">
                                                            <Form.Check.Label
                                                                htmlFor="esewa"
                                                                type="checkbox"
                                                            >
                                                                <div className="d-flex flex-column justify-content-start">
                                                                    <h6>
                                                                        Pay
                                                                        with
                                                                        e-Sewa
                                                                    </h6>
                                                                    <p>
                                                                        You'll
                                                                        be
                                                                        redirected
                                                                        to
                                                                        e-Sewa
                                                                        portal
                                                                        for
                                                                        payment
                                                                    </p>
                                                                </div>
                                                            </Form.Check.Label>
                                                        </div>
                                                    </div>
                                                </Form.Check>
                                                <div className="esewa-logo">
                                                    <img
                                                        src="https://blog.esewa.com.np/wp-content/uploads/2022/03/eSewa-logo.png"
                                                        alt="logo here"
                                                        width={130}
                                                    />
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    <Card className="mt-3">
                                        <Card.Body>
                                            <div className="d-flex flex-row justify-content-between align-items-center">
                                                <Form.Check>
                                                    <div className="d-flex flex-row align-items-center gap-4">
                                                        <div className="">
                                                            <Form.Check.Input
                                                                type="checkbox"
                                                                id="ips"
                                                            />
                                                        </div>
                                                        <div className="">
                                                            <Form.Check.Label
                                                                htmlFor="ips"
                                                                type="checkbox"
                                                            >
                                                                <div className="d-flex flex-column justify-content-start">
                                                                    <h6>
                                                                        Pay
                                                                        with
                                                                        Connect
                                                                        IPS
                                                                    </h6>
                                                                    <p>
                                                                        You'll
                                                                        be
                                                                        redirected
                                                                        to
                                                                        Connect
                                                                        IPS
                                                                        portal
                                                                        for
                                                                        payment
                                                                    </p>
                                                                </div>
                                                            </Form.Check.Label>
                                                        </div>
                                                    </div>
                                                </Form.Check>
                                                <div className="ips-logo">
                                                    <img
                                                        src="https://raw.githubusercontent.com/khalti/khalti-sdk-web/master/src/assets/icons/connectips.png"
                                                        alt="logo here"
                                                        width={150}
                                                    />
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    <Card className="mt-3">
                                        <Card.Body>
                                            <div className="d-flex flex-row justify-content-between align-items-center">
                                                <Form.Check>
                                                    <div className="d-flex flex-row align-items-center gap-4">
                                                        <div className="">
                                                            <Form.Check.Input
                                                                type="checkbox"
                                                                id="cod"
                                                            />
                                                        </div>
                                                        <div className="">
                                                            <Form.Check.Label
                                                                htmlFor="cod"
                                                                type="checkbox"
                                                            >
                                                                <div className="d-flex flex-column justify-content-start">
                                                                    <h6>
                                                                        Pay
                                                                        with
                                                                        Cash on
                                                                        Delivery
                                                                    </h6>
                                                                    <p>
                                                                        Get
                                                                        your
                                                                        cash
                                                                        ready
                                                                        when
                                                                        the
                                                                        item is
                                                                        delivered
                                                                        at your
                                                                        doorstep.
                                                                    </p>
                                                                </div>
                                                            </Form.Check.Label>
                                                        </div>
                                                    </div>
                                                </Form.Check>
                                                <div className="ips-logo mx-4">
                                                    <CiDeliveryTruck
                                                        size={70}
                                                    />
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-5 mb-5 mx-2">
                            <div className="back">
                                <Link to="/billing">
                                    <Button
                                        variant="outline-light"
                                        className="text-dark-green back-button"
                                    >
                                        <BiArrowBack /> &nbsp; Back
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4} md={12} sm={12} xs={12}>
                        <div className="d-flex flex-column gap-4 justify-content-around mb-4 mx-4">
                            <Card>
                                <Card.Body>
                                    <div className="d-flex flex-column justify-content-between">
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <h4>Billing Address</h4>
                                            <Link to="/billing">
                                                <FiEdit3
                                                    size={25}
                                                    color="green"
                                                />
                                            </Link>
                                        </div>
                                        <hr />
                                        <div className="d-flex flex-column justify-content-between align-items-start mt-2">
                                            <p>
                                                <strong>
                                                    {deliveryAddress.name}
                                                </strong>
                                            </p>
                                            <p>{deliveryAddress.address}</p>
                                            <p>{deliveryAddress.contact}</p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="checkout mx-4">
                            <Checkout
                                totalPrice={totalPrice()}
                                totalQuantity={totalQuantity()}
                                discount={discount}
                                setDiscount={setDiscount}
                                page="payment"
                            />
                        </div>

                        <div className="d-flex justify-content-center align-items-center mx-4 mt-4">
                            <Link>
                                <Button variant="success" className="btn-lg">
                                    Complete Order
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </div>
            </Form>
        </Container>
    );
};

export default Payment;
