import React, { useEffect } from "react";
import femaleIcon from "../../assets/svg/female.svg";
import maleIcon from "../../assets/svg/male.svg";
import { useGetProfileDetailMutation } from "../../services/auth.api";

interface ProfileViewProps {
  // data: {
  //   name: string;
  //   email: string;
  //   phone: string;
  //   state?: string;
  //   district?: string;
  //   image: string | null;
  // };
  onEdit: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onEdit }: any) => {
  const [
    getProfileDetails,
    { data, isLoading, isSuccess, error, status, isError },
  ] = useGetProfileDetailMutation();
  useEffect(() => {
    getProfileDetails();
  }, []);
  let profileData = data?.data || {};
  console.log(profileData, "fghjhb ", profileData?.firstname);
  // let data = profileData.data;
  return (
    <div className="flex-col xs:flex-col  sm:flex-col md:flex-col text-center justify-start gap-10 bg-primary rounded-xl p-4 ">
      <div className="border-b-2 border-green pr-3 w-full  flex flex-col justify-center relative">
        <img
          src={profileData?.gender === "Male" ? maleIcon : femaleIcon}
          alt="Profile"
          className="w-28 h-28 rounded-full mx-auto border  object-cover"
        />
        <h2 className="text-xl font-semibold mb-4">
          {profileData?.firstname} {profileData?.lastname}
        </h2>

        <button
          onClick={onEdit}
          className="font-bold cursor-pointer text-blue-600 text-sm absolute right-0 top-0"
        >
          Edit Profile
        </button>
      </div>
      <div>
        <h1 className="font-bold ">Peronal information</h1>
      </div>
      <div className="flex border-b-2 border-green justify-between w-full xs:flex-col sm:flex-col p-8">
        <div className="w-1/2 gap-3">
          <div className="text-start">
            <p className="font-bold text-sm">Email</p>
            <p className="text-gray-600 text-sm break-words">
              {profileData?.email || "--"}
            </p>
          </div>
          <div className="text-start pt-8">
            <p className="font-bold text-sm">Phone</p>
            <p className="text-gray-600 text-sm">
              {profileData?.mobile || "--"}
            </p>
          </div>
          <div className="text-start pt-8">
            <p className="font-bold text-sm">Gender</p>
            <p className="text-gray-600 text-sm">
              {profileData?.gender || "--"}
            </p>
          </div>
          <div className="text-start  pt-8">
            <p className="font-bold text-sm">School Name</p>
            <p className="text-gray-600 text-sm">
              {profileData?.school_info?.school_name || "--"}
            </p>
          </div>
        </div>
        <div className="w-1/2 gap-3">
          <div className="text-start">
            <p className="font-bold text-sm">School Code</p>
            <p className="text-gray-600 text-sm">
              {profileData?.school_info?.school_u_dise || "--"}
            </p>
          </div>
          <div className="text-start pt-8">
            <p className="font-bold text-sm">Teacher Code</p>
            <p className="text-gray-600 text-sm">
              {profileData?.teachercode || "--"}
            </p>
          </div>
          <div className="text-start pt-8">
            <p className="font-bold text-sm">Class Group</p>
            <p className="text-gray-600 text-sm">
              {profileData?.classgroup || "--"}
            </p>
          </div>
          <div className="text-start pt-8">
            <p className="font-bold text-sm">Subject Name</p>
            <p className="text-gray-600 text-sm">
              {profileData?.subjectname || "--"}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-bold">Current work location</h1>
      </div>
      <div className="flex border-b-2 border-green justify-between w-full xs:flex-col  p-8">
        <div className="w-1/2 gap-3">
          <div className="text-start">
            <p className="font-bold text-sm">State</p>
            <p className="text-gray-600 text-sm">
              {profileData?.work_location?.state || "--"}
            </p>
          </div>
        </div>
        <div className="w-1/2 gap-3">
          <div className="text-start">
            <p className="font-bold text-sm">District</p>
            <p className="text-gray-600 text-sm">
              {profileData?.work_location?.district || "--"}
            </p>
          </div>
        </div>
        <div className="w-1/2 gap-3">
          <div className="text-start">
            <p className="font-bold text-sm">Block</p>
            <p className="text-gray-600 text-sm">
              {profileData?.work_location?.block || "--"}
            </p>
          </div>
        </div>
        <div className="w-1/2 gap-3">
          <div className="text-start">
            <p className="font-bold text-sm">Village</p>
            <p className="text-gray-600 text-sm">
              {profileData?.work_location?.village || "--"}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-bold">Desired location</h1>
      </div>
      <div className="flex justify-between w-full   p-8">
        <div className="w-1/2  gap-3">
          <div className="text-start">
            <p className="font-bold text-sm">State</p>
            <p className="text-gray-600 text-sm">
              {profileData?.desired_transfer_location?.state || "--"}
            </p>
          </div>
        </div>
        <div className="w-1/2 gap-3">
          <div className="text-start">
            <p className="font-bold text-sm">District</p>
            <p className="text-gray-600 text-sm">
              {profileData?.desired_transfer_location?.district || "--"}
            </p>
          </div>
        </div>
        <div className="w-1/2 gap-3">
          <div className="text-start">
            <p className="font-bold text-sm">Block</p>
            <p className="text-gray-600 text-sm">
              {profileData?.desired_transfer_location?.block || "--"}
            </p>
          </div>
        </div>
        <div className="w-1/2 gap-3">
          <div className="text-start">
            <p className="font-bold text-sm">Village</p>
            <p className="text-gray-600 text-sm">
              {profileData?.desired_transfer_location?.village || "--"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
