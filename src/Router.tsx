import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import Root from "./Root";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import CreateAccount from "./screens/CreateAccount";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "auth",
        element: <Login />,
      },
      {
        path: "sign",
        element: <CreateAccount />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
