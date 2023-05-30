import React from "react";
import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";
export const AdminFooter = () => {
    return (
        <footer className="bg-dark text-white py-4">
            <div className="container">
                <div className="footer-area">
                    <div className="row">
                        <div className="col-lg-6 col-md-8">
                            <div className="footer-box about-widget">
                                <h2 className="widget-title">About us</h2>
                                <p className="text-white">
                                    We are online/offline electronics gadgets
                                    seller. We have all latest technologies
                                    available in the market.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-8">
                            <div className="footer-box get-in-touch">
                                <h2 className="widget-title">Get in Touch</h2>
                                <ul>
                                    <li>Kathmandu, Nepal</li>
                                    <li>support@samarmart.com</li>
                                    <li>+977 984 700 4480</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="copyright">
                    <div className="d-flex flex-wrap justify-content-between border-top pt-3">
                        <div className="">
                            <p className="text-white">
                                Copyrights &copy; 2022 &nbsp;
                                <a
                                    href="https://samarmart.com/ "
                                    // target="_blank"
                                >
                                    Samar Mart
                                </a>
                                , All Rights Reserved.
                                <br />
                            </p>
                        </div>
                        <div className="">
                            <ul className="social">
                                <li>
                                    <a href="#" target="_blank">
                                        <FaFacebook />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" target="_blank">
                                        <FaInstagram />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" target="_blank">
                                        <FaTwitter />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" target="_blank">
                                        <FaLinkedin />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
