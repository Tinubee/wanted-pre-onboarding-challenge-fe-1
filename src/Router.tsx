import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import Root from "./Root";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import CreateAccount from "./screens/CreateAccount";
import Todo from "./screens/Todo";
import TodoContent from "./screens/TodoContent";

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
      {
        path: "todo",
        element: <Todo />,
        children: [
          {
            path: ":todoId",
            element: <TodoContent />,
          },
        ],
      },
    ],

    errorElement: <NotFound />,
  },
]);

export default router;
