import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoReorderFour } from "react-icons/io5";
import { TiUser } from "react-icons/ti";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";
import { FaUsers, FaBoxOpen, FaSignOutAlt } from "react-icons/fa";
import { FaTablets } from "react-icons/fa";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { MdDashboard } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { HiInformationCircle } from "react-icons/hi";
import { FaBuysellads } from "react-icons/fa6";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user); // Them "? " neu ko co san user thi se thanh loi~
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const dataApi = await fetchData.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      //window.location.reload();
      dispatch(setUserDetails(null));
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-130px)] md:flex hidden">
      {/* Sidebar */}
      <aside className="bg-coffee-beige min-h-full w-full max-w-xs customShadow">
        {/* User Info */}
        <div className="h-36 flex justify-center items-center bg-coffee-brown text-white">
          <Link
            to="admin-info"
            className="text-7xl relative flex justify-center flex-col items-center"
          >
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user?.name}
                className="w-20 h-20 rounded-full border-4 border-white"
              />
            ) : (
              <TiUser />
            )}
            <p className="text-lg m-1 capitalize bg-coffee-dark text-white p-1 rounded-md">
              {user?.name}
            </p>
            <p className="text-sm italic text-coffee-beige">{user?.role}</p>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="mt-4">
          <nav className="grid gap-4">
            <Link
              to="dashboard"
              className="flex items-center gap-2 px-4 py-3 hover:bg-coffee-green text-coffee-dark"
            >
              <MdDashboard className="text-xl" /> Dashboard
            </Link>
            <Link
              to="all-users"
              className="flex items-center border-t-2 gap-2 px-4 py-3 hover:bg-coffee-green text-coffee-dark"
            >
              <FaUsers className="text-xl" /> Users
            </Link>
            <Link
              to="all-products"
              className="flex items-center gap-2 px-4 py-3 hover:bg-coffee-green text-coffee-dark"
            >
              <FaBoxOpen className="text-xl" /> Products
            </Link>
            <Link
              to="all-tables"
              className="flex items-center gap-2 px-4 py-3 hover:bg-coffee-green text-coffee-dark"
            >
              <FaTablets className="text-xl" /> Tables
            </Link>
            <Link
              to="all-orders"
              className="flex items-center gap-2 px-4 py-3 hover:bg-coffee-green text-coffee-dark"
            >
              <IoReorderFour className="text-xl" /> Orders
            </Link>
            <Link
              to="all-booking"
              className="flex items-center gap-2 px-4 py-3 hover:bg-coffee-green text-coffee-dark"
            >
              <TbBrandBooking className="text-xl" /> Booking
            </Link>
            <Link
              to="admin-send-message"
              className="flex items-center gap-2 px-4 py-3 hover:bg-coffee-green text-coffee-dark"
            >
              <FaBuysellads className="text-xl" /> Thông báo
            </Link>
            <Link
              to="admin-info"
              className="flex items-center gap-2 px-4 py-3 hover:bg-coffee-green text-coffee-dark"
            >
              <HiInformationCircle className="text-xl" /> Thông tin tài khoản
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="mt-auto mb-4 flex justify-center">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-coffee-brown text-white hover:bg-coffee-dark rounded-md"
          >
            <FaSignOutAlt className="text-xl" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full h-full p-4 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
