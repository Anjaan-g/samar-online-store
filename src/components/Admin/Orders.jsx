import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { useOrderHistoryQuery } from "../../store/historySlice";
import "./Admin.scss";

export const Orders = () => {
    const { data = [], isError, isLoading } = useOrderHistoryQuery();
    console.log(data);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="d-flex flex-column align-items-start m-3 text-white order-table">
            <div className="d-flex justify-content-between align-items-center mb-3 text-white">
                <h5 className="d-flex">Orders</h5>
            </div>

            <Card className="bg-dark w-100">
                <Table
                    responsive="lg"
                    hover
                    className="text-center"
                    variant="dark"
                >
                    <thead>
                        <tr className="align-middle start-left">
                            <th>SN</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total Items</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => {
                            return (
                                <tr key={index} className="align-middle">
                                    <td>#{index + 1}</td>
                                    <td>
                                        <div className="customer-data d-flex justify-content-center align-items-center">
                                            <div className="avatar-place">
                                                {item.user?.first_name
                                                    ?.split(" ")
                                                    .map((name) => name[0])
                                                    .join("")
                                                    .toUpperCase()}
                                                {item.user?.last_name
                                                    ?.split(" ")
                                                    .map((name) => name[0])
                                                    .join("")
                                                    .toUpperCase()}
                                            </div>
                                            <div className="customer-details d-flex flex-column align-items-start ps-2">
                                                <div className="">
                                                    {item.user?.first_name}{" "}
                                                    {item.user?.last_name}
                                                </div>
                                                <div className="">
                                                    {item.user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.timestamp}</td>
                                    <td>{item.total_items}</td>
                                    <td>Nrs. {item.total_price}</td>
                                    <td>
                                        <Badge
                                            bg={`${
                                                item.delivery_status ===
                                                "SUCCESS"
                                                    ? "success"
                                                    : item.delivery_status ===
                                                      "PENDING"
                                                    ? "orange"
                                                    : "secondary"
                                            }`}
                                        >
                                            {item.delivery_status}
                                        </Badge>
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
