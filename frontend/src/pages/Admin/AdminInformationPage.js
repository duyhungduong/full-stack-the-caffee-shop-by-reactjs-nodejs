import React from "react";
import { useSelector } from "react-redux";
import { RxAvatar } from "react-icons/rx";

const AdminInfomationPage = () => { 
  const user = useSelector((state) => state?.user?.user);

  return (
    <div className="min-h-screen flex items-center justify-center bg-coffee-background py-12 h-[calc(100vh-190px)]">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-lg mx-5 ">
        {/* Profile Image */}
        <div className="w-36 h-36 mx-auto relative overflow-hidden rounded-full border-4 border-coffee-brown shadow-md">
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <RxAvatar className="w-full h-full text-gray-400" />
          )}
        </div>

        {/* Information Section */}
        <div className="mt-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">
              {user?.name || "Admin Name"}
            </h2>
            <p className="text-gray-500 mt-1">{user?.email || "Email not provided"}</p>
            <p className="text-gray-500 mt-1">{user?.role || "Role not provided"}</p>
          </div>

          {/* User Info Form */}
          <div className="space-y-6">
            <InfoItem label="Email" value={user?.email || "Not provided"} />
            <InfoItem label="Name" value={user?.name || "Not provided"} />
            <InfoItem label="Role" value={user?.role || "Not provided"} />
            <InfoItem label="Phone" value={user?.phone || "Not provided"} />
            <InfoItem label="Address" value={user?.address || "Not provided"} />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="bg-gray-100 p-3 rounded-lg shadow-inner transition-colors hover:bg-gray-200">
      <input
        type="text"
        value={value}
        readOnly
        className="bg-transparent w-full text-gray-700 font-medium outline-none"
      />
    </div>
  </div>
);

export default AdminInfomationPage;
