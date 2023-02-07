import "./sidebar.scss";
import {
    BsPhoneFill,
    BsCameraFill,
    BsHeadphones,
    BsPower,
} from "react-icons/bs";
import { MdDevicesOther } from "react-icons/md";
import Form from "react-bootstrap/Form";

export default function Sidebar() {
    return (
        <>
            <Form>
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
                                <MdDevicesOther />{" "}
                                <a href="#">Other Equipment</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card mx-2 my-2">
                    <div className="card-body">
                        <h4 className="card-heading text-dark">Brands</h4>
                    </div>
                    <div className="brands-list">
                        <ul className="brands">
                            <li className="brand-names">
                                <a href="#">Samsung</a>
                            </li>
                            <br />
                            <li className="brand-names">
                                <a href="#">Redmi</a>
                            </li>
                            <br />
                            <li className="brand-names">
                                <a href="#">My Power</a>
                            </li>
                            <br />
                            <li className="brand-names">
                                <a href="#">Apple</a>
                            </li>
                            <br />
                            <li className="brand-names">
                                <a href="#">Huwaei</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Form>
        </>
    );
}
