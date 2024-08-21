import "../index.css";
import { useState, useEffect } from "react";
import prevIcon from "../assets/prev.png";
import nextIcon from "../assets/next.png";

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
            <img id="prev" src={prevIcon} onClick={slideImage} />
            {listImages}
            <img id="next" src={nextIcon} onClick={slideImage} />
        </div>
    );
}

export default Screenshots;
