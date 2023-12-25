import "../index.css";
import { useParams, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import Screenshots from "./Screenshots";
function GameInfo() {
    const { gameId } = useParams();
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [addToCart, toggleCartVisibility, cartVisibility] =
        useOutletContext();

    useEffect(() => {
        async function fetchInfo() {
            try {
                const response = await fetch(
                    `https://api.rawg.io/api/games/${gameId}?key=9932e90df0a143d2a577d6c23771f864`
                );
                if (response.status >= 400)
                    throw new Error("couldn't fetch game details");
                const data = await response.json();
                setInfo(data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchInfo();
    }, []);

    function handleAddToCart() {
        addToCart({
            name: info.name,
            image: info.background_image,
            id: gameId,
        });
        toggleCartVisibility();
    }

    return (
        <div id="game-info">
            {error ? (
                <p>{error.message}</p>
            ) : loading ? (
                <p>loading...</p>
            ) : (
                <>
                    <p>{info.name}</p>
                    <Screenshots
                        cartVisibility={cartVisibility}
                        gameId={gameId}
                    />
                    <div style={{ whiteSpace: "pre" }}>
                        {info.description
                            .split(/<br\s*\/?>|<p>/gi)
                            .join("")
                            .split("</p>")
                            .join("\n")
                            .split("&#39;")
                            .join("'")}
                    </div>
                    <button onClick={handleAddToCart}>add to cart</button>
                </>
            )}
        </div>
    );
}
export default GameInfo;
