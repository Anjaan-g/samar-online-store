import React from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useGetAddressQuery } from "../../store/addressSlice";
import { useGetHistoryQuery } from "../../store/historySlice";
import Spinner from "react-bootstrap/Spinner";
import { Helmet } from "react-helmet";
import confirmOrder from "../../../assets/order-confirm.svg";
import Card from "react-bootstrap/Card";
import { FiCheck, FiX, FiInfo } from "react-icons/fi";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import { toast } from "react-toastify";
import Col from "react-bootstrap/Col";

import Table from "react-bootstrap/Table";

export default function Order() {
    const params = useParams();

    const unique_id = params.unique_id;

    const {
        data: addresses = [],
        isLoading: isLoadingAddress,
        isError: isErrorAddress,
    } = useGetAddressQuery();

    const {
        data: { message, data: order } = [],
        isLoading: isLoadingOrder,
        isError: isErrorOrder,
        error: errorOrder,
    } = useGetHistoryQuery({ unique_id });
    // console.log(order);

    const selectedAddress = addresses?.find(
        (item) => item.id === order?.address
    );
    // console.log(selectedAddress);

    if (isLoadingOrder) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        );
    }
    if (isLoadingAddress) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        );
    }

    return (
        <Container>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`Samar Mart | Where Trust Meets Quality | Checkout  `}</title>
                <link rel="canonical" href="http://samarmart.com/checkout" />

                <meta
                    name="description"
                    content="Buy electronic gadgets online. Home delivery to your door steps."
                />
            </Helmet>
            <div className="d-flex flex-column justify-content-center m-3">
                <div className="d-flex justify-content-center align-items-center">
                    <h4>Thank you for your purchase!</h4>
                </div>
                <div className="d-flex justify-content-center aligh-items-center mt-3 mb-3">
                    <img
                        src={confirmOrder}
                        alt="confirm-order"
                        style={{
                            minWidth: "40%",
                            maxWidth: "50%",
                        }}
                    />
                </div>

                <div className="d-flex justify-content-top align-items-start mt-3 mb-3 flex-wrap">
                    <Col lg={8} md={12} sm={12} xs={12} className="mb-3 pe-2">
                        <Card className="bg-light">
                            <Card.Header>
                                <h4>Order Details</h4>
                            </Card.Header>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <b className="">Tracking Id:</b>
                                    <div className="d-flex justify-content-between align-items-top gap-2">
                                        <p className="text-success">
                                            {order?.unique_id}
                                        </p>
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip id="tooltip">
                                                    Copy this ID to track your
                                                    order!
                                                </Tooltip>
                                            }
                                        >
                                            <span className="d-inline-block">
                                                <FiInfo
                                                    size={20}
                                                    color="blue"
                                                />
                                            </span>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center ">
                                    <b className="dispaly-6">Order Date:</b>
                                    <p>{order.timestamp}</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <b className="dispaly-6">
                                        Delivery Status:
                                    </b>
                                    <p
                                        className={` class ${
                                            order?.delivery_status ===
                                            "SUCCESS"
                                                ? "text-success"
                                                : order?.delivery_status ===
                                                  "PENDING"
                                                ? "text-orange"
                                                : "text-danger"
                                        } `}
                                    >
                                        {order?.delivery_status}
                                    </p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center p-0 m-0">
                                    <b className="dispaly-6">Paid for:</b>
                                    <p>
                                        {order.paid ? (
                                            <FiCheck size={25} color="green" />
                                        ) : (
                                            <FiX size={25} color="red" />
                                        )}
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className="bg-light mt-3">
                            <Card.Header>
                                <h4>Order Items</h4>
                            </Card.Header>
                            <Card.Body>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Rate</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.history_items.map(
                                            (item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="w-50">
                                                            {
                                                                item?.product
                                                                    .name
                                                            }
                                                        </td>
                                                        <td>
                                                            {item?.quantity}
                                                        </td>
                                                        <td>
                                                            Rs. {item?.price}
                                                        </td>
                                                        <td>
                                                            Rs.
                                                            {item?.total_price}
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>Total</th>
                                            <th>{order?.total_items}</th>
                                            <th></th>
                                            <th>
                                                Rs. {order?.total_price}
                                                <sup>
                                                    <b className="text-orange">
                                                        *
                                                    </b>
                                                </sup>
                                            </th>
                                        </tr>
                                    </tfoot>
                                </Table>
                                <p className="text-orange ms-2">
                                    <b>*</b> All Prices are inclusive of VAT
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} md={12} xs={12} className="mb-3 pe-sm-2">
                        <Card className="bg-light">
                            <Card.Header>
                                <h4>Delivery Address</h4>
                            </Card.Header>
                            <Card.Body>
                                <div className="d-flex d-lg-block justify-content-between align-items-center">
                                    <b>Contact Person:</b>
                                    <p>{selectedAddress?.contact_person}</p>
                                </div>
                                <div className="d-flex d-lg-block justify-content-between align-items-center">
                                    <b>Contact No.:</b>
                                    <p>{selectedAddress?.phone_no}</p>
                                </div>
                                <div className="d-flex d-lg-block justify-content-between align-items-center">
                                    <b>Address:</b>
                                    <p>{selectedAddress?.address}</p>
                                </div>
                                <div className="d-flex d-lg-block justify-content-between align-items-center">
                                    <b>Tag:</b>
                                    <p>{selectedAddress?.tag}</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </div>
            </div>
        </Container>
    );
}
