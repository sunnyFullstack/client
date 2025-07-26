import React, { useEffect } from "react";
import { useGetUserMatchMutation } from "../../services/users.api";
import { useGetProfileDetailMutation } from "../../services/auth.api";
import femaleIcon from "../../assets/svg/female.svg";
import maleIcon from "../../assets/svg/male.svg";
import FullScreenLoader from "../../Components/Loader/Loader";

const YourMatch = () => {
  const [getUserMatch, { data, isLoading, isSuccess, error, status, isError }] =
    useGetUserMatchMutation();
  const [getProfileDetails, { data: profileData }] =
    useGetProfileDetailMutation();
  useEffect(() => {
    getProfileDetails();
  }, []);
  useEffect(() => {
    const isEmpty = profileData && Object.keys(profileData?.data).length === 0;
    if (!isEmpty) {
      getUserMatch({
        firstname: profileData?.data?.firstname,
        ...profileData?.data?.work_location,
        ...profileData?.data?.school_info,
      });
    }
  }, [profileData]);
  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {isLoading && <FullScreenLoader />}
      {data?.data?.map((obj: any, index: number) => (
        <div className="border-[1px] border-green rounded-xl bg-primary w-[300px]  flex-col flex p-4">
          <div className="flex justify-between items-start gap-2 flex-row sm:flex-col md:flex-col lg:flex-col xl:flex-col">
            <div className="text-center w-full">
              <img
                src={obj?.gender === "Male" ? maleIcon : femaleIcon}
                alt="Profile"
                className="w-28 h-28 rounded-full mx-auto border  object-cover"
              />
              <p className=" text-sm mb-4">
                {obj.firstname} {obj.lastname}
              </p>
            </div>
            <div>
              <p className="text-[13px]">{obj.email}</p>
              <p className="text-[13px]">{obj.mobile}</p>
              <p className="text-[13px]">{obj.gender}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold">Current Job Location</p>
            <p className="text-sm">
              {obj.work_location.state}, {obj.work_location.district} ,{" "}
              {obj.work_location.block} , {obj.work_location.village}{" "}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold">Desired Job Location</p>
            <p className="text-sm">
              {obj.desired_transfer_location.state},{" "}
              {obj.desired_transfer_location.district} ,{" "}
              {obj.desired_transfer_location.block} ,{" "}
              {obj.desired_transfer_location.village}{" "}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default YourMatch;
