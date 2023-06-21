import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";

const Checkout = ({
    totalPrice,
    totalQuantity,
    deliveryCharge,
    discount,
    setDiscount,
    page,
}) => {

    return (
        <Col>
            <Card className="bg-light mb-4">
                <Card.Header className="pt-4">
                    <div className="d-flex justify-content-between align-items center">
                        <h4>Order Summary</h4>
                        {page === "payment" ? (
                            <Link to="/cart">
                                <FiEdit3 size={25} color="green" />
                            </Link>
                        ) : (
                            <></>
                        )}
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-between">
                            <p className="text-left">Sub Total </p>

                            <h6>Rs. {totalPrice}</h6>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="text-left">Total Items </p>

                            <h6>{totalQuantity}</h6>
                        </div>

                        <div className="d-flex justify-content-between">
                            {discount != 0 && (
                                <>
                                    <p className="text-left">Discount </p>

                                    <h6>Rs. {discount}</h6>
                                </>
                            )}
                        </div>

                        {totalQuantity > 0 && (
                            <div className="d-flex justify-content-between">
                                <p className="text-left">Delivery Charge </p>

                                <h6>Rs. {deliveryCharge}</h6>
                            </div>
                        )}
                    </div>
                    <hr />
                    <div className="total d-flex justify-content-between">
                        <p>Total</p>
                        <div className="d-flex flex-column">
                            {totalQuantity > 0 ? (
                                <h6 className="text-end">
                                    {totalPrice - discount + deliveryCharge}
                                </h6>
                            ) : (
                                <h6 className="text-end">
                                    {totalPrice - discount}
                                </h6>
                            )}
                            <span
                                style={{
                                    display: "inline-block",
                                    color: "gray",
                                }}
                            >
                                ( Inclusive of VAT )
                            </span>
                        </div>
                    </div>
                    {page === "cart" ? (
                        <>
                            <hr />
                            <div className="discount mt-3">
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="discount"
                                        aria-label="Discount"
                                        as="input"
                                        className="text-uppercase"
                                    />
                                    <InputGroup.Text>
                                        <Button variant="success">
                                            Apply
                                        </Button>
                                    </InputGroup.Text>
                                </InputGroup>
                            </div>
                            <hr />
                            <div className="checkout d-flex justify-content-center align-items-center">
                                <LinkContainer to="/billing">
                                    <Button
                                        variant="success"
                                        className="btn btn-dark-green btn-lg w-full"
                                        disabled={totalQuantity == 0}
                                    >
                                        Proceed to checkout
                                    </Button>
                                </LinkContainer>
                            </div>
                        </>
                    ) : (
                        <div />
                    )}
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Checkout;
