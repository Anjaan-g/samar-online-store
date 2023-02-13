import React from "react";
import "./contact.scss";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";

const faqs = [
    {
        id: 1,
        question: "Sample question one?",
        answer: "Sample answer one.",
    },
    {
        id: 2,
        question: "Another question?",
        answer: "Answer to that question",
    },
];
const Contact = () => {
    function handleSubmit(e) {
        e.preventDefault();
    }
    return (
        <Container>
            {/* <div className="d-flex flex-column justify-content-center align-items-center"> */}
            <h3 className="display-5">Contact</h3>
            <div className="d-flex justify-content-between mt-4">
                <div className="col-sm-6">
                    <Card className="w-75 ">
                        <Card.Header>
                            <h4>Contact Us</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form
                                className="mt-4 mb-4 mx-4"
                                onSubmit={handleSubmit}
                            >
                                <Form.Group
                                    className="mb-3"
                                    controlId="formBasicCheckbox"
                                >
                                    <Form.Label>Full Name</Form.Label>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Your Full Name"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formBasicCheckbox"
                                >
                                    <Form.Label>Email</Form.Label>
                                    <Col>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter Your Email Address"
                                        />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with
                                            anyone else.
                                        </Form.Text>
                                    </Col>
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formBasicCheckbox"
                                    // as={Row}
                                >
                                    <Form.Label>Contact Number</Form.Label>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="The no. we can contact you with"
                                        />
                                    </Col>
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    className="btn btn-md"
                                    type="submit"
                                >
                                    Send
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-sm-6">
                    <Card>
                        <Card.Header>
                            <h4>FAQ</h4>
                        </Card.Header>
                        <Card.Body>
                            {faqs.map((item) => {
                                return (
                                    <li key={item.id}>
                                        <Accordion>
                                            <Accordion.Item eventKey={item.id}>
                                                <Accordion.Header>
                                                    {item.question}
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    {item.answer}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </li>
                                );
                            })}
                        </Card.Body>
                    </Card>
                </div>
            </div>
            {/* </div> */}
        </Container>
    );
};

export default Contact;
