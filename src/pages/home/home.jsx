import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProductCard from "../../components/Card/ProductCard";
import { Search } from "../../components/Search/search";
import CarouselContainer from "../../components/Carousel/Carousel";
import "./home.scss";
import Container from "react-bootstrap/Container";
import { Helmet } from "react-helmet";
import { useGetAllProductsQuery } from "../../store/productSlice";
import Spinner from "react-bootstrap/Spinner";

export default function Home() {
    const { data: products, isLoading, isError } = useGetAllProductsQuery();
    if (isLoading) {
        return (
            <div className="d-flex align-items-center justify-content-center">
                <Spinner />
            </div>
        );
    }

    if (isError) {
        return(
            <div className="d-flex align-items-center justify-content-center">
                <p>Error...</p>
            </div>
        )
    }
    return (
        <div className="home">
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    {" "}
                    Samar Supplier | Home | Surround your life with authentic
                    gadgets{" "}
                </title>
                <link rel="canonical" href="http://samarsuppliers.com/home" />
                <meta
                    name="description"
                    content="Samar supplier is your one and only place to get authentic gadgets and accessories for your smart phone or computers. Online store in Butwal."
                />
            </Helmet>
            <CarouselContainer />

            <Container>
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
                                <div className="d-flex flex-wrap justify-content-start align-items-center gap-2  mt-4">
                                    {products?.map((item) => {
                                        return (
                                            <ProductCard
                                                key={item.id}
                                                id={item.id}
                                                name={item.name}
                                                stock={item.stock}
                                                status={item.status}
                                                price={item.sell_price}
                                                discountedPrice={
                                                    item.discounted_price
                                                }
                                                warranty={item.warranty}
                                                img={item.images[0].image_url}
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
