import "../index.css";
import { useNavigate } from "react-router-dom";

function Card({ name, image, id }) {
    const navigate = useNavigate();
    function handleClick() {
        navigate(`${id}`);
    }
    return (
        <div id="card" onClick={handleClick}>
            <p>{name}</p>
            <img src={image} alt="" />
        </div>
    );
}

export default Card;
