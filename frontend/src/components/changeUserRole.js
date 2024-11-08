import React, { useState } from "react";
import ROLE from "../common/role";
import { IoClose } from "react-icons/io5";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({
  name,
  email,
  phone,
  address,
  role,
  userId,
  onClose,
  callFunc,
}) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
    console.log("Role:", e.target.value);
  };

  const updateUser = async () => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }
    if (responseData.error) {
      toast.error(responseData.message);
    }

    console.log("Role updated: ", responseData);
  };

  return (
    <div className=" fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex items-center bg-slate-100 bg-opacity-30">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto  " onClick={onClose}>
          <IoClose
            className="text-xl hover:text-red-600
          "
          />
        </button>

        <h1 className="pb-4 text-lg font-medium">Change user role</h1>

        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
        <p>Address: {address}</p>
        <div className="flex items-center justify-between my-2">
          <p>Role</p>
          <select
            className="border px-4 py-0.5"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.keys(ROLE).map((el) => {
              return (
                <option key={el} value={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="w-fit mx-auto block border p-2 rounded-full updateBtnColor btnColor "
          onClick={updateUser}
        >
          Thay đổi
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
