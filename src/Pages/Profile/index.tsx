import React, { useState } from "react";
import ProfileView from "./ProfileView";
import ProfileEdit from "./ProfileEdit";
import { useGetProfileQuery } from "../../services/auth.api";
import FullScreenLoader from "../../Components/Loader/Loader";

const ProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { data, isSuccess, isError, isLoading } = useGetProfileQuery();

  const userData = data?.data;
  const [formData, setFormData] = useState({
    name: `${userData?.firstname} ${userData?.lastname}`,
    email: userData?.email,
    phone: userData?.mobile,
    image: null as string | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditMode(false);
  };
  return (
    <div className="w-[100%] h-auto overflow-auto flex justify-center py-10">
      {isLoading && <FullScreenLoader />}
      {isEditMode ? (
        <ProfileEdit
          formData={userData}
          onChange={handleChange}
          onImageChange={handleImageChange}
          onCancel={() => setIsEditMode(false)}
          onSave={handleSave}
        />
      ) : (
        <div className="w-[90%] ">
          <ProfileView data={userData} onEdit={() => setIsEditMode(true)} />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
