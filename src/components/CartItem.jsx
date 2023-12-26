import "../index.css";
import { useState } from "react";

function CartItem({ itemInfo, changeCount, deleteCartItem }) {
    const [count, setCount] = useState(itemInfo.count);

    function increaseCount() {
        changeCount(itemInfo.id, count + 1);
        setCount(count + 1);
    }

    function decreaseCount() {
        if (count != 1) {
            changeCount(itemInfo.id, count - 1);
            setCount(count - 1);
        }
    }
    return (
        <div className="cart-item">
            <p>{itemInfo.name}</p>
            <img src={itemInfo.image} className="cart-item-img" alt="" />
            <button onClick={decreaseCount}>-</button>
            <p className="cart-item-count">{count}</p>
            <button onClick={increaseCount}>+</button>
            {/*gotta replace this a trash icon later*/}
            <button
                onClick={() => {
                    deleteCartItem(itemInfo.id);
                }}
            >
                delete
            </button>
        </div>
    );
}

export default CartItem;
