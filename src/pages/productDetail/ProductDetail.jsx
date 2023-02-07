import React, { useState, useEffect } from "react";
import CarouselContainer from "../../components/Carousel/Carousel";
import "./productDetail.scss";
import { MdAddShoppingCart } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsShieldFillCheck, BsTruck } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const product = {
    id: "1",
    name: "Smart Watch",
    stock: 6,
    status: "hot",
    price: 5000,
    discountedPrice: 4000,
    warranty: "6 months",
    img: "Item",
    quality: "100% Original",
    colors: ["red", "black", "green"],
    description: [
        {
            title: "Specifications",
            data: [
                "2000 mAH Battery",
                "Water Proof",
                "Light weight",
                "Carbon Fibre",
            ],
        },
        {
            title: "Quality",
            data: ["100% authentic", "Direct from the Company"],
        },
    ],
};

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(0);
    const navigateTo = useNavigate();

    function increaseQuantity(event) {
        event.preventDefault();
        if (quantity == product.stock) {
            return;
        } else {
            setQuantity(quantity + 1);
        }
    }
    function decreaseQuantity(event) {
        event.preventDefault();
        if (quantity <= 0) {
            return;
        } else {
            setQuantity(quantity - 1);
        }
    }

    useEffect(() => {
        return () => {
            setQuantity(quantity);
        };
    }, []);

    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState("firstTab");

    const handleFirstTab = () => {
        setActiveTab("firstTab");
    };
    const handleSecondTab = () => {
        setActiveTab("secondTab");
    };

    return (
        <div className="container">
            {/* <h4 className="display-4">Product Details</h4> */}
            <div className="product-detail d-flex flex-wrap justify-content-center gap-5 ">
                <div className="col-xl-5 col-lg-5 col-md-10 col-sm-12 product-image pt-5 d-flex flex-column">
                    <div className="card">
                        <CarouselContainer />
                    </div>
                </div>
                <Form className="col-xl-5 col-lg-5 col-md-10 col-sm-12 product-desc d-flex flex-column pt-5">
                    {product.status && (
                        <div className="d-flex flex-row">
                            <span className={`status ${product.status}`}>
                                {product.status}
                            </span>
                        </div>
                    )}
                    <div className="d-flex flex-row">
                        <h5 className="">{product.name}</h5>
                    </div>
                    <div className="d-flex flex-row ">
                        {product.discountedPrice && (
                            <>
                                <span className="discount del">
                                    NRS.{product.price}
                                </span>
                                <p className="discounted-price ">
                                    NRS.{product.discountedPrice} &nbsp;
                                </p>
                            </>
                        )}
                        {!product.discountedPrice && (
                            <p className="">NRS.{product.price}</p>
                        )}
                    </div>
                    <hr />
                    <div className="quantity-tab d-flex flex-row justify-content-between">
                        <div>
                            <h5>Quantity</h5>
                        </div>
                        <div className="card">
                            <div className="d-flex flex-row w-100">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="decrease-quantity"
                                    onClick={(e) => decreaseQuantity(e)}
                                >
                                    -
                                </Button>
                                <div className="vr"></div>
                                &nbsp; &nbsp;
                                {quantity}
                                &nbsp; &nbsp;
                                <div className="vr"></div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="increase-quantity"
                                    onClick={(e) => increaseQuantity(e)}
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-row-reverse">
                        <span className="stock-data text-dark">
                            {product.stock} in stock
                        </span>
                    </div>
                    <ColorSelector colors={product.colors} />
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
                                    addToCart({ id, name, img, rate, stock })
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
                                    addToCart({ id, name, img, rate, stock })
                                );
                                navigateTo("/cart");
                            }}
                        >
                            Buy Now
                        </Button>
                    </div>
                </Form>
            </div>
            <div className="description mt-4 pt-5">
                <hr />
                <div className="features d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div className="col-lg-3 col-sm-12 col-md-10 d-flex flex-column align-items-center justify-content-center">
                        <div className="icon d-flex justify-content-center align-items-center mb-2 mt-2 bg-gray">
                            <AiOutlineCheckCircle size="40px" color="green" />
                        </div>
                        <h4 className="tagline mb-2 mt-2">100% Orginal</h4>
                        <p className="text text-center mx-3">
                            Authentic piece directly from the company
                        </p>
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
                        <div className="icon d-flex justify-content-center align-items-center mb-2 mt-2">
                            <BsShieldFillCheck size="40px" color="green" />
                        </div>
                        <h4 className="tagline mb-2 mt-2">
                            {product.warranty} Warranty
                        </h4>
                        <p className="text text-center mx-3">
                            All damages covered. Not applicable to physical
                            damage.
                        </p>
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

                    <div className="outlet">
                        <div className="container">
                            {activeTab == "firstTab" ? (
                                <Description
                                    description={product["description"]}
                                />
                            ) : (
                                <Reviews />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Description({ description }) {
    // console.log(Array.isArray(description));
    // console.log(description);
    return (
        <div className="mt-2 mb-2">
            {description.map((item) => {
                // {console.log(item, key)}
                return (
                    <div className="" key={item.title}>
                        <h4>{item.title}</h4>
                        {item.data.map((item) => {
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
                {colors.map((item) => {
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

export default ProductDetail;
