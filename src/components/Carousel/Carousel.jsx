import "./Carousel.scss";
import Carousel from "react-bootstrap/Carousel";

export default function CarouselContainer({ carouselItems }) {
    return (
        <Carousel data-bs-ride="carousel" className=" w-100">
            {carouselItems?.map((item) => {
                return (
                    <Carousel.Item data-bs-interval="5000" key={item.id}>
                        <img
                            src={item.image}
                            alt={item.name}
                            className="d-block w-100 carousel-image"
                        />
                    </Carousel.Item>
                );
            })}
            {/* <Carousel.Item data-bs-interval="5000">
                <img
                    src="../../../assets/collection.jpg"
                    alt="..."
                    className="d-block w-100 carousel-image"
                />
                <Carousel.Caption className="d-none d-md-block start-0">
                    <h1 className=" text-royal-blue ">Vast Inventory</h1>
                    <p className="text-white display-6">Different Gadgets</p>
                    <p className="text-white display-6">Same Place</p>
                    <p className="text-white display-6">All Online</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item data-bs-interval="5000">
                <img
                    src="../../../assets/earpods.jpg"
                    alt="..."
                    className="d-block w-100 carousel-image"
                />
                <Carousel.Caption className="d-none d-md-block start-0">
                    <h1 className=" text-royal-blue">
                        Various Payment Options
                    </h1>
                    <p className="text-white display-6">Pay with wallets</p>
                    <p className="text-white display-6">
                        Pay with mobile banking
                    </p>
                    <p className="text-white display-6">Cash on Delivery.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item data-bs-interval="5000">
                <img
                    src="../../../assets/headphones.jpg"
                    alt="..."
                    className="d-block w-100 carousel-image"
                />
                <Carousel.Caption className="d-none d-md-block start-0 ">
                    <h1 className=" text-royal-blue text-left">
                        Fast Delivery
                    </h1>
                    <p className="text-white display-6 text-left">Order</p>
                    <p className="text-white display-6 text-left">Pay</p>
                    <p className="text-white display-6 text-left">Receive</p>
                </Carousel.Caption>
            </Carousel.Item> */}
        </Carousel>
    );
}
