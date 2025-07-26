import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImg from "../../assets/images/logo.jpg";
import Logo from "../../Components/Logo";
import Button from "../Button";
import { useLogoutMutation } from "../../services/auth.api";
import {
  Home,
  List,
  RefreshCcw,
  Settings,
  LogOut,
  PersonStanding,
  UserIcon,
} from "lucide-react";

const Sidebar = () => {
  const [logout, { data, isLoading, isSuccess, error, status, isError }] =
    useLogoutMutation();
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const logoutHandle = () => {
    logout();
  };
  useEffect(() => {
    if (isSuccess && status === "fulfilled") {
      navigate(0);
    }
  }, [isSuccess, status]);
  const linkClass = (path: string) =>
    `flex items-center gap-3 rounded p-2 transition${
      pathname === path
        ? "bg-gray-700 text-linkBlue"
        : "hover:bg-gray-700 text-primary"
    }`;
  return (
    // 1b1b1f
    <div className=" h-screen w-64 bg-[#1b1b18] text-white shadow-lg z-40">
      <div className="p-6 text-2xl font-bold  flex justify-center">
        <Logo src={logoImg} size={100} className="border-2 border-grey" />
      </div>
      <nav className="p-4 space-y-4">
        <Link to="/home" className={linkClass("/home")}>
          <Home size={20} />
          Home
        </Link>
        <Link to="/request" className={linkClass("/request")}>
          <List size={20} />
          List Of Requests
        </Link>
        <Link to="/profile" className={linkClass("/profile")}>
          <UserIcon size={20} />
          Profile
        </Link>
        <Link to="/found-your-match" className={linkClass("/found-your-match")}>
          <PersonStanding size={20} />
          Your match
        </Link>
        <p
          className="flex items-center gap-3 bg-none underline text-primary font-bold pl-[10px] cursor-pointer"
          onClick={logoutHandle}
        >
          <LogOut size={20} />
          Logout
        </p>
      </nav>
    </div>
  );
};

export default Sidebar;
