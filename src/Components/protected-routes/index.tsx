import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStatus from "../../hooks/useAuthStatus";

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
    return (
      <div className="flex items-center justify-center h-screen text-white text-xl">
        Loading...
      </div>
    );
  }

  return isLoggedIn && element;
};

export default ProtectedRoute;
