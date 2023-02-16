import React from "react";
import Container from "react-bootstrap/Container";
import notfound from "../../../assets/404.png";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <Container>
            {/* <h3 className="display-5">404 Not Found</h3> */}
            <div className="d-flex flex-column justify-content-center align-items-center mt-4 mb-4">
                <img src={notfound} alt="Not Found" width={650} />
                <p className="lead-text">
                    The page you are searching for hasn't been found anywhere.
                    <Link to="/">Redirect to Home Page</Link>
                </p>
            </div>
        </Container>
    );
};

export default NotFound;
