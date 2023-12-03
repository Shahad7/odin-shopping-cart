import {
    createBrowserRouter,
    createMemoryRouter,
    RouterProvider,
} from "react-router-dom";
import Main from "./Main";
import Shop from "./Shop";
import GameInfo from "./GameInfo";
import Home from "./Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            { index: true, element: <Home /> },
            {
                path: "shop",
                element: <Shop />,
            },
            {
                path: "shop/:gameId",
                element: <GameInfo />,
            },
        ],
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
