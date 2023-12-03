import "../index.css";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav id="navbar">
            <Link to="/" style={{ marginRight: "10px" }}>
                Home
            </Link>
            <Link to="shop">Shop</Link>
        </nav>
    );
}

export default Navbar;
