import { Navbar } from "../Navbar/navbar";
import { Footer } from "../Footer/Footer";
import { useState } from "react";

export const Layout = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(false);
    return (
        <div className="layout">
            <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

// export default Layout;
