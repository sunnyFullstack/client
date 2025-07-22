// hooks/useAuthStatus.ts

import { useGetProfileQuery } from "../services/auth.api";

const useAuthStatus = () => {
  const { data, isSuccess, isError, isLoading } = useGetProfileQuery();
  console.log(useGetProfileQuery(), "mmm");
  return {
    isLoggedIn: isSuccess,
    isLoading,
    user: data || null,
    isError,
  };
};

export default useAuthStatus;
