import "../index.css";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";

function Main() {
    const [cart, setCart] = useState([]);
    function addToCart(data) {
        setCart([...cart, data]);
    }
    return (
        <div id="main">
            <Navbar cart={cart} />
            <Outlet context={addToCart} />
            <Footer />
        </div>
    );
}

export default Main;
