import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const logoutHandle = () => {
    logout();
  };
  useEffect(() => {
    if (isSuccess && status === "fulfilled") {
      navigate(0);
    }
  }, [isSuccess, status]);
  return (
    // 1b1b1f
    <div className=" h-screen w-64 bg-[#1b1b18] text-white shadow-lg z-40">
      <div className="p-6 text-2xl font-bold  flex justify-center">
        <Logo src={logoImg} size={100} className="border-2 border-grey" />
      </div>
      <nav className="p-4 space-y-4">
        <Link
          to="/home"
          className="flex items-center gap-3 hover:bg-gray-700 p-2 text-primary rounded transition"
        >
          <Home size={20} />
          Home
        </Link>
        <Link
          to="/request"
          className="flex items-center gap-3 hover:bg-gray-700 p-2 text-primary rounded transition"
        >
          <List size={20} />
          List Of Requests
        </Link>
        <Link
          to="/profile"
          className="flex items-center gap-3 hover:bg-gray-700 p-2 text-primary rounded transition"
        >
          <UserIcon size={20} />
          Profile
        </Link>
        <Link
          to="/found-your-match"
          className="flex items-center gap-3 hover:bg-gray-700 p-2 text-primary rounded transition"
        >
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
