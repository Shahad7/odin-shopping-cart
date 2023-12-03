import "../index.css";
import { useLoaderData } from "react-router-dom";

function GameInfo() {
    let info;
    function loadData() {
        const data = useLoaderData();
        info = data;
    }
    loadData();

    return (
        <div id="game-info">
            {!info ? (
                <p>loading...</p>
            ) : (
                <>
                    <p>{info.name}</p>
                    <img src={info.background_image} alt="" />
                    <p>{info.description}</p>
                </>
            )}
        </div>
    );
}
export default GameInfo;
