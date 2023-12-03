import "../index.css";
import { useState, useEffect } from "react";
import Card from "./Card";
import { Outlet, useOutletContext } from "react-router-dom";

function Shop() {
    const [games, setData] = useOutletContext();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            try {
                const response = await fetch(
                    "https://api.rawg.io/api/games?key=9932e90df0a143d2a577d6c23771f864&page_size=4&page=1"
                );
                if (response.status >= 400)
                    throw new Error("couldn't fetch data");
                const data = await response.json();
                const games = data.results;
                //console.log(games);
                if (!ignore) {
                    //alert("available");
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

    const listGames = games.map((elt) => (
        <Card
            key={elt.id}
            id={elt.id}
            name={elt.name}
            image={elt.background_image}
        />
    ));

    return (
        <div id="shop">
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
