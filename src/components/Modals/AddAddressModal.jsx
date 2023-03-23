import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { useAddAddressMutation } from "../../store/addressSlice";
import { toast } from "react-toastify";

const AddAddressModal = (props) => {
    const [values, setValues] = useState({
        contactPerson: "",
        address: "",
        phoneNo: "",
        tag: "",
        default: false,
    });

    const onChange = (e) => {
        if (e.target.name == "default") {
            setValues({ ...values, [e.target.name]: e.target.checked });
        } else {
            setValues({ ...values, [e.target.name]: e.target.value });
        }
    };

    const [addAddress, { isLoading }] = useAddAddressMutation();

    async function handleSubmit(event) {
        event.preventDefault();
        const contactPerson = values["contactPerson"];
        const address = values["address"];
        const phoneNo = values["phoneNo"];
        const tag = values["tag"];
        const isdefault = values["default"];

        try {
            const response = await addAddress({
                contactPerson,
                address,
                phoneNo,
                tag,
                isdefault,
            });
            console.log(response)
            const notify = () => {
                toast.success(response.data["message"], {
                    position: toast.POSITION.TOP_RIGHT,
                    className: "toast-message",
                });
            };
            notify();
            document.getElementById("closeButton").click();
        } catch (error) {
            toast.error(response.data["message"], {
                position: toast.POSITION.TOP_RIGHT,
                className: "toast-message",
            });
            notify();
            document.getElementById("closeButton").click();
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="add-address-modal"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="add-new-address">Add New Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group
                        as={Row}
                        controlId="contactPerson"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Contact Person</h6>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="contactPerson"
                                htmlFor="contactPerson"
                                value={values["contactPerson"]}
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="address"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Address</h6>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="address"
                                value={values["address"]}
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="phoneNo"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Phone</h6>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="phoneNo"
                                type="number"
                                pattern={`^(00|\+)[1-9]{1}([0-9][\s]*){9,16}$`}
                                value={values["phoneNo"]}
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="tag"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Tag</h6>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="tag"
                                value={values["tag"]}
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        controlId="default"
                        className="mb-2 align-items-center"
                    >
                        <Form.Label column sm="4">
                            <h6>Set Default</h6>
                        </Form.Label>
                        <Col sm="1">
                            <Form.Check
                                name="default"
                                type="checkbox"
                                value={values["default"]}
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
                <Button
                    onClick={props.onHide}
                    id="closeButton"
                    variant="danger"
                >
                    Close
                </Button>
                <Button onClick={handleSubmit} variant="success">
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddAddressModal;
