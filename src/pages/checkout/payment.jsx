import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
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
import { useGetCartItemsQuery } from "../../store/userCartSlice";
import dayjs from "dayjs";

const Payment = () => {
    const deliveryAddress = useSelector((state) => state.deliveryAddress);

    const [deliveryOption, setDeliveryOption] = useState("free");
    const [paymentOption, setPaymentOption] = useState("cod");

    const handleDeliveryOption = (key) => {
        setDeliveryOption(key);
    };

    const handleDeliveryChecked = (id) => {
        if (id == deliveryOption) {
            return true;
        } else {
            return false;
        }
    };

    const handlePaymentOption = (key) => {
        setPaymentOption(key);
    };
    const handlePaymentChecked = (id) => {
        if (id == paymentOption) {
            return true;
        } else {
            return false;
        }
    };

    const cart = useSelector((state) => state.cart);

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
            totalPrice += item.rate * item.qty;
        });
        return totalPrice;
    };

    const [discount, setDiscount] = useState(0);
    const a = dayjs();
    const freeDeliveryDate = a.add(7, "day").format("dddd, YYYY/MM/DD");
    const fastDeliveryDate = a.add(3, "day").format("dddd, YYYY/MM/DD");

    return (
        <Container>
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    Samar Supplier | Payment | Choose a payment method to order
                    now
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
                                            <Card
                                                onClick={() =>
                                                    handleDeliveryOption(
                                                        "free"
                                                    )
                                                }
                                            >
                                                <Card.Body>
                                                    <Form.Check>
                                                        <div
                                                            className="d-flex flex-row align-items-center gap-4"
                                                            onClick={() =>
                                                                handleDeliveryOption(
                                                                    "free"
                                                                )
                                                            }
                                                        >
                                                            <div className="">
                                                                <Form.Check.Input
                                                                    type="checkbox"
                                                                    id="free"
                                                                    checked={handleDeliveryChecked(
                                                                        "free"
                                                                    )}
                                                                    readOnly
                                                                    onClick={() =>
                                                                        handleDeliveryOption(
                                                                            "free"
                                                                        )
                                                                    }
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
                                                                            on:
                                                                            &nbsp;
                                                                            {
                                                                                freeDeliveryDate
                                                                            }
                                                                            (approx.)
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
                                            <Card
                                                onClick={() =>
                                                    handleDeliveryOption(
                                                        "fast"
                                                    )
                                                }
                                            >
                                                <Card.Body>
                                                    <Form.Check>
                                                        <div className="d-flex flex-row align-items-center gap-4">
                                                            <div className="">
                                                                <Form.Check.Input
                                                                    type="checkbox"
                                                                    id="fast"
                                                                    checked={handleDeliveryChecked(
                                                                        "fast"
                                                                    )}
                                                                    onClick={() =>
                                                                        handleDeliveryOption(
                                                                            "fast"
                                                                        )
                                                                    }
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="">
                                                                <Form.Check.Label
                                                                    htmlFor="fast"
                                                                    type="checkbox"
                                                                    onClick={() =>
                                                                        handleDeliveryOption(
                                                                            "fast"
                                                                        )
                                                                    }
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
                                                                            on:
                                                                            &nbsp;
                                                                            {
                                                                                fastDeliveryDate
                                                                            }{" "}
                                                                            (approx.)
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
                                    <Card
                                        className="mt-3"
                                        onClick={() =>
                                            handlePaymentOption("khalti")
                                        }
                                    >
                                        <Card.Body>
                                            <div className="d-flex flex-row justify-content-between align-items-center">
                                                <Form.Check>
                                                    <div
                                                        className="d-flex flex-row align-items-center gap-4"
                                                        onClick={() =>
                                                            handlePaymentOption(
                                                                "khalti"
                                                            )
                                                        }
                                                    >
                                                        <div className="">
                                                            <Form.Check.Input
                                                                type="checkbox"
                                                                id="khalti"
                                                                onClick={() =>
                                                                    handlePaymentOption(
                                                                        "khalti"
                                                                    )
                                                                }
                                                                checked={handlePaymentChecked(
                                                                    "khalti"
                                                                )}
                                                                readOnly
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
                                                <div
                                                    className="khalti-logo"
                                                    onClick={() =>
                                                        handlePaymentOption(
                                                            "khalti"
                                                        )
                                                    }
                                                >
                                                    <img
                                                        src="https://raw.githubusercontent.com/khalti/khalti-sdk-web/master/src/assets/icons/khalti.png"
                                                        alt="logo here"
                                                        width={150}
                                                    />
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>

                                    <Card
                                        className="mt-3"
                                        onClick={() =>
                                            handlePaymentOption("esewa")
                                        }
                                    >
                                        <Card.Body>
                                            <div className="d-flex flex-row justify-content-between align-items-center">
                                                <Form.Check>
                                                    <div
                                                        className="d-flex flex-row align-items-center gap-4"
                                                        onClick={() =>
                                                            handlePaymentOption(
                                                                "esewa"
                                                            )
                                                        }
                                                    >
                                                        <div className="">
                                                            <Form.Check.Input
                                                                type="checkbox"
                                                                id="esewa"
                                                                onClick={() =>
                                                                    handlePaymentOption(
                                                                        "esewa"
                                                                    )
                                                                }
                                                                checked={handlePaymentChecked(
                                                                    "esewa"
                                                                )}
                                                                readOnly
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
                                                <div
                                                    className="esewa-logo"
                                                    onClick={() =>
                                                        handlePaymentOption(
                                                            "esewa"
                                                        )
                                                    }
                                                >
                                                    <img
                                                        src="https://blog.esewa.com.np/wp-content/uploads/2022/03/eSewa-logo.png"
                                                        alt="logo here"
                                                        width={130}
                                                    />
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>

                                    <Card
                                        className="mt-3"
                                        onClick={() =>
                                            handlePaymentOption("ips")
                                        }
                                    >
                                        <Card.Body>
                                            <div className="d-flex flex-row justify-content-between align-items-center">
                                                <Form.Check>
                                                    <div className="d-flex flex-row align-items-center gap-4">
                                                        <div className="">
                                                            <Form.Check.Input
                                                                type="checkbox"
                                                                id="ips"
                                                                onClick={() =>
                                                                    handlePaymentOption(
                                                                        "ips"
                                                                    )
                                                                }
                                                                checked={handlePaymentChecked(
                                                                    "ips"
                                                                )}
                                                                readOnly
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
                                                <div
                                                    className="ips-logo"
                                                    onClick={() =>
                                                        handlePaymentOption(
                                                            "ips"
                                                        )
                                                    }
                                                >
                                                    <img
                                                        src="https://raw.githubusercontent.com/khalti/khalti-sdk-web/master/src/assets/icons/connectips.png"
                                                        alt="logo here"
                                                        width={150}
                                                    />
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>

                                    <Card
                                        className="mt-3"
                                        onClick={() =>
                                            handlePaymentOption("cod")
                                        }
                                    >
                                        <Card.Body>
                                            <div className="d-flex flex-row justify-content-between align-items-center">
                                                <Form.Check>
                                                    <div className="d-flex flex-row align-items-center gap-4">
                                                        <div className="">
                                                            <Form.Check.Input
                                                                type="checkbox"
                                                                id="cod"
                                                                onClick={() =>
                                                                    handlePaymentOption(
                                                                        "cod"
                                                                    )
                                                                }
                                                                checked={handlePaymentChecked(
                                                                    "cod"
                                                                )}
                                                                readOnly
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
                                                <div
                                                    className="ips-logo mx-4"
                                                    onClick={() =>
                                                        handlePaymentOption(
                                                            "cod"
                                                        )
                                                    }
                                                >
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

                        <div className="mt-5 mb-5 mx-2">
                            <Link to="/billing">
                                <Button
                                    variant="outline"
                                    className="text-dark-green back-button"
                                >
                                    <div className="d-flex flex-row justify-content-center align-items-center">
                                        <BiArrowBack size={25} />
                                        <h4>&nbsp; Back</h4>
                                    </div>
                                </Button>
                            </Link>
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
