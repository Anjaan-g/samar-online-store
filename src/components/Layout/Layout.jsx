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
            <ErrorBoundary fallback="There was an error">
                <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
                <main className="d-flex justify-content-around flex-grow-1 user-layout">
                    <Outlet />
                </main>
                <Footer />
            </ErrorBoundary>
        </div>
    );
};

export const AdminLayout = () => {
    return (
        <div className="layout d-flex flex-column bg-secondary">
            <ErrorBoundary fallback="Some error occured!">
                <AdminNav />
                <main className="d-flex justify-content-start admin-layout">
                    <AdminSidebar />
                    <Outlet />
                </main>
                <AdminFooter />
            </ErrorBoundary>
        </div>
    );
};
