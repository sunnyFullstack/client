import React from "react";

interface ProfileViewProps {
  data: {
    name: string;
    email: string;
    phone: string;
    state?: string;
    district?: string;
    image: string | null;
  };
  onEdit: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ data, onEdit }: any) => {
  return (
    <div className="text-center bg-primary rounded-xl">
      <img
        src={
          data.image || "https://via.placeholder.com/100x100.png?text=Profile"
        }
        alt="Profile"
        className="w-28 h-28 rounded-full mx-auto border object-cover"
      />
      <h2 className="text-xl font-semibold mt-4">{data.name}</h2>
      <p className="text-gray-600">{data.email}</p>
      <p className="text-gray-600">{data.phone}</p>
      <button onClick={onEdit} className="mt-4 text-blue-600 underline text-sm">
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileView;
