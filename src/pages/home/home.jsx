import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProductCard from "../../components/Card/ProductCard";
import CarouselContainer from "../../components/Carousel/Carousel";
import "./home.scss";
import Container from "react-bootstrap/Container";
import { Helmet } from "react-helmet";
import { useGetAllProductsQuery } from "../../store/productSlice";
import Spinner from "react-bootstrap/Spinner";
import { AiOutlineSearch } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { useGetBannersQuery } from "../../store/bannersSlice";
export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterItems, setFilterItems] = useState([]);
    const { data = [], isLoading, isError } = useGetAllProductsQuery();
    const products = data.data;

    const {
        data: bannersData = [],
        isLoadingBanners,
        isErrorBanners,
    } = useGetBannersQuery();
    const banners = bannersData.data;

    const [productData, setProductData] = useState("");

    if (isLoading) {
        return (
            <div className="d-flex align-items-center justify-content-center">
                <Spinner />
            </div>
        );
    }
    if (isLoadingBanners) {
        return (
            <div className="d-flex align-items-center justify-content-center">
                <Spinner />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="d-flex align-items-center justify-content-center">
                <p>Error...</p>
            </div>
        );
    }

    return (
        <div className="home mb-3">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Samar Mart | Where trust meets quality</title>
                <link rel="canonical" href="http://samarsuppliers.com/home" />
                <meta
                    name="description"
                    content="Shop with confidence at Samar Mart, knowing that each purchase you make is an investment in authentic, 
                        high-performance tech devices. Join our community of satisfied customers and explore the world of genuine 
                        gadgets that will elevate your digital experience."
                />
            </Helmet>

            <Container className="w-100">
                <CarouselContainer carouselItems={banners} />
                <div className="d-flex d-sm-flex flex-row justify-content-around">
                    <div className="col-xxl-3 col-xl-3 col-lg-3 sidebar card mt-4 d-none d-lg-flex bg-light">
                        <div className="card-body">
                            <h3 className="card-header text-dark display-6">
                                Filters
                            </h3>
                            <Sidebar productData setProductData/>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="d-flex flex-column flex-wrap">
                            <div className="mt-4 ">
                                <div className="search d-flex justify-content-center align-items-center bg-light ">
                                    <AiOutlineSearch className="searchIcon" />
                                    <input
                                        value={searchTerm}
                                        type="text"
                                        placeholder="Search for..."
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="bg-light"
                                    />
                                    <span className="d-inline">
                                        {searchTerm && (
                                            <button
                                                type="button"
                                                className="btn"
                                                onClick={() =>
                                                    setSearchTerm("")
                                                }
                                            >
                                                <MdCancel size={20} />
                                            </button>
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className="products ">
                                <div className="d-flex flex-wrap justify-content-start align-items-center gap-3  mt-4">
                                    {products
                                        .filter((product) => {
                                            if (searchTerm === "") {
                                                return product;
                                            } else if (
                                                product.name
                                                    .toLowerCase()
                                                    .includes(
                                                        searchTerm.toLowerCase()
                                                    ) ||
                                                product.brand
                                                    .toLowerCase()
                                                    .includes(
                                                        searchTerm.toLowerCase()
                                                    ) ||
                                                product.category
                                                    .toLowerCase()
                                                    .includes(
                                                        searchTerm.toLowerCase()
                                                    )
                                            ) {
                                                return product;
                                            }
                                        })
                                        ?.map((item) => {
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
                                                    img={item.image}
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
