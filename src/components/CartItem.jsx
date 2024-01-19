import "../index.css";
import { useState } from "react";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";

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
            <img src={itemInfo.image} className="cart-item-img" alt="" />
            <div className="cart-item-info">
                <div className="title-w-del">
                    <p>{itemInfo.name}</p>
                    <Icon
                        className="delete-item-btn"
                        path={mdiTrashCanOutline}
                        onClick={() => {
                            deleteCartItem(itemInfo.id);
                        }}
                        size={1}
                    />
                </div>
                <div className="count-w-price">
                    <p id="item-price">{"$" + itemInfo.price}</p>
                    <div className="count-btn-grp">
                        <button onClick={decreaseCount}>-</button>
                        <div className="cart-item-count">{count}</div>
                        <button onClick={increaseCount}>+</button>
                    </div>
                </div>
                {/*gotta replace this a trash icon later*/}
            </div>
        </div>
    );
}

export default CartItem;
