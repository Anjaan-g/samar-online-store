import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDeleteAddressMutation } from "../../store/addressSlice";
import { toast } from "react-toastify";

const DeleteAddressModal = ({ data, ...props }) => {
    const [deleteAddress, response] = useDeleteAddressMutation();
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="delete-address-modal"
            centered
        >
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light">
                <p className="lead">
                    Confirming the following action will remove this address
                    permanently. Are you sure you want to delete this address?
                </p>
            </Modal.Body>
            <Modal.Footer className="justify-content-between bg-light">
                <Button
                    onClick={props.onHide}
                    id="closeButton"
                    variant="danger"
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        if (data.default) {
                            const notify = () => {
                                toast.error(
                                    "Can't delete default address, select a different default and then try again",
                                    {
                                        position: toast.POSITION.TOP_RIGHT,
                                        className: "toast-message",
                                    }
                                );
                            };
                            notify();
                        } else {
                            try {
                                const response = deleteAddress(
                                    data && data.id
                                );
                                const notify = () => {
                                    toast.success(
                                        "Successfully deleted selected address",
                                        {
                                            position: toast.POSITION.TOP_RIGHT,
                                            className: "toast-message",
                                        }
                                    );
                                };
                                notify();
                            } catch (errror) {
                                const notify = () => {
                                    toast.error("Sorry some error occurred.", {
                                        position: toast.POSITION.TOP_RIGHT,
                                        className: "toast-message",
                                    });
                                };
                                notify();
                            }
                        }
                        document.getElementById("closeButton").click();
                    }}
                    variant="success"
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteAddressModal;
