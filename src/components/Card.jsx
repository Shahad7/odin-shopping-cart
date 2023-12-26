import "../index.css";
import { useNavigate } from "react-router-dom";

function Card({ name, image, id, price }) {
    const navigate = useNavigate();
    function handleClick() {
        navigate(`${id}`);
    }
    return (
        <div id="card" onClick={handleClick}>
            <img className="card-image" src={image} alt="" />
            <div id="card-info">
                <p id="card-title">{name}</p>
                <p id="card-price">{"$" + price}</p>
            </div>
        </div>
    );
}

export default Card;
