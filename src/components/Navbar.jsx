import "../index.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar({ cart, toggleCartVisibility, cartVisibility }) {
    let length = 0;
    function cartLength() {
        for (let item of cart) {
            length += item.count;
        }
    }
    cartLength();
    return (
        <>
            <nav id="navbar">
                <Link
                    to={cartVisibility ? "#" : "/"}
                    style={{ marginRight: "10px" }}
                >
                    Home
                </Link>
                <Link
                    to={cartVisibility ? "#" : "shop"}
                    style={{ marginRight: "10px" }}
                >
                    Shop
                </Link>
                <button
                    onClick={toggleCartVisibility}
                    style={{ position: "absolute", right: 100 }}
                >
                    cart
                </button>
                <span>cart: {length}</span>
            </nav>
        </>
    );
}

export default Navbar;
