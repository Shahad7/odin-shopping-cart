import "../index.css";
import Icon from "@mdi/react";
import { mdiCloseThick } from "@mdi/js";
import CartItem from "./CartItem";

function Cart({ toggleCartVisibility, cart, changeCount, deleteCartItem }) {
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
