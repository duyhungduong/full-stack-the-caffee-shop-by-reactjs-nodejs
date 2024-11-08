import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdOutlineModeEditOutline } from "react-icons/md";
import ChangeUserRole from "../components/changeUserRole";
import ROLE from "../common/role";
import { useSelector } from "react-redux"; // lấy role của user từ redux

const AllUser = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    role: "",
    _id: "",
  });

  const user = useSelector((state) => state.user?.user); // lấy user hiện tại

  useEffect(() => {
    fetchAllUsers();
  }, []);
  
  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    });
  
    const dataResponce = await fetchData.json();
  
    if (dataResponce.success) {
      console.log(dataResponce.data);  // In ra dữ liệu người dùng
      setAllUsers(dataResponce.data);
    }
  
    if (dataResponce.error) {
      toast.error(dataResponce.message);
    }
  };
  

  // Phân loại người dùng dựa trên role
  const adminUsers = allUser.filter((el) => el?.role === ROLE.ADMIN);
  const generalUsers = allUser.filter((el) => el?.role === ROLE.GENERAL);
  const employeeUsers = allUser.filter((el) => el?.role === ROLE.EMLOYEE);

  // Hàm hiển thị role với màu sắc khác nhau
  const roleStyles = (role) => {
    switch (role) {
      case ROLE.ADMIN:
        return "bg-red-500 text-white";
      case ROLE.GENERAL:
        return "bg-blue-500 text-white";
      case ROLE.EMPLOYEE:
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  // Hàm render bảng người dùng
  const renderUserTable = (users) => (
    <table className="w-full table-auto bg-gray-100 rounded-lg overflow-hidden">
      <thead className="bg-coffee-brown text-white">
        <tr>
          <th className="p-3">Sr.</th>
          <th className="p-3">Name</th>
          <th className="p-3">Email</th>
          <th className="p-3">Phone</th>
          <th className="p-3">Address</th>
          <th className="p-3">Role</th>
          <th className="p-3">Created Date</th>
          <th className="p-3">Action</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {users.map((el, index) => (
          <tr key={el._id} className="border-b border-gray-200 hover:bg-gray-50">
            <td className="text-center p-3">{index + 1}</td>
            <td className="p-3">{el?.name}</td>
            <td className="p-3">{el?.email}</td>
            <td className="p-3">{el?.phone}</td>
            <td className="p-3">{el?.address}</td>
            <td className={`p-3 text-center font-semibold ${roleStyles(el?.role)}`}>
              {el?.role}
            </td>
            <td className="p-3 text-center">{moment(el?.createdAt).format("lll")}</td>
            <td className="text-center p-3">
              <button
                className="bg-coffee-green hover:bg-coffee-brown text-white p-2 rounded-full shadow-md transition-all transform hover:scale-105"
                onClick={() => {
                  setUpdateUserDetails(el);
                  setOpenUpdateRole(true);
                }}
              >
                <MdOutlineModeEditOutline />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-coffee-brown mb-4">User Management</h2>
      
      {/* Hiển thị bảng tương ứng với role của người dùng */}
      {user?.role === ROLE.ADMIN && (
        <>
          <h3 className="text-xl font-medium text-coffee-brown mb-2">Admins</h3>
          {renderUserTable(adminUsers)}
          
          <h3 className="text-xl font-medium text-coffee-brown mt-6 mb-2">General Users</h3>
          {renderUserTable(generalUsers)}
          
          <h3 className="text-xl font-medium text-coffee-brown mt-6 mb-2">Employees</h3>
          {renderUserTable(employeeUsers)}
        </>
      )}

      {user?.role === ROLE.GENERAL && (
        <>
          <h3 className="text-xl font-medium text-coffee-brown mb-2">General Users</h3>
          {renderUserTable(generalUsers)}
        </>
      )}

      {user?.role === ROLE.EMPLOYEE && (
        <>
          <h3 className="text-xl font-medium text-coffee-brown mb-2">Employees</h3>
          {renderUserTable(employeeUsers)}
        </>
      )}

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          phone={updateUserDetails.phone}
          address={updateUserDetails.address}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUser;
