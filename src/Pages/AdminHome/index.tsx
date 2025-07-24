import React, { useEffect, useState } from "react";
import ProfileCard from "../../Components/ProfileCard";
import PageWrapper from "../../Components/Wrapper";
import Input from "../../Components/Input/Input";
import profiles from "../../data/profile.json";
import { useGetUsersMutation } from "../../services/users.api";

const AdminHome = () => {
  const [profileData, setProfileData] = useState<any>();
  const [searchTerm, setSearchTerm] = useState("");
  const [getUsers, { data, isLoading, isSuccess, error, status, isError }] =
    useGetUsersMutation();
  useEffect(() => {
    setProfileData(profiles);
    getUsers();
  }, []);
  const filteredProfiles = profileData?.filter((profile: any) => {
    const term = searchTerm.toLowerCase();
    return (
      profile.name.toLowerCase().includes(term) ||
      profile.mobile.includes(term) ||
      profile.email.toLowerCase().includes(term) ||
      profile.work_location_state.toLowerCase().includes(term) ||
      profile.work_location_district.toLowerCase().includes(term) ||
      profile.desired_transfer_state.toLowerCase().includes(term) ||
      profile.desired_transfer_district.toLowerCase().includes(term)
    );
  });
  return (
    <PageWrapper>
      <div className="flex justify-center items-center gap-2 py-6 w-full">
        <div className="w-full flex justify-center items-center gap-3">
          <p className="font-medium text-3xl text-primary">Search</p>
          <Input
            value={searchTerm}
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/3"
            parentClassName="w-full"
            placeholder="Search By Name, Phone, Email, Desired Location"
          />
        </div>
      </div>

      <div className="flex justify-evenly flex-wrap gap-[20px] w-full">
        {filteredProfiles?.map((obj: any, index: number) => (
          <ProfileCard item={obj} index={index} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default AdminHome;
