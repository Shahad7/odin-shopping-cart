import "../index.css";
import Icon from "@mdi/react";
import { mdiCloseThick } from "@mdi/js";
import CartItem from "./CartItem";
import { useEffect } from "react";

function Cart({
    toggleCartVisibility,
    cart,
    changeCount,
    deleteCartItem,
    cartVisibility,
}) {
    const listCartItems = cart.map((elt) => (
        <CartItem
            key={elt.id}
            itemInfo={elt}
            changeCount={changeCount}
            deleteCartItem={deleteCartItem}
        />
    ));
    let subtotal = 0;
    function calculateSubtotal() {
        for (let item of cart) {
            subtotal += item.price * item.count;
        }
    }
    calculateSubtotal();

    function transitCart() {
        let cart = document.getElementById("cart");
        if (cart) {
            setTimeout(() => {
                cart.style.transform = "translate(0%)";
            }, 0);
        }
    }

    useEffect(() => {
        transitCart();
        let emptyMSG = document.getElementById("empty-msg");
        if (cart.length == 0) emptyMSG.style.display = "block";
        else emptyMSG.style.display = "none";
    }, []);
    return (
        <div id="cart">
            <Icon
                className={"close-cart-btn"}
                color={"lightgray"}
                onClick={() => {
                    toggleCartVisibility();
                }}
                path={mdiCloseThick}
                size={1}
            />
            <div id="empty-msg">No items have been added to your cart</div>
            <div id="cart-list">{listCartItems}</div>
            <div id="checkout">
                <div id="subtotal">
                    <p>Subtotal:</p>
                    <p>{"$" + subtotal.toFixed(2)}</p>
                </div>
                <button id="checkout-btn">Checkout</button>
            </div>
        </div>
    );
}

export default Cart;
