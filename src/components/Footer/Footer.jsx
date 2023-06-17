import "./footer.scss";

import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";
export const Footer = () => {
    return (
        <footer className="py-5 bg-dark-green text-white">
            <div className="container">
                <div className="footer-area">
                    <div className="row">
                        <div className="col-lg-6 col-md-8 pe-3">
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
                                    <li>Butwal, Nepal</li>
                                    <li>shop@samarmart.com</li>
                                    <li>+977 984-9287007</li>
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
                                <b className="text-accent">Samar Mart</b>
                                , All Rights Reserved.
                                <br />
                            </p>
                        </div>
                        <div className="">
                            <ul className="social">
                                <li>
                                    <a
                                        href="#"
                                        target="_blank"
                                        className="text-accent"
                                    >
                                        <FaFacebook />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        target="_blank"
                                        className="text-accent"
                                    >
                                        <FaInstagram />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        target="_blank"
                                        className="text-accent"
                                    >
                                        <FaTwitter />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        target="_blank"
                                        className="text-accent"
                                    >
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
