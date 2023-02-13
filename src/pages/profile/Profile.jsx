import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

const Profile = () => {
    return (
        <Container>
            <h4 className="display-5">Profile</h4>
            <div className="d-flex flex-row justify-content-between mt-5 flex-wrap">
                <Col lg={2} sm={2} xs={2}>
                    <Card>
                        <Card.Header>Manage Profile</Card.Header>
                        <Card.Body>
                            <div className="profile mt-2 mb-4">
                                <h5>Profile</h5>
                                <p className="ps-3">Account</p>
                                <p className="ps-3">Address Book</p>
                            </div>
                            <div className="orders mt-2 mb-4">
                                <h5>Orders</h5>
                                <p className="ps-3">History</p>
                                <p className="ps-3">Returns</p>
                            </div>
                            <div className="profile mt-2 mb-4">
                                <h5>Reviews</h5>
                            </div>
                            <div className="profile mt-2 mb-4">
                                <h5>Wishlist</h5>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </div>
        </Container>
    );
};

export default Profile;
