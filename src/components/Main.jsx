import "../index.css";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";
import CartItem from "./CartItem";

function Main() {
    const [cart, setCart] = useState([]);
    function addToCart(data) {
        setCart([...cart, data]);
    }
    const [cartVisibility, setCartVisibility] = useState(false);
    function toggleCartVisibility() {
        document.getElementById("main").style.pointerEvents = "none";
        if (document.getElementById("main").style.filter == "blur(2px)")
            document.getElementById("main").style.filter = "none";
        else document.getElementById("main").style.filter = "blur(2px)";
        setCartVisibility((prevState) => !prevState);
    }

    function handleCartVisibility(e) {
        document.getElementById("main").style.pointerEvents = "auto";

        if (cartVisibility) {
            document.getElementById("main").style.filter = "none";
            setCartVisibility(false);
        }
    }

    const listCartItems = cart.map((elt) => (
        <CartItem key={elt.id} itemInfo={elt} />
    ));
    return (
        <>
            <div id="main" onClick={handleCartVisibility}>
                <Navbar
                    cart={cart}
                    cartVisibility={cartVisibility}
                    toggleCartVisibility={toggleCartVisibility}
                />
                <Outlet
                    context={[addToCart, toggleCartVisibility, cartVisibility]}
                />
                <Footer />
            </div>
            {cartVisibility ? (
                <div id="cart">
                    <button onClick={toggleCartVisibility}> close</button>
                    {listCartItems}
                </div>
            ) : null}
        </>
    );
}

export default Main;
