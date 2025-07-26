import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStatus from "../../hooks/useAuthStatus";
import FullScreenLoader from "../Loader/Loader";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useAuthStatus();
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/signin");
    }
  }, [isLoading, isLoggedIn, navigate]);
  if (isLoading) {
    return <>{isLoading && <FullScreenLoader />}</>;
  }

  return isLoggedIn && element;
};

export default ProtectedRoute;
