import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Error from "../pages/Error";
import Home from "../pages/Home/Home";
import Biodata from "../pages/AllBiodata/Biodata";
import AboutUs from "../pages/Site/AboutUs";
import ContactUs from "../pages/Site/ContactUs";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../layouts/Dashboard";
import Statistics from "../pages/Dashboard/Statistics";
import EditBiodata from "../pages/Dashboard/User/EditBiodata";
import ViewBiodata from "../pages/Dashboard/User/ViewBiodata";
import MyRequests from "../pages/Dashboard/User/MyRequests";
import MyFavourites from "../pages/Dashboard/User/MyFavourites";
import GotMarried from "../pages/Dashboard/User/GotMarried";

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
      {
        path: "all-biodata",
        Component: Biodata,
      },
      {
        path: "about-us",
        Component: AboutUs,
      },
      {
        path: "contact-us",
        Component: ContactUs,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    errorElement: Error,
    children: [
      {
        index: true,
        Component: Statistics,
      },
      {
        path: "edit-biodata",
        Component: EditBiodata,
      },
      {
        path: "view-biodata",
        Component: ViewBiodata,
      },
      {
        path: "contact-request",
        Component: MyRequests,
      },
      {
        path: "favourite-biodata",
        Component: MyFavourites,
      },
      {
        path: "got-married",
        Component: GotMarried,
      },
    ],
  },
]);

export default route;
