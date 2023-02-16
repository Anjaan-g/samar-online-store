import { Navbar } from "../Navbar/navbar";
import { Footer } from "../Footer/Footer";
import { useState } from "react";
import "./layout.scss";

export const Layout = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(false);
    return (
        <div className="layout d-flex flex-column ">
            <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
            <main className="d-flex justify-content-around flex-grow-1 flex-shrink-0 ">
                {children}
            </main>
            <Footer />
        </div>
    );
};

// export default Layout;
