import React, { useState, useEffect } from "react";
import "./productDetail.scss";
import { MdAddShoppingCart } from "react-icons/md";
import {
    AiOutlineCheckCircle,
    AiOutlineExclamationCircle,
} from "react-icons/ai";
import { BsShieldFillCheck, BsTruck, BsShieldSlashFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Container from "react-bootstrap/Container";
import { useGetProductQuery } from "../../store/productSlice";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";

const ProductDetail = () => {
    const params = useParams();
    const id = params.id;

    const {
        data: { message, data: product } = [],
        isLoading,
        error,
    } = useGetProductQuery({ id });

    const navigateTo = useNavigate();

    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState("firstTab");

    const handleFirstTab = () => {
        setActiveTab("firstTab");
    };
    const handleSecondTab = () => {
        setActiveTab("secondTab");
    };
    // const highlights = product.highlights;

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        );
    } else if (!product?.name) {
        return (
            <div className="d-flex justify-content-center align-items-center mt-4">
                <h4>Product with provided id doesn't exist</h4>
            </div>
        );
    }

    return (
        <Container>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`Samar Mart | ${product?.name} Details`}</title>
                <link
                    rel="canonical"
                    href={`http://samarsuppliers.com/detail/${product?.name}`}
                />
                {product ? (
                    <meta
                        name="description"
                        content={`Samar Mart provides you with authentic ${product?.name} for your daily usage. Buy ${product?.name} in Butwal, Online. `}
                    />
                ) : (
                    <meta
                        name="description"
                        content="Buy electronic gadgets online. Home delivery to your door steps."
                    />
                )}
            </Helmet>
            <div className="d-flex flex-column justify-content-between ">
                <div className="product-detail d-flex flex-wrap">
                    <Col lg={6} md={12} sm={12} className=" pt-4 pe-2">
                        <ImageViewer images={product.product_images} />
                    </Col>
                    <Col lg={6} md={12} sm={12} className=" pt-4 pe-2">
                        <Card className="product-description bg-light">
                            <Card.Body>
                                <div className="d-flex flex-column justify-content-between">
                                    <Col className="d-flex flex-column">
                                        {product.status && (
                                            <Row className="d-flex flex-row ps-3">
                                                <span
                                                    className={`status ${product.status}`}
                                                >
                                                    {product?.status}
                                                </span>
                                            </Row>
                                        )}
                                        {/* {product.status && (
                                            <span
                                                className={`status ${product.status}`}
                                            >
                                                {product.status}
                                            </span>
                                        )} */}
                                        <Row className="">
                                            <h3 className="">
                                                {product?.name}
                                            </h3>
                                        </Row>
                                        <Row className="">
                                            {product.discounted_price !=
                                                product.sell_price && (
                                                <>
                                                    <span className="discount del">
                                                        NRS.
                                                        {product?.sell_price}
                                                    </span>
                                                    <p className="discounted-price ">
                                                        NRS.
                                                        {
                                                            product?.discounted_price
                                                        }
                                                        &nbsp;
                                                    </p>
                                                </>
                                            )}
                                            {product?.discounted_price ==
                                                product.sell_price && (
                                                <p className="">
                                                    NRS.{product?.sell_price}
                                                </p>
                                            )}
                                        </Row>
                                        <Row className="">
                                            {product?.stock && (
                                                <strong className="">
                                                    {product.stock} in Stock
                                                </strong>
                                            )}
                                        </Row>
                                        <Row className="">
                                            {product?.vendor !== "-" && (
                                                <i>From: {product.vendor}</i>
                                            )}
                                        </Row>
                                        &nbsp;
                                        <div className="d-flex flex-column">
                                            <pre className="display-7">{`${product?.highlights}`}</pre>
                                        </div>
                                    </Col>
                                    <div className="d-flex flex-column">
                                        <hr />
                                        <div className="d-flex flex-row justify-content-between align-items-center d-grid gap-2">
                                            <Button
                                                variant="warning"
                                                size="lg"
                                                className="col-6"
                                                type="submit"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    dispatch(
                                                        addToCart({
                                                            id,
                                                            name,
                                                            img,
                                                            rate,
                                                            stock,
                                                        })
                                                    );
                                                }}
                                            >
                                                <MdAddShoppingCart /> Add to
                                                Cart
                                            </Button>
                                            <Button
                                                variant="success"
                                                size="lg"
                                                className="col-6"
                                                type="submit"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    dispatch(
                                                        addToCart({
                                                            id,
                                                            name,
                                                            img,
                                                            rate,
                                                            stock,
                                                        })
                                                    );
                                                    navigateTo("/cart");
                                                }}
                                            >
                                                Buy Now
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </div>
                {/* <br /> */}
                <Row className="mt-5 pt-5 product-status">
                    <hr />
                    <div className="features d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <Col
                            lg={3}
                            sm={12}
                            md={12}
                            className="d-flex flex-column align-items-center justify-content-center  pe-2 ps-2"
                        >
                            {product.brand !== "-" ? (
                                <>
                                    <div className="icon d-flex justify-content-center align-items-center mb-2 mt-2 bg-gray">
                                        <AiOutlineCheckCircle
                                            size="40px"
                                            color="green"
                                        />
                                    </div>
                                    <h4 className="tagline mb-2 mt-2">
                                        Authentic{" "}
                                    </h4>
                                    <p className="text text-center mx-3">
                                        Original product of {product.brand}.
                                        Comes with all authentic parts as
                                        advertised.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="icon d-flex justify-content-center align-items-center mb-2 mt-2 bg-gray">
                                        <AiOutlineExclamationCircle
                                            size="40px"
                                            color="yellow"
                                        />
                                    </div>
                                    <h4 className="tagline mb-2 mt-2">
                                        Copy Version
                                    </h4>
                                    <p className="text text-center mx-3">
                                        First Copy product. Similar to the
                                        authentic but may not be reliable as
                                        the authentic ones.
                                    </p>
                                </>
                            )}
                        </Col>

                        <Col
                            lg={3}
                            sm={12}
                            md={12}
                            className="d-flex flex-column align-items-center  pe-2 ps-2"
                        >
                            <div className="icon d-flex justify-content-center align-items-center mb-2 mt-2">
                                <BsTruck size="40px" color="purple" />
                            </div>
                            <h4 className="tagline mb-2 mt-2">
                                Max 7 Day Delivery
                            </h4>
                            <p className="text text-center mx-3">
                                Item can be delivered within 7 days of the
                                order placement.
                            </p>
                        </Col>

                        <Col
                            lg={3}
                            md={12}
                            sm={12}
                            className="d-flex flex-column align-items-center  pe-2 ps-2"
                        >
                            {product.warranty !== "-" ? (
                                <>
                                    <div className="icon d-flex justify-content-center align-items-center mb-2 mt-2">
                                        <BsShieldFillCheck
                                            size="40px"
                                            color="green"
                                        />
                                    </div>
                                    <h4 className="tagline mb-2 mt-2">
                                        {product.warranty} Warranty
                                    </h4>
                                    <p className="text text-center mx-3">
                                        All damages covered. Not applicable to
                                        physical damage.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="icon d-flex align-items-center mb-2 mt-2">
                                        <BsShieldSlashFill
                                            size="40px"
                                            color="red"
                                        />
                                    </div>
                                    <h4 className="tagline mb-2 mt-2">
                                        No Warranty
                                    </h4>
                                    <p className="text text-center mx-3">
                                        Item not eligible for warranty.
                                    </p>
                                </>
                            )}
                        </Col>
                    </div>
                    <hr />
                </Row>
                <div className="description-tabs d-flex justify-content-center">
                    <Col className="tabs card mb-3 bg-light">
                        <ul className="nav card-header">
                            <li
                                className={`tab mb-0 ${
                                    activeTab === "firstTab" ? "active" : ""
                                }`}
                                onClick={handleFirstTab}
                            >
                                <button className="btn btn-none">
                                    Description
                                </button>
                            </li>
                            <li
                                className={`tab mx-2 mb-0 ${
                                    activeTab === "secondTab" ? "active" : ""
                                }`}
                                onClick={handleSecondTab}
                            >
                                <button className="btn">Reviews</button>
                            </li>
                        </ul>

                        <div className="outlet">
                            <div className="container">
                                {activeTab == "firstTab" ? (
                                    <Description
                                        description={product.description}
                                    />
                                ) : (
                                    <Reviews />
                                )}
                            </div>
                        </div>
                    </Col>
                </div>
            </div>
        </Container>
    );
};

function Description({ description }) {
    return (
        <div className="mt-2 mb-3">
            <pre>{description}</pre>
        </div>
    );
}

function Reviews({}) {
    return (
        <div className="desc-final">
            <h4>Reviews</h4>
        </div>
    );
}

function ImageViewer({ images }) {
    const [selectedImage, setSelectedImage] = useState(
        `${import.meta.env.VITE_MEDIA_BASE_URL}${images[0]}`
    );
    return (
        <Card className="bg-light">
            <Card.Body>
                <Card className="full-image">
                    <Image
                        src={selectedImage}
                        alt="product image"
                        rounded
                        fluid
                        className="product-image"
                        height={550}
                    />
                    <span></span>
                </Card>
                <Card className="px-2 py-2 mt-2">
                    <div className="d-flex flex-row justify-content-start align-items-center image-carousel gap-1">
                        {images.map((item, index) => {
                            return (
                                <Card
                                    key={index}
                                    className={`image-selector d-flex align-items-center ${
                                        selectedImage ===
                                            `${
                                                import.meta.env
                                                    .VITE_MEDIA_BASE_URL
                                            }${item}` && "selected-image"
                                    }`}
                                    onClick={() =>
                                        setSelectedImage(
                                            `${
                                                import.meta.env
                                                    .VITE_MEDIA_BASE_URL
                                            }${item}`
                                        )
                                    }
                                    bg={`${
                                        selectedImage ===
                                        `${
                                            import.meta.env.VITE_MEDIA_BASE_URL
                                        }${item}`
                                            ? "dark-green"
                                            : "info"
                                    }`}
                                >
                                    <Image
                                        className="align-items-center"
                                        src={`${
                                            import.meta.env.VITE_MEDIA_BASE_URL
                                        }${item}`}
                                        alt="image"
                                        fluid
                                        rounded
                                    />
                                </Card>
                            );
                        })}
                    </div>
                </Card>
            </Card.Body>
        </Card>
    );
}

export default ProductDetail;
