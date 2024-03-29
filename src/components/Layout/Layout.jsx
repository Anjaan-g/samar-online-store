import { Navbar } from "../Navbar/navbar";
import { AdminNav } from "../Navbar/adminNav";
import { AdminFooter } from "../Footer/adminFooter";
import { AdminSidebar } from "../Sidebar/adminSidebar";
import { Footer } from "../Footer/Footer";
import { useState } from "react";
import "./layout.scss";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "../../ErrorBoundary";

export const Layout = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(false);
    return (
        <div className="layout d-flex flex-column ">
            <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
            <main className="d-flex justify-content-around flex-grow-1 user-layout">
                <ErrorBoundary fallback="There was an error">
                    <Outlet />
                </ErrorBoundary>
            </main>
            <Footer />
        </div>
    );
};

export const AdminLayout = () => {
    return (
        <div>
            <AdminNav />
            <div className="layout d-flex  bg-dark">
                <AdminSidebar />
                <main className="d-flex flex-column justify-content-start admin-layout w-100">
                    <ErrorBoundary fallback="Some error occured!">
                        <Outlet />
                    </ErrorBoundary>
                </main>
            </div>
            <AdminFooter />
        </div>
    );
};
