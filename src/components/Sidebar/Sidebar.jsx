import "./sidebar.scss";
import {
    BsPhoneFill,
    BsCameraFill,
    BsHeadphones,
    BsPower,
} from "react-icons/bs";
import { MdDevicesOther } from "react-icons/md";
import Form from "react-bootstrap/Form";
import { useGetAllCategoriesQuery } from "../../store/categoriesSlice";
import { useGetAllBrandsQuery } from "../../store/brandsSlice";
import { useState } from "react";

export default function Sidebar() {
    const {
        data: categories = [],
        isLoading: isLoadingCategories,
        isError: isErrorCat,
        error: errorCat,
    } = useGetAllCategoriesQuery();

    const {
        data: brands = [],
        isLoading: isLoadingBrands,
        isError: isErrorBrands,
        error: errorBrands,
    } = useGetAllBrandsQuery();

    const [checkedValues, setCheckedValues] = useState([]);

    const handleSubmit = ({categories, brands}) => {

    }

    return (
        <>
            <Form onSubmit={() => handleSubmit}>
                <div className="card mx-2 my-2">
                    <div className="card-body">
                        <h4 className="card-heading  text-dark ">
                            Categories
                        </h4>
                    </div>
                    <div className="category-menu-list">
                        <ul className="categories">
                            <li className="subcategory">
                                <BsPhoneFill />{" "}
                                <a href="#">Phone &amp; Tablets</a>
                            </li>
                            <br />
                            <li className="subcategory">
                                <BsCameraFill />{" "}
                                <a href="#">Camera &amp; Photos</a>
                            </li>
                            <br />
                            <li className="subcategory">
                                <BsHeadphones /> <a href="#">Accessories</a>
                            </li>
                            <br />
                            <li className="subcategory">
                                <BsPower /> <a href="#">PowerBanks</a>
                            </li>
                            <br />
                            <li className="subcategory">
                                <MdDevicesOther />
                                <a href="#">Other Equipment</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card mx-2 my-2">
                    <div className="card-body">
                        <h4 className="card-heading text-dark">Brands</h4>
                    </div>
                    <div className="brands-list ps-2">
                        {/* <ul className="brands"> */}
                        {brands?.map((item) => {
                            return (
                                <>
                                    <Form.Check
                                        type={"checkbox"}
                                        id={`${item.name}-checkbox`}
                                        label={`${item.name}`}
                                        // onChange={() => onChange}
                                    />

                                    <br />
                                </>
                            );
                        })}
                        {/* </ul> */}
                    </div>
                </div>
            </Form>
        </>
    );
}
