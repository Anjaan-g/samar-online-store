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
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Container from "react-bootstrap/Container";
import { useGetProductQuery } from "../../store/productSlice";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";

const ProductDetail = () => {
    const params = useParams();
    const id = params.id;
    console.log(id);

    const {
        data: { message, data: product } = [],
        isLoading,
        error,
    } = useGetProductQuery({ id });
    console.log(message)
    console.log(product, isLoading, error);

    const navigateTo = useNavigate();

    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState("firstTab");

    const handleFirstTab = () => {
        setActiveTab("firstTab");
    };
    const handleSecondTab = () => {
        setActiveTab("secondTab");
    };
    const highlights = `PRODUCT DETAILS : \n\nModel: M512\nCharging type: Fast Charging, 22.5W, PD, QC 3.0\nColour: Black\nBattery: Lithium Polymer\nMaterial: ABS Fire-Proof VO level\nCapacity: 50000 mAh\nWorking Temp: -10c to 40c\nInput/Output:\nMicro IN : DC 5V/2A 9V/2A 12V/1.5A\nTypeC IN : DC 5V/2A 9V/2A 12V/1.5A\nLightning IN: DC 5V/2A 9V/2A 12V/1.5A\nUSB1 OUT : 5v/3A\nUSB2 OUT: 4.5v/5A, 5v/4.5A, 9v/2A, 12v/1.5A\nUSB3 OUT: 5v/3A\nPD OUT (Type c ) : 5v/3A, 9v/2A, 12v/1.5A\nFast Charging: Yes\nPD Charging: Yes\nLED Light: Yes\nDigital Display: Yes\nSupporting Device: All Smartphones\nWarranty: Yes, 1 Year\n`;

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        );
    } else if (!product.name) {
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
                <title>{`Samar Supplier | ${product?.name} Details`}</title>
                <link
                    rel="canonical"
                    href="http://samarsuppliers.com/detail"
                />
                {product ? (
                    <meta
                        name="description"
                        content={`Samar supplier provides you with authentic ${product.name} for your daily usage. Buy ${product.name} in Butwal, Online. `}
                    />
                ) : (
                    <meta
                        name="description"
                        content="Buy electronic gadgets online. Home delivery to your door steps."
                    />
                )}
            </Helmet>
            {/* <h4 className="display-4">oduct Details</h4> */}
            <div className="product-detail d-flex flex-wrap justify-content-between">
                <Col
                    lg={6}
                    md={12}
                    sm={12}
                    className="product-image pt-5 pe-2"
                >
                    <ImageViewer images={product.product_images} />
                </Col>
                <Col
                    lg={6}
                    md={12}
                    sm={12}
                    className="product-description pt-5 ps-3"
                >
                    <Card>
                        <Card.Body>
                            {product?.status && (
                                <div className="d-flex flex-row">
                                    <span
                                        className={`status ${product?.status}`}
                                    >
                                        {product?.status}
                                    </span>
                                </div>
                            )}
                            <div className="d-flex flex-row">
                                <h3 className="">{product?.name}</h3>
                            </div>
                            <div className="d-flex flex-row ">
                                {product.discounted_price !=
                                    product.sell_price && (
                                    <>
                                        <span className="discount del">
                                            NRS.{product?.sell_price}
                                        </span>
                                        <p className="discounted-price ">
                                            NRS.{product?.discounted_price}
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
                            </div>
                            <div className="d-flex flex-row">
                                {product?.stock && (
                                    <strong className="">
                                        {product.stock} in Stock
                                    </strong>
                                )}
                            </div>
                            <div className="d-flex flex-row">
                                {product?.vendor !== "-" && (
                                    <i>From: {product.vendor}</i>
                                )}
                            </div>
                            &nbsp;
                            <div className="d-flex flex-column">
                                {/* <h5 className="text-under">Highlights</h5> */}
                                <pre className="display-7">{highlights}</pre>
                            </div>
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
                                    <MdAddShoppingCart /> Add to Cart
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
                        </Card.Body>
                    </Card>
                </Col>
            </div>
            <div className="description mt-4 pt-5">
                <hr />
                <div className="features d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div className="col-lg-3 col-sm-12 col-md-10 d-flex flex-column align-items-center justify-content-center">
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
                                    Original product of {product.brand}. Comes
                                    with all authentic parts as advertised.
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
                                    authentic but may not be reliable as the
                                    authentic ones.
                                </p>
                            </>
                        )}
                    </div>

                    <div className="col-lg-3 col-sm-12 col-md-10 d-flex flex-column align-items-center justify-content-center">
                        <div className="icon d-flex justify-content-center align-items-center mb-2 mt-2">
                            <BsTruck size="40px" color="purple" />
                        </div>
                        <h4 className="tagline mb-2 mt-2">
                            Max 7 Day Delivery
                        </h4>
                        <p className="text text-center mx-3">
                            Item can be delivered within 7 days of the order
                            placement.
                        </p>
                    </div>

                    <div className="col-lg-3 col-sm-12 col-md-10 d-flex flex-column align-items-center justify-content-center">
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
                                <div className="icon d-flex justify-content-center align-items-center mb-2 mt-2">
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
                    </div>
                </div>
                <hr />
            </div>
            <div className="description-tabs d-flex justify-content-center">
                <div className="tabs card col-lg-12 col-sm-12 col-md-10">
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

                    {/* <div className="outlet">
                        <div className="container">
                            {activeTab == "firstTab" ? (
                                <Description
                                    description={product["description"]}
                                />
                            ) : (
                                <Reviews />
                            )}
                        </div>
                    </div> */}
                </div>
            </div>
        </Container>
    );
};

function Description({ description }) {
    // console.log(Array.isArray(description));
    console.log(description);
    return (
        <div className="mt-2 mb-2">
            {description.map((item) => {
                // {console.log(item, key)}
                return (
                    <div className="" key={item.title}>
                        <h4>{item.title}</h4>
                        {item.data?.map((item) => {
                            return (
                                <li key={item} className="mb-2">
                                    {item}
                                </li>
                            );
                        })}
                        <br />
                    </div>
                );
            })}
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

function ColorSelector({ colors }) {
    return (
        <div className="d-flex flex-row justify-content-between">
            <div className="colors">
                <h4>Colors</h4>
            </div>
            <div className="color-data d-flex flex-row justify-content-end align-items-center gap-2">
                {colors?.map((item) => {
                    return (
                        <div
                            className={`form-check color-selector ${item}`}
                            key={item}
                        >
                            <input
                                className={`form-check-input ${item}`}
                                id={item}
                                type="checkbox"
                                value={item}
                                name={item}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={item}
                            ></label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function ImageViewer({ images }) {
    const [selectedImage, setSelectedImage] = useState(
        `${import.meta.env.VITE_MEDIA_BASE_URL}/${images[0]}`
    );
    return (
        <Card>
            <Card.Body>
                <Card>
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
                    <div className="d-flex flex-row justify-content-start align-items-center">
                        {images.map((item, index) => {
                            return (
                                <div className="" key={index}>
                                    <Card
                                        className={`ms-2 image-selector ${
                                            selectedImage ===
                                                `${
                                                    import.meta.env
                                                        .VITE_MEDIA_BASE_URL
                                                }/${item}` && "selected-image"
                                        }`}
                                        onClick={() =>
                                            setSelectedImage(
                                                `${
                                                    import.meta.env
                                                        .VITE_MEDIA_BASE_URL
                                                }/${item}`
                                            )
                                        }
                                        bg={`${
                                            selectedImage ===
                                            `${
                                                import.meta.env
                                                    .VITE_MEDIA_BASE_URL
                                            }/${item}`
                                                ? "dark-green"
                                                : "info"
                                        }`}
                                    >
                                        <Image
                                            src={`${
                                                import.meta.env
                                                    .VITE_MEDIA_BASE_URL
                                            }/${item}`}
                                            alt="image"
                                            height={60}
                                            width={60}
                                            rounded
                                        />
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </Card.Body>
        </Card>
    );
}

export default ProductDetail;
