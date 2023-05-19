// import Item from "../../../assets/5.webp";
import "./Card.scss";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

export default function ProductCard({
    id,
    status,
    stock,
    img,
    name,
    price,
    brand,
    discountedPrice,
    warranty,
    ...props
}) {
    const dispatch = useDispatch();
    const image = `${import.meta.env.VITE_MEDIA_BASE_URL}${img}`;
    /* ? This Eroor is due to the path difference from the backend, fix'll hvae to be done from backend */

    return (
        <Card className="product-card" key={id}>
            {stock && (
                <span
                    className={`stock ${
                        stock == 0 ? "out" : stock <= 5 ? "low" : null
                    }`}
                >
                    {stock == 0
                        ? "Out of Stock"
                        : stock <= 5
                        ? `${stock} in stock`
                        : null}
                </span>
            )}
            <span className="box">
                <span className="wrapper d-flex align-items-center justify-content-center">
                    <img
                        height={285}
                        src={image}
                        className="card-img-top rounded p-2"
                        alt={name}
                        rounded
                    />
                </span>
            </span>
            <Button
                className="shop-icon"
                onClick={() => {
                    if (stock != 0) {
                        if (discountedPrice) {
                            var price = discountedPrice;
                            dispatch(
                                addToCart({
                                    product_id: id,
                                    product_name: name,
                                    image,
                                    price,
                                    stock,
                                })
                            );
                        } else {
                            dispatch(
                                addToCart({
                                    product_id: id,
                                    name,
                                    image,
                                    price,
                                    stock,
                                })
                            );
                        }
                    } else {
                        toast.warning("Item not available in stock");
                    }
                }}
            >
                <MdAddShoppingCart />
            </Button>
            {warranty !== "-" && (
                <span className={`warranty`}>{warranty}</span>
            )}
            {status && <span className={`status ${status}`}>{status}</span>}
            <Card.Body>
                <div className="d-flex flex-column flex-wrap">
                    <Link to={`/detail/${id}`}>
                        <h6 className="text-dark pe-4"> {name} </h6>
                    </Link>
                    {discountedPrice != price && (
                        <div>
                            <span className="discount">NRS.{price}</span>
                            <div className="d-flex flex-row align-items-center ">
                                <p className="discounted-price">
                                    NRS.{discountedPrice} &nbsp;
                                </p>
                                <p className="save-text ">
                                    (Save{" "}
                                    {(
                                        ((price - discountedPrice) / price) *
                                        100
                                    ).toFixed(1)}
                                    %)
                                </p>
                            </div>
                        </div>
                    )}
                    {discountedPrice == price && (
                        <>
                            <p className="gx-3">NRS.{price}</p>
                            <br />
                        </>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}
