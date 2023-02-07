import Item from "../../../assets/5.webp";
import "./Card.scss";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { addToCart } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function ProductCard({
    id,
    status,
    stock,
    img,
    name,
    price,
    discountedPrice,
    warranty,
    ...props
}) {
    const dispatch = useDispatch();
    // const token = useSelector((state) => state.auth.accessToken)

    return (
        <Card className="product-card">
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
                <span className="wrapper">
                    <img
                        src={Item}
                        className="card-img-top enable-rounded p-2"
                        alt=""
                    />
                </span>
            </span>
            <Button
                className="shop-icon"
                onClick={() => {
                    if (stock != 0) {
                        if (discountedPrice) {
                            var rate = discountedPrice;
                            dispatch(
                                addToCart({ id, name, img, rate, stock })
                            );
                        } else {
                            var rate = price;
                            dispatch(
                                addToCart({ id, name, img, rate, stock })
                            );
                        }
                    } else {
                        toast.warning("Item not available in stock");
                    }
                }}
            >
                <MdAddShoppingCart />
            </Button>
            {warranty && (
                <span className={`warranty`}>{warranty} Warranty</span>
            )}
            {status && <span className={`status ${status}`}>{status}</span>}
            <Card.Body className="card-body">
                <div className="description cover">
                    <Link to="/detail">
                        <Card.Title className="card-title text-dark">
                            {name}
                        </Card.Title>
                    </Link>
                    {discountedPrice && (
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
                    {!discountedPrice && (
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
