import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProductCard from "../../components/Card/ProductCard";
import { Search } from "../../components/Search/search";
import CarouselContainer from "../../components/Carousel/Carousel";
import "./home.scss";
import products from "../../utils/products";
import Container from "react-bootstrap/Container"

export default function Home() {
    return (
        <div className="home">
            <CarouselContainer />

            <Container >
                <div className="d-flex d-sm-flex flex-row justify-content-around">
                    <div className="col-xxl-3 col-xl-3 col-lg-3 sidebar card mt-4 d-none d-lg-flex">
                        <div className="card-body">
                            <h3 className="card-header text-dark display-6">
                                Filters
                            </h3>
                            <Sidebar />
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="d-flex flex-column flex-wrap">
                            <div className="mt-4 ">
                                <Search />
                            </div>
                            <div className="products">
                                <div className="d-flex flex-wrap justify-content-center align-items-center gap-2  mt-4">
                                    {products.map((item) => {
                                        return (
                                            <ProductCard
                                                key={item.id}
                                                id={item.id}
                                                name={item.name}
                                                stock={item.stock}
                                                status={item.status}
                                                price={item.price}
                                                discountedPrice={
                                                    item.discountedPrice
                                                }
                                                warranty={item.warranty}
                                                img={item.img}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
