import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";

const Checkout = ({ totalQuantity, totalPrice, discount, setDiscount }) => {
    const deliveryCharge = totalPrice >= 5000 ? 0 : 100;
    return (
        <Col>
            <Card>
                <Card.Header className="pt-4">
                    <h4>Order Summary</h4>
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

                        <div className="d-flex justify-content-between">
                            <p className="text-left">Delivery Charge </p>

                            <h6>Rs. {deliveryCharge}</h6>
                        </div>
                    </div>
                    <hr />
                    <div className="total d-flex justify-content-between">
                        <p>Total</p>
                        <div className="d-flex flex-column">
                            <h6 className="text-end">
                                {totalPrice - discount + deliveryCharge}
                            </h6>
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
                                <Button variant="success">Apply</Button>
                            </InputGroup.Text>
                        </InputGroup>
                    </div>
                    <hr />
                    <div className="checkout d-flex justify-content-center align-items-center">
                        <LinkContainer to="/login">
                            <Button
                                variant="success"
                                className="btn btn-dark-green btn-lg w-full"
                            >
                                Proceed to checkout
                            </Button>
                        </LinkContainer>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Checkout;
