import "../index.css";
import { useState, useEffect } from "react";
import prevIcon from "../assets/prev.svg";
import nextIcon from "../assets/next.svg";

function Screenshots({ gameId, cartVisibility }) {
    const [pics, setPics] = useState([]);
    const [imageIndex, setImageIndex] = useState(0);
    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await fetch(
                    `https://api.rawg.io/api/games/${gameId}/screenshots?key=9932e90df0a143d2a577d6c23771f864`
                );
                if (response.status >= 400)
                    throw new Error("couldn't fetch the images");
                const data = await response.json();
                const extract = data.results.map((elt) => elt.image);
                setPics(extract);
            } catch (err) {
                console.error(err);
            }
        }
        fetchImages();
    }, []);
    const listImages = pics.map((elt) => {
        let index = pics.indexOf(elt);
        if (index == imageIndex)
            return (
                <img
                    className="screenshot-img"
                    src={elt}
                    key={index}
                    id={index}
                    style={{ display: "block" }}
                ></img>
            );
        else
            return (
                <img
                    className="screenshot-img"
                    src={elt}
                    key={index}
                    id={index}
                    style={{ display: "none" }}
                ></img>
            );
    });

    function slideImage(e) {
        let count = pics.length;
        if (e.target.id == "prev") {
            setImageIndex((imageIndex + count - 1) % count);
        } else {
            setImageIndex((imageIndex + 1) % count);
        }
    }
    return (
        <div id="screenshots">
            <svg
                id="prev"
                onClick={slideImage}
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-chevron-left"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="white"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 6l-6 6l6 6" />
            </svg>
            {listImages}
            {/* <img id="next" src={nextIcon} onClick={slideImage} /> */}
            <svg
                id="next"
                onClick={slideImage}
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-chevron-right"
                width="24"
                height="240"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="white"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 6l6 6l-6 6" />
            </svg>
        </div>
    );
}

export default Screenshots;
