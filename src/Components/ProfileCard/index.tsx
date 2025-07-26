import { maskEmail } from "../../utils/maskEmail";
import { maskPhone } from "../../utils/maskPhone";
import React, { useEffect, useState } from "react";
import { maskName } from "../../utils/nameMasking";
import Button from "../Button";
import femaleIcon from "../../assets/svg/female.svg";
import maleIcon from "../../assets/svg/male.svg";

const ProfileCard = ({
  isOpen,
  setIsOpen,
  onClickHandleOnView,
  item,
  index,
}: any) => {
  const [selectedProfile, setSelectedProfile] = useState<any>({});

  return (
    <>
      <div
        key={index}
        className="w-[250px] flex flex-col items-center bg-[#807a7a0d] shadow-custom rounded-xl py-4"
      >
        <img
          className="w-24 h-24 rounded-full mx-auto mt-2 object-cover border-2 border-white"
          src={item.gender === "Male" ? maleIcon : femaleIcon}
          alt="Profile"
        />

        <div className="p-4 text-center">
          <p className="text-sm font-bold text-gray-800 text-primary">
            {maskName(`${item.firstname} ${item.lastname}`)}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400 text-primary">
            {maskEmail(item.email)}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400 text-primary">
            {maskPhone(item.mobile)}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400 text-primary">
            Desired Location: {item?.desired_transfer_location?.state || "N/A"}
          </p>
          <Button
            variant="secondary"
            onClick={() => {
              onClickHandleOnView(item);
            }}
            className="mt-3 inline-block py-2 px-4 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            View Profile
          </Button>
        </div>
      </div>
    </>
  );
};
export default ProfileCard;
