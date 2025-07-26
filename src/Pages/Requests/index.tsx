import React, { useEffect, useState } from "react";
import ProfileCard from "../../Components/ProfileCard";
import PageWrapper from "../../Components/Wrapper";
import Input from "../../Components/Input/Input";
import profiles from "../../data/profile.json";
import { useGetUsersMutation } from "../../services/users.api";
import FullScreenLoader from "../../Components/Loader/Loader";
import Modal from "../../Components/Modal";

const Requests = () => {
  const [profileData, setProfileData] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [getUsers, { data, isLoading, isSuccess, error, status, isError }] =
    useGetUsersMutation();
  useEffect(() => {
    setProfileData(profiles);
    getUsers();
  }, []);
  const onClickHandleOnView = (obj: any) => {
    setSelectedProfile(obj);
    setIsOpen(true);
  };
  const filteredProfiles = data?.data?.filter((profile: any) => {
    const term = searchTerm?.toLowerCase();
    let name = `${profile?.firstname} ${profile?.lastname}`;
    return (
      name.toLowerCase().includes(term) ||
      profile.mobile.includes(term) ||
      profile.email.toLowerCase().includes(term) ||
      profile.work_location.state.toLowerCase().includes(term) ||
      profile.work_location.district.toLowerCase().includes(term) ||
      profile.desired_transfer_location.state.toLowerCase().includes(term) ||
      profile.desired_transfer_location.district.toLowerCase().includes(term)
    );
  });
  return (
    <PageWrapper>
      {isLoading && <FullScreenLoader />}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="User Profile"
        selectedProfile={selectedProfile}
      >
        <div className="text-black">
          {selectedProfile.firstname} {selectedProfile.lastname}{" "}
        </div>
      </Modal>
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
          <ProfileCard
            item={obj}
            index={index}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onClickHandleOnView={onClickHandleOnView}
          />
        ))}
      </div>
    </PageWrapper>
  );
};

export default Requests;
