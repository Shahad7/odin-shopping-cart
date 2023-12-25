import "../index.css";
import CartItem from "./CartItem";

function Cart({ toggleCartVisibility, cart, changeCount }) {
    const listCartItems = cart.map((elt) => (
        <CartItem key={elt.id} itemInfo={elt} changeCount={changeCount} />
    ));
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
        </div>
    );
}

export default Cart;
