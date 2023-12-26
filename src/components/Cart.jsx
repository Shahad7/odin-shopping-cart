import "../index.css";
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
            <button
                onClick={() => {
                    toggleCartVisibility();
                }}
            >
                {" "}
                close
            </button>
            {listCartItems}
            <div id="checkout">
                <p>Subtotal:{subtotal.toFixed(2)}</p>
                <button id="checkout-btn">checkout</button>
            </div>
        </div>
    );
}

export default Cart;
