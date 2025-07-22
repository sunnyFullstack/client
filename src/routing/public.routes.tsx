import React from "react";
import { Outlet } from "react-router-dom";
import SignInPage from "../Pages/SignInPage";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import PublicRoute from "../Components/public-routes/public-routes";

const AppLayout = () => <Outlet />;

const routers = [
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: <PublicRoute element={<SignInPage />} />,
      },
      {
        path: "/register",
        element: <PublicRoute element={<Register />} />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
];

export { routers as PublicRoutes };
