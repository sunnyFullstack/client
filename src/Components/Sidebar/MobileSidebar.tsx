import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/images/logo.jpg";
import Logo from "../../Components/Logo";
import { useLogoutMutation } from "../../services/auth.api";
import {
  Home,
  List,
  RefreshCcw,
  Settings,
  LogOut,
  UserIcon,
  PersonStanding,
  Menu,
  X,
} from "lucide-react";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logout, { isSuccess, status }] = useLogoutMutation();
  const navigate = useNavigate();

  const logoutHandle = () => {
    logout();
    setIsOpen(false);
  };

  useEffect(() => {
    if (isSuccess && status === "fulfilled") {
      navigate(0);
    }
  }, [isSuccess, status]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger */}
      <div className="p-4 flex justify-between items-center bg-[#1b1b18] text-white shadow z-50">
        {/* <Logo src={logoImg} size={50} /> */}
        <button onClick={toggleSidebar} className="text-primary">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar (Mobile + Desktop) */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-[#1b1b18] text-white shadow-lg z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex`}
      >
        <div className="p-6 text-2xl font-bold flex justify-center">
          <Logo src={logoImg} size={100} className="border-2 border-grey" />
        </div>

        <nav className="p-4 space-y-4">
          <Link
            to="/home"
            onClick={closeSidebar}
            className="flex items-center gap-3 p-2 text-primary rounded transition"
          >
            <Home size={20} />
            Home
          </Link>
          <Link
            to="/request"
            onClick={closeSidebar}
            className="flex items-center gap-3 p-2 text-primary rounded transition"
          >
            <List size={20} />
            List Of Requests
          </Link>
          <Link
            to="/profile"
            onClick={closeSidebar}
            className="flex items-center gap-3 p-2 text-primary rounded transition"
          >
            <UserIcon size={20} />
            Profile
          </Link>
          <Link
            to="/found-your-match"
            onClick={closeSidebar}
            className="flex items-center gap-3 p-2 text-primary rounded transition"
          >
            <PersonStanding size={20} />
            Your match
          </Link>
          <button
            onClick={logoutHandle}
            className="flex items-center gap-3 text-primary p-2 font-bold rounded transition cursor-pointer"
          >
            <LogOut size={20} />
            Logout
          </button>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}
    </>
  );
};

export default MobileSidebar;
