import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHome from "../Pages/AdminHome";
import ProtectedRoute from "../Components/protected-routes";
import Sidebar from "../Components/Sidebar";
import ProfilePage from "../Pages/Profile";
import MobileSidebar from "../Components/Sidebar/MobileSidebar";
import Home from "../Pages/Home";
import YourMatch from "../Pages/YourMatch";

const AdminLayout = () => {
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
        element: <ProtectedRoute element={<AdminHome />} />,
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
