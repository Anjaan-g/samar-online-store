import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

export const Orders = () => {
    return (
        <div className="d-flex flex-column w-100 align-items-center m-3 text-white">
            <div className="d-flex justify-content-between align-items-center w-100 mb-3 text-white">
                <h5 className="d-flex">Orders</h5>
            </div>
        </div>
    );
};
