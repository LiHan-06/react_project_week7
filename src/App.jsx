//主應用程式
import { RouterProvider } from "react-router-dom";
import { routes } from "./router";
import "./assets/style.css";

function App() {
    return <RouterProvider router={routes} />;
}

export default App;