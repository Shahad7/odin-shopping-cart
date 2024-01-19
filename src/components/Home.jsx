import "../index.css";
import { useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate();
    return (
        <div className="main-body" id="home-bg">
            <div id="left-text">
                Welcome to <div>Game Store</div>
            </div>
            <div id="right-text">
                Let's dive into<div> our collection</div>
                <button
                    onClick={() => {
                        navigate("/shop");
                    }}
                    id="visit-store-btn"
                >
                    Visit Store
                </button>
            </div>
        </div>
    );
}

export default Home;
