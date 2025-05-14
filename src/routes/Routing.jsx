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
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ApprovePremiums from "../pages/Dashboard/Admin/ApprovePremiums";
import ApproveContacts from "../pages/Dashboard/Admin/ApproveContacts";
import ApproveStories from "../pages/Dashboard/Admin/ApproveStories";
import BiodataDetails from "../pages/BiodataDetails/BiodataDetails";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "../pages/Dashboard/Common/UserProfile";
import Checkout from "../pages/Dashboard/Payment/Checkout";

const route = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Error />,
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
        path: "biodata-details/:id",
        element: (
          <PrivateRoute>
            <BiodataDetails />
          </PrivateRoute>
        ),
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
    errorElement: <Error />,
    children: [
      // Remove duplicate index route and use a single entry point
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "statistics",
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "checkout/:id",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      // Normal user routes
      {
        path: "edit-biodata",
        element: (
          <PrivateRoute>
            <EditBiodata />
          </PrivateRoute>
        ),
      },
      {
        path: "view-biodata",
        element: (
          <PrivateRoute>
            <ViewBiodata />
          </PrivateRoute>
        ),
      },
      {
        path: "contact-request",
        element: (
          <PrivateRoute>
            <MyRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "favourite-biodata",
        element: (
          <PrivateRoute>
            <MyFavourites />
          </PrivateRoute>
        ),
      },
      {
        path: "got-married",
        element: (
          <PrivateRoute>
            <GotMarried />
          </PrivateRoute>
        ),
      },
      // Admin special routes
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "approved-premium",
        element: (
          <PrivateRoute>
            <ApprovePremiums />
          </PrivateRoute>
        ),
      },
      {
        path: "approved-contact-request",
        element: (
          <PrivateRoute>
            <ApproveContacts />
          </PrivateRoute>
        ),
      },
      {
        path: "success-story",
        element: (
          <PrivateRoute>
            <ApproveStories />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default route;
