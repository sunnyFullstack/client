import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Requests from "../Pages/Requests";
import ProtectedRoute from "../Components/protected-routes";
import Sidebar from "../Components/Sidebar";
import ProfilePage from "../Pages/Profile";
import MobileSidebar from "../Components/Sidebar/MobileSidebar";
import Home from "../Pages/Home";
import YourMatch from "../Pages/YourMatch";
import { useGetProfileQuery } from "../services/auth.api";

const AdminLayout = () => {
  const { data, isSuccess, isError, isLoading } = useGetProfileQuery();
  console.log(data, "mnmnmn");
  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className="block xs:hidden sm:hidden h-screen">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div className="hidden xs:block sm:block absolute z-[12] h-screen">
        <MobileSidebar />
      </div>

      {/* Right Content */}

      <main className="p-4 flex-1 bg-[#1b1b1f] overflow-scroll h-[100vh]">
        {data?.isProfileComplete && (
          <p className="text-red">
            <p> For better match.</p> Please complete your profile.{" "}
            <Link to="/profile" className="text-linkBlue">
              Click here.....
            </Link>
          </p>
        )}
        <Outlet />
      </main>
    </div>
  );
};

const routers = [
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/home",
        element: <ProtectedRoute element={<Home />} />,
      },
      {
        path: "/request",
        element: <ProtectedRoute element={<Requests />} />,
      },
      {
        path: "/profile",
        element: <ProtectedRoute element={<ProfilePage />} />,
      },
      {
        path: "/found-your-match",
        element: <ProtectedRoute element={<YourMatch />} />,
      },
    ],
  },
];

export { routers as PrivateRoutes };
