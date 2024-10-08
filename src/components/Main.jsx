import "../index.css";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";
import CartItem from "./CartItem";
import Cart from "./Cart";

function Main() {
    const [cart, setCart] = useState([]);
    function addToCart(data) {
        let found = 0;
        for (let item of cart) {
            if (item.id == data.id) {
                let newCart = cart.filter((elt) => elt.id != item.id);
                setCart([...newCart, { ...item, count: item.count + 1 }]);
                found = 1;
                break;
            }
        }
        if (!found) setCart([...cart, { ...data, count: 1 }]);
    }
    const [cartVisibility, setCartVisibility] = useState(false);

    function showCart() {
        let main = document.getElementById("main");
        main.style.pointerEvents = "none";
        main.style.filter = "brightness(0.6)";
        setCartVisibility((prevState) => !prevState);
    }

    function hideCart() {
        let main = document.getElementById("main");
        let cart = document.getElementById("cart");
        main.style.pointerEvents = "auto";
        main.style.filter = "none";
        cart.style.transform = "translateX(110%)";
        setTimeout(() => {
            setCartVisibility((prevState) => !prevState);
        }, 1000);
    }

    function handleBodyClick(e) {
        if (cartVisibility) {
            if (e.target.id == "wrapper") {
                hideCart();
            }
        }
    }

    function toggleCartVisibility() {
        if (cartVisibility) hideCart();
        else showCart();
    }

    function changeCount(id, count) {
        for (let item of cart) {
            if (item.id == id) {
                let index = cart.indexOf(item);
                cart[index] = { ...item, count: count };
                setCart([...cart]);
            }
        }
    }

    function deleteCartItem(id) {
        for (let item of cart) {
            if (item.id == id) {
                let newCart = cart.filter((elt) => elt.id != item.id);
                if (newCart.length == 0) {
                    toggleCartVisibility();
                }
                setCart([...newCart]);
            }
        }
    }

    return (
        <>
            <div id="wrapper" onClick={handleBodyClick}>
                <div id="main">
                    <Navbar
                        cart={cart}
                        cartVisibility={cartVisibility}
                        toggleCartVisibility={toggleCartVisibility}
                    />
                    <Outlet
                        context={[
                            addToCart,
                            toggleCartVisibility,
                            cartVisibility,
                        ]}
                    />
                    <Footer />
                </div>
            </div>
            {cartVisibility ? (
                <Cart
                    toggleCartVisibility={toggleCartVisibility}
                    cart={cart}
                    cartVisibility={cartVisibility}
                    changeCount={changeCount}
                    deleteCartItem={deleteCartItem}
                />
            ) : null}
        </>
    );
}

export default Main;
