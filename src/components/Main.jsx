import "../index.css";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";

function Main() {
    const [games, setGames] = useState([]);
    function setData(data) {
        setGames(data);
    }
    return (
        <div id="main">
            <Navbar />
            <Outlet context={[games, setData]} />
            <Footer />
        </div>
    );
}

export default Main;
