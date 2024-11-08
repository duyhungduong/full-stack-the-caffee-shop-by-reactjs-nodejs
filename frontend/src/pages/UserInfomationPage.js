import React, { useContext, useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const UserInfomationPage = () => {
  // Truy cập vào state trong Redux store để lấy thông tin user
  const user = useSelector((state) => state.user?.user || {});
  const { fetchUserDetails } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    userId: user?._id,
    email: user?.email || "",
    name: user?.name || "",
    phone: user?.phone || "Không được cung cấp, vui lòng load lại",
    address: user?.address || "Không được cung cấp, vui lòng load lại",
    role: user?.role,
  });
  useEffect(() => {
    // Cập nhật lại data khi user thay đổi
    setData({
      userId: user?._id,
      email: user?.email || "",
      name: user?.name || "",
      phone: user?.phone || "Không được cung cấp, vui lòng load lại",
      address: user?.address || "Không được cung cấp, vui lòng load lại",
      role: user?.role,
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.updateInformationUser.url, {
      method: SummaryApi.updateInformationUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      fetchUserDetails();
    }
    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  useEffect(() => {
    if (!user || !Object.keys(user).length) {
      fetchUserDetails();
    }
  }, [fetchUserDetails, user]);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Information</h2>

      {/* Display message if user object is empty and loading is false */}
      {user && Object.keys(user).length === 0 && !loading && (
        <p className="bg-slate-600 py-7 text-center text-white text-lg">
          No Information in your account
        </p>
      )}

      <div className="flex flex-col lg:flex-row gap-7 lg:justify-between">
        {/* Profile and Info */}
        <div className="w-full lg:w-1/3 flex items-center justify-center">
          <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-lg mx-5">
            <div className="w-36 h-36 mx-auto relative overflow-hidden rounded-full border-4 border-coffee-brown shadow-md">
              {user?.profilePic ? (
                <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <RxAvatar className="w-full h-full text-gray-400" />
              )}
            </div>

            <div className="mt-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                {user?.name || "Admin Name"}
              </h2>
              <p className="text-gray-500 mt-1">{user?.email || "Email not provided"}</p>
              <p className="text-gray-500 mt-1">{user?.role || "Role not provided"}</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-lg p-6 flex items-center justify-center gap-2">
          <form className="grid p-4 h-full pb-5 gap-2 w-full" onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter email..."
              value={data.email}
              className="p-3 w-full bg-slate-600 text-white border rounded"
              readOnly
            />
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter name..."
              value={data.name}
              onChange={handleOnChange}
              className="p-3 w-full bg-slate-100 border rounded"
              required
            />
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Enter address..."
              value={data.address}
              onChange={handleOnChange}
              className="p-3 w-full bg-slate-100 border rounded"
            />
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter phone number..."
              value={data.phone}
              onChange={handleOnChange}
              className="p-3 w-full bg-slate-100 border rounded"
            />
            <button className="px-4 py-4 mt-2 mb-10 bg-[#0090da] hover:bg-[#0091daa7] text-white rounded-md shadow-xl">
              Update Information
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfomationPage;
