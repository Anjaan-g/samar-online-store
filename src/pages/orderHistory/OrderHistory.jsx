import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination";

const OrderHistory = () => {
    return (
        <Container>
            <h3 className="display-5">Order History</h3>
            <Pagination count={10} showFirstButton showLastButton />
        </Container>
    );
};

export default OrderHistory;
