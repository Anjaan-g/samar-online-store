import "./Carousel.scss";

export default function CarouselContainer() {
    return (
        <div className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="5000">
                    <img
                        src="../../../assets/collection.jpg"
                        alt="..."
                        className="d-block w-100 carousel-image"
                    />
                    <div className="carousel-caption d-none d-md-block start-0">
                        <h1 className=" text-royal-blue ">Vast Inventory</h1>
                        <p className="text-white display-6">
                            Different Gadgets
                        </p>
                        <p className="text-white display-6">Same Place</p>
                        <p className="text-white display-6">All Online</p>
                    </div>
                </div>
                <div className="carousel-item " data-bs-interval="5000">
                    <img
                        src="../../../assets/earpods.jpg"
                        alt="..."
                        className="d-block w-100 carousel-image"
                    />
                    <div className="carousel-caption d-none d-md-block start-0">
                        <h1 className=" text-royal-blue">
                            Various Payment Options
                        </h1>
                        <p className="text-white display-6">
                            Pay with wallets
                        </p>
                        <p className="text-white display-6">
                            Pay with mobile banking
                        </p>
                        <p className="text-white display-6">
                            Cash on Delivery.
                        </p>
                    </div>
                </div>
                <div className="carousel-item " data-bs-interval="5000">
                    <img
                        src="../../../assets/headphones.jpg"
                        alt="..."
                        className="d-block w-100 carousel-image"
                    />
                    <div className="carousel-caption d-none d-md-block start-0 ">
                        <h1 className=" text-royal-blue text-left">
                            Fast Delivery
                        </h1>
                        <p className="text-white display-6 text-left">Order</p>
                        <p className="text-white display-6 text-left">Pay</p>
                        <p className="text-white display-6 text-left">
                            Receive
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
