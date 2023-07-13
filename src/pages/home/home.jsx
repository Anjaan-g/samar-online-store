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
                <title>
                    Samar Mart | Where trust meets quality | Authentic gadgets
                    at your fingertips
                </title>
                <link rel="canonical" href="http://samarsuppliers.com" />
                <meta
                    name="description"
                    content="Explore a wide range of authentic gadgets and tech products at Samar Mart. Shop from the comfort of your home and experience
                    the convenience of online shopping. Get the latest gadgets delivered to your doorstep with secure and reliable shiping. Browse now!"
                />
                <meta
                    name="keywords"
                    content="butwal online, online store, buy online, earphones, headphones,"
                />
            </Helmet>

            <Container className="w-100">
                <div className="d-flex d-sm-flex flex-row justify-content-around">
                    {/* <div className="col-xxl-3 col-xl-3 col-lg-3 sidebar card mt-4 d-none d-lg-flex bg-light">
                        <div className="card-body">
                            <h3 className="card-header text-dark display-6">
                                Filters
                            </h3>
                            <Sidebar productData setProductData />
                        </div>
                    </div> */}
                    <div className="container-fluid">
                        <div className="d-flex flex-column home-content w-100">
                            <div className="mt-4 w-100">
                                <div className="search d-flex justify-content-start align-items-center">
                                    <AiOutlineSearch className="searchIcon" />
                                    <input
                                        value={searchTerm}
                                        type="text"
                                        placeholder="Looking for anything specific?"
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
                            <CarouselContainer carouselItems={banners}/>
                            <div className="products ">
                                <div className="d-flex flex-wrap justify-content-center align-items-center w-100 gap-2">
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
