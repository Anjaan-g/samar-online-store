import Item from "../../../assets/5.webp";
import "./Card.scss";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { addToCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";

export default function ProductCard({
    id,
    status,
    stock,
    img,
    name,
    price,
    discountedPrice,
    warranty,
    // image,
    ...props
}) {
    const dispatch = useDispatch();

    return (
        <div className="card product-card">
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
            <button
                className="shop-icon"
                onClick={() => {
                    if (discountedPrice) {
                        var rate = discountedPrice;
                        dispatch(addToCart({ id, name, img, rate }));
                    } else {
                        var rate = price;
                        dispatch(addToCart({ id, name, img, rate }));
                    }
                }}
            >
                <MdAddShoppingCart />
            </button>
            {warranty && (
                <span className={`warranty`}>{warranty} Warranty</span>
            )}
            {status && <span className={`status ${status}`}>{status}</span>}
            <div className="card-body">
                <div className="description cover">
                    <Link to="/detail">
                        <h5 className="card-title text-dark">{name}</h5>
                    </Link>
                    <div className="d-flex flex-row lead">
                        {discountedPrice && (
                            <>
                                <span className="discount">NRS.{price}</span>
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
                            </>
                        )}
                        {!discountedPrice && <p>NRS.{price}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
