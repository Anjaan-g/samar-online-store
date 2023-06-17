import React, { useEffect, useState } from "react";
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
import { useDebounce } from "use-debounce";
import { AiOutlineSearch } from "react-icons/ai";
import { MdCancel } from "react-icons/md";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterItems, setFilterItems] = useState([]);
    const { data = [], isLoading, isError } = useGetAllProductsQuery();
    const products = data.data;

    if (isLoading) {
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
        <div className="home">
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    Samar Supplier | Home | Surround your life with authentic
                    gadgets
                </title>
                <link rel="canonical" href="http://samarsuppliers.com/home" />
                <meta
                    name="description"
                    content="Samar supplier is your one and only place to get authentic gadgets and accessories for your smart phone or computers. Online store in Butwal."
                />
            </Helmet>

            <Container className="w-100">
                <CarouselContainer />
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
                                <div className="search d-flex justify-content-center align-items-center">
                                    <AiOutlineSearch className="searchIcon" />
                                    <input
                                        value={searchTerm}
                                        type="text"
                                        placeholder="Searching for..."
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
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
                            <div className="products">
                                <div className="d-flex flex-wrap justify-content-start align-items-center gap-2  mt-4">
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
