import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { FiCheckCircle, FiCircle, FiPlus } from "react-icons/fi";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Checkout from "./summary";
import { useDispatch, useSelector } from "react-redux";
import "./checkout.scss";
import {
    selectAddress,
    removeAddress,
} from "../../store/deliveryAddressSlice";
import AddAddressModal from "../../components/Modals/AddAddressModal";

import { Helmet } from "react-helmet";
import { useGetAddressQuery } from "../../store/addressSlice";
import {
    useGetCartItemsQuery,
    useUpdateCartMutation,
} from "../../store/userCartSlice";

const Billing = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const [discount, setDiscount] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const { data: addressData = [], error, loading } = useGetAddressQuery();

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
            totalPrice += item.price * item.qty;
        });
        return totalPrice;
    };

    return (
        <Container>
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                Samar Mart | Where Trust Meets Quality | Billing | Add or use existing address
                </title>
                <link
                    rel="canonical"
                    href="http://samarsuppliers.com/billing"
                />
                <meta
                    name="description"
                    content="Easily find and buy gadgets with discounted price from the ease of your home. "
                />
            </Helmet>
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

            <div className="d-flex flex-row justify-content-between mt-5 flex-wrap">
                <Col lg={8} md={12} sm={12} xs={12} className="pe-2">
                    {addressData?.map((item) => {
                        return (
                            <Card
                                className="mt-2 w-100 me-1 pe-1 bg-light"
                                key={item?.id}
                            >
                                <Card.Body>
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-column">
                                            <div className="d-flex align-items-center">
                                                <h5>{item?.contact_person}</h5>
                                                <span className="d-inline text-dark">
                                                    ( {item?.tag} )
                                                </span>
                                                {item?.default && (
                                                    <span className="d-inline text-white bg-dark-green rounded">
                                                        Default
                                                    </span>
                                                )}
                                            </div>
                                            <i className="text-highlight fs-6">
                                                {item?.address}
                                            </i>
                                            <p>{item?.phone_no}</p>
                                        </div>
                                        <div className="d-flex flex-column justify-content-end align-items-center">
                                            <Button
                                                variant="success"
                                                className="btn"
                                                onClick={() => {
                                                    dispatch(
                                                        selectAddress({
                                                            id: item.id,
                                                            name: item.contact_person,
                                                            address:
                                                                item.address,
                                                            contact:
                                                                item.phone_no,
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
                        );
                        <div className="d-flex justify-content-between align-items-center mt-5">
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
                            
                        </div>;
                    })}

                    <div className="mt-5 mb-5 mx-2 d-flex justify-content-between align-items-center">
                        <Link to="/cart">
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
                        <div className="add-new">
                                <Button
                                    variant="secondary"
                                    onClick={() => setShowModal(true)}
                                >
                                    <FiPlus size={25} /> Add new Address
                                </Button>
                            </div>
                            <AddAddressModal
                                show={showModal}
                                onHide={() => setShowModal(false)}
                            />
                    </div>
                </Col>
                <Col lg={4} md={12} sm={12} xs={12} className="ps-2 mt-2">
                    <Checkout
                        totalPrice={totalPrice()}
                        totalQuantity={totalQuantity()}
                        deliveryCharge={0}
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
