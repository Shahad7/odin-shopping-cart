import "../index.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import CartItem from "./CartItem";

function Navbar({ cart }) {
    const [cartVisibility, setCartVisibility] = useState(false);
    function toggleCartVisibility() {
        setCartVisibility(!cartVisibility);
    }

    const listCartItems = cart.map((elt) => (
        <CartItem key={elt.id} itemInfo={elt} />
    ));
    return (
        <>
            <nav id="navbar">
                <Link to="/" style={{ marginRight: "10px" }}>
                    Home
                </Link>
                <Link to="shop" style={{ marginRight: "10px" }}>
                    Shop
                </Link>
                <button
                    onClick={toggleCartVisibility}
                    style={{ position: "absolute", right: 100 }}
                >
                    cart
                </button>
                <span>cart: {cart.length}</span>
            </nav>
            {cartVisibility ? (
                <div id="cart">
                    <button onClick={toggleCartVisibility}> close</button>
                    {listCartItems}
                </div>
            ) : null}
        </>
    );
}

export default Navbar;
