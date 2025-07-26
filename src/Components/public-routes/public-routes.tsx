import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStatus from "../../hooks/useAuthStatus";

const PublicRoute = ({ element }: { element: JSX.Element }) => {
  const { isLoggedIn, isLoading, user } = useAuthStatus();

  if (isLoading) return <div>Loading...</div>;

  return isLoggedIn ? <Navigate to="/home" /> : element;
};

export default PublicRoute;
