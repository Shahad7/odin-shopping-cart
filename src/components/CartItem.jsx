import "../index.css";
import { useState } from "react";

function CartItem({ itemInfo }) {
    const [count, setCount] = useState(itemInfo.count);

    function increaseCount() {
        setCount(count + 1);
    }

    function decreaseCount() {
        if (count != 1) setCount(count - 1);
    }
    return (
        <div className="cart-item">
            <p>{itemInfo.name}</p>
            <img src={itemInfo.image} className="cart-item-img" alt="" />\
            <button onClick={decreaseCount}>-</button>
            <p className="cart-item-count">{count}</p>
            <button onClick={increaseCount}>+</button>
        </div>
    );
}

export default CartItem;
