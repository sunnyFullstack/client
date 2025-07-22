import { useEffect, useState } from "react";

const useAuthStatus = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate auth check (replace with actual logic)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
    setIsLoading(false); // auth check completed
  }, []);

  return { isLoading, isLoggedIn, user };
};

export default useAuthStatus;
