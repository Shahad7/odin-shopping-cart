import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Icon from "@mdi/react";
import { mdiCartOutline } from "@mdi/js";
import { mdiShoppingOutline } from "@mdi/js";
import { mdiFireCircle } from "@mdi/js";

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
                <Link id="home" to={cartVisibility ? "#" : "/"}>
                    <Icon className="mdi-icon" path={mdiFireCircle} size={2} />{" "}
                    GAME STORE
                </Link>
                <div className="navbar-items">
                    <div id="shop-button">
                        <Link id="shop-link" to={cartVisibility ? "#" : "shop"}>
                            <Icon
                                className="mdi-icon"
                                path={mdiShoppingOutline}
                                size={1.4}
                            />
                            Shop
                        </Link>
                    </div>
                    <div id="cart-button" onClick={toggleCartVisibility}>
                        <div id="cart-icon-container">
                            <span id="cart-items-count">{length}</span>
                            <Icon
                                className="mdi-icon"
                                id="cart-icon"
                                path={mdiCartOutline}
                                size={1.4}
                            />
                        </div>
                        <span>Cart</span>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
