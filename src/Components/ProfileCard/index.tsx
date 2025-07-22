import { maskEmail } from "../../utils/maskEmail";
import { maskPhone } from "../../utils/maskPhone";
import React, { useEffect } from "react";
import { maskName } from "../../utils/nameMasking";

const ProfileCard = ({ item, index }: any) => {
  return (
    <div
      key={index}
      className="w-[250px] flex flex-col items-center bg-[#2f2c2c] shadow-custom rounded-xl py-4"
    >
      <img
        className="w-24 h-24 rounded-full mx-auto mt-2 object-cover border-2 border-white"
        src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.0&auto=format&fit=crop&w=320&q=80"
        alt="Profile"
      />

      <div className="p-4 text-center">
        <h3 className="text-lg font-bold text-gray-800 text-primary">
          {maskName(item.name)}
        </h3>
        <p className="mt-1 text-gray-500 dark:text-neutral-400 text-primary">
          {maskEmail(item.email)}
        </p>
        <p className="mt-1 text-gray-500 dark:text-neutral-400 text-primary">
          {maskPhone(item.mobile)}
        </p>
        <p className="mt-1 text-gray-500 dark:text-neutral-400 text-primary">
          Desired Location: {item.desired_transfer_state}
        </p>
        <a
          className="mt-3 inline-block py-2 px-4 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          href="#"
        >
          Visit Profile
        </a>
      </div>
    </div>
  );
};
export default ProfileCard;
