import React from "react";
import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";
export const AdminFooter = () => {
    return (
        <footer className="bg-raisin text-white py-4">
            <div className="container">
                <div className="footer-area">
                    <div className="row">
                        <div className="col-lg-6 col-md-8">
                            <div className="footer-box about-widget">
                                <h2 className="widget-title">About us</h2>
                                <p className="text-white">
                                    Shop with confidence at Samar Mart, knowing
                                    that each purchase you make is an
                                    investment in authentic, high-performance
                                    tech devices. Join our community of
                                    satisfied customers and explore the world
                                    of genuine gadgets that will elevate your
                                    digital experience.
                                </p>
                                <p>
                                    Have questions or need assistance? Our
                                    friendly and knowledgeable customer support
                                    team is always ready to help. Contact us
                                    today and experience the Samar Mart
                                    difference.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-8">
                            <div className="footer-box get-in-touch">
                                <h2 className="widget-title">Get in Touch</h2>
                                <ul className="p-0">
                                    <li>Kathmandu, Nepal</li>
                                    <li>shop@samarmart.com</li>
                                    <li>+977 9851335363</li>
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
                            <ul className="social d-flex justify-content-center align-items-center">
                                <li>
                                    <a
                                        href="https://www.facebook.com/Samarmart01/"
                                        target="_blank"
                                        className="text-accent"
                                    >
                                        <FaFacebook size={25} />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.instagram.com/samar_mart_/"
                                        target="_blank"
                                        className="text-accent"
                                    >
                                        <FaInstagram size={25} />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://twitter.com/Samarmart01"
                                        target="_blank"
                                        className="text-accent text-decoration-none fs-4 "
                                    >
                                        𝕏
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
