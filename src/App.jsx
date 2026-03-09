//主應用程式
import { RouterProvider } from "react-router-dom";
import { routes } from "./router";
import "./assets/style.css";
import MessageToast from "./components/MessageToast";

function App() {
    return(
        <>
        <MessageToast />
        <RouterProvider router={routes} />;
        </>
    )
}

export default App;