import "../index.css";
import { useState, useEffect } from "react";
import Card from "./Card";
import { Outlet } from "react-router-dom";

function Shop() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            try {
                const response = await fetch(
                    "https://api.rawg.io/api/games?key=9932e90df0a143d2a577d6c23771f864&page_size=9&page=1"
                );
                if (response.status >= 400)
                    throw new Error("couldn't fetch data");
                const data = await response.json();
                const games = data.results;
                if (!ignore) {
                    setData(games);
                }
            } catch (error) {
                console.error(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();

        return () => {
            ignore = true;
        };
    }, []);

    const listGames = data.map((elt) => (
        <Card
            key={elt.id}
            id={elt.id}
            name={elt.name}
            image={elt.background_image}
            price={(
                parseInt(elt.id.toString().slice(1, 2)) * 6 +
                99.99
            ).toFixed(2)}
        />
    ));

    return (
        <div className="main-body" id="shop">
            {error ? (
                <p>{error.message}</p>
            ) : !loading ? (
                listGames
            ) : (
                <p>loading ....</p>
            )}
        </div>
    );
}

export default Shop;
