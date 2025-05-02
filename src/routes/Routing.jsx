import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Error from "../pages/Error";
import Home from "../pages/Home/Home";

const route = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: Error,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);

export default route;
