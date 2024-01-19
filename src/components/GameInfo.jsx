import "../index.css";
import { useParams, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import Screenshots from "./Screenshots";
function GameInfo() {
    const { gameId } = useParams();
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [addToCart, toggleCartVisibility, cartVisibility] =
        useOutletContext();
    const [mouseState, setMouseState] = useState("release");

    useEffect(() => {
        async function fetchInfo() {
            try {
                const response = await fetch(
                    `https://api.rawg.io/api/games/${gameId}?key=9932e90df0a143d2a577d6c23771f864`
                );
                if (response.status >= 400)
                    throw new Error("couldn't fetch game details");
                const data = await response.json();
                setInfo({
                    ...data,
                    price: parseInt(data.id.toString().slice(1, 2)) * 6 + 99.99,
                });
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchInfo();

        //recursively calls itself to detect if the required dom elements for computation have loaded
        function handleScrollThumbSize() {
            let scrollThumb = document.getElementById("scroll-thumb");
            let scrollContent = document.getElementById("info-desc-main");
            if (scrollContent && scrollThumb) {
                setTimeout(() => {
                    let scrollHeight = parseInt(scrollContent.scrollHeight);
                    let offsetHeight = parseInt(scrollContent.offsetHeight);
                    scrollThumb.style.height =
                        (offsetHeight / scrollHeight) * offsetHeight + "px";
                }, 1000);
            } else {
                setTimeout(handleScrollThumbSize, 0);
            }
        }
        handleScrollThumbSize();
        //to change scrollbar thumb size when window size changes
        window.addEventListener("resize", handleScrollThumbSize);
    }, []);

    function handleAddToCart() {
        addToCart({
            name: info.name,
            image: info.background_image,
            id: gameId,
            price: info.price,
        });
        toggleCartVisibility();
    }

    function handleScroll(e) {
        e.preventDefault();
        let scrollThumb = document.getElementById("scroll-thumb");
        let scrollTop = parseInt(e.target.scrollTop);
        let offsetHeight = parseInt(e.target.offsetHeight);
        let scrollHeight = parseInt(e.target.scrollHeight);
        scrollThumb.style.height =
            (offsetHeight / scrollHeight) * offsetHeight + "px";
        scrollThumb.style.top =
            (scrollTop / scrollHeight) * offsetHeight + "px";
    }

    function handleScrollPress(e) {
        e.preventDefault();
        console.log(e);
        setMouseState("hold");
    }

    function handleScrollOver(e) {
        e.preventDefault();
        if (mouseState == "hold") {
            let scrollThumb = document.getElementById("scroll-thumb");
            let scrollbarHeight = parseInt(
                document.getElementById("scrollbar").clientHeight
            );
            let scrollThumbHeight = parseInt(scrollThumb.style.height);
            let delta = parseInt(e.clientY) - scrollThumbHeight;
            if (delta > 0 && delta < scrollbarHeight - scrollThumbHeight)
                scrollThumb.style.top = delta + "px";
        }
    }

    function handleScrollRelease(e) {
        e.preventDefault();
        if (mouseState == "hold") {
            setMouseState("release");
        }
    }

    return (
        <div
            className="main-body"
            id="game-info"
            onMouseUp={handleScrollRelease}
            onMouseMove={handleScrollOver}
        >
            {error ? (
                <p>{error.message}</p>
            ) : loading ? (
                <Loading />
            ) : (
                <>
                    <p id="info-name">{info.name}</p>
                    <div id="info-main">
                        <Screenshots
                            cartVisibility={cartVisibility}
                            gameId={gameId}
                        />
                        <div id="desc-w-cart">
                            <div id="info-desc-container">
                                <div id="scrollbar">
                                    <div
                                        id="scroll-thumb"
                                        onMouseDown={handleScrollPress}
                                    ></div>
                                </div>
                                <div
                                    id="info-desc-main"
                                    onScroll={handleScroll}
                                >
                                    <p id="info-desc-title" draggable="false">
                                        Description
                                    </p>
                                    <div id="info-desc" draggable="false">
                                        {info.description
                                            .split(/<br\s*\/?>|<p>/gi)
                                            .join("")
                                            .split("</p>")
                                            .join("\n")
                                            .split("&#39;")
                                            .join("'")}
                                    </div>
                                </div>
                            </div>
                            <div className="add-to-cart-sec">
                                <p id="info-price">{"$" + info.price}</p>
                                <button
                                    id="add-to-cart-btn"
                                    onClick={handleAddToCart}
                                >
                                    Add to cart +
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
export default GameInfo;
