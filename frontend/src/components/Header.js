import React, { useContext, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { TiUser } from "react-icons/ti";
import { TiCoffee } from "react-icons/ti";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import caffee from "../assest/logocaffee.png";
import ROLE from "../common/role";
import Context from "../context";
import { MdFavorite } from "react-icons/md";
import { FaBell } from "react-icons/fa6";
import { TbBellRingingFilled } from "react-icons/tb";
import {
  FaUser,
  FaShoppingCart,
  FaConciergeBell,
  FaHeart,
  FaSignOutAlt,
  FaUserCog,
} from "react-icons/fa";
import { BsFillPeopleFill, BsFillFileEarmarkTextFill } from "react-icons/bs";
import { IoToday } from "react-icons/io5";

const Header = () => {
  const user = useSelector((state) => state?.user?.user); // Them "? " neu ko co san user thi se thanh loi~
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const [showMiniSearch, setShowMiniSearch] = useState(false);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const dataApi = await fetchData.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      setMenuDisplay(false);
      //window.location.reload();
      dispatch(setUserDetails(null));
      navigate("/");
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  // console.log("context ", context);
  const handleSearch = (e) => {
    const { value } = e.target;
    //setSearch(value)
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  const handleClickAvater = () => {
    toast.error("Vui lòng đăng nhập");
    navigate("/");
  };
  // console.log("context?.unreadMessage", context?.unreadMessage);
  const handleClicMiniSearch = () => {
    setShowMiniSearch(!showMiniSearch); // Hiển thị/Ẩn mini search khi click
  };
  return (
    <header className="h-20 shadow-sm bg-[#f6f4f3] fixed w-full z-20">
      <div className="h-full container mx-auto px-3 flex items-center justify-between">
        <div>
          <Link to={"/"} className="flex-shrink-0">
            {/*           
            <Logo w={90} h={50} /> */}
            <img
              src={caffee}
              alt=""
              className="w-auto h-auto max-w-[150px] max-h-[60px] object-contain"
            />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-3">
          <input
            type="text"
            placeholder="tìm kiếm"
            className="w-full outline-none bg-[#f6f4f3]"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-amber-900 flex items-center justify-center rounded-r-full text-white hover:scale-105 transition-all ">
            <HiSearch />
          </div>
        </div>

        <div className="flex items-center gap-4 ">
          <div className="relative flex justify-center">
            {/* Nút search icon cho màn hình nhỏ */}
            <div className="mr-3 relative flex md:hidden items-center">
              <div className="text-base min-w-[30px] h-7 bg-amber-900 flex items-center justify-center rounded-full text-white hover:scale-105  transition-all">
                <HiSearch onClick={handleClicMiniSearch} />
              </div>
              {/* MiniSearch xuất hiện bên trái icon */}
              {showMiniSearch && (
                <div className="absolute left-[-178px] sm:left-[-240px] top--1 w-[180px] sm:w-[245px] border rounded-lg shadow-md hover:shadow-xl bg-white p-2 flex items-center hover:scale-105 transition-all">
                  <input
                    type="text"
                    placeholder="Tìm kiếm"
                    className="w-full outline-none"
                    onChange={handleSearch}
                    value={search}
                  />
                </div>
              )}
            </div>

            <div
              className="text-3xl cursor-pointer relative flex justify-center"
              onClick={() => setMenuDisplay((preve) => !preve)}
            >
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div>
                  {user?._id ? (
                    <TiUser />
                  ) : (
                    <TiUser onClick={handleClickAvater} />
                  )}
                </div>
              )}
            </div>
            {user?._id && menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 right-0 w-52 md:w-72 h-fit p-3 shadow-lg rounded-lg">
                <nav className="grid gap-3">
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/dashboard"}
                      className="block w-full text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      <FaUserCog className="" /> Admin Panel
                      <span className="bg-amber-900 text-white w-2 h-2 text-xs font-bold mx-2 p-1 rounded-full">
                        8
                      </span>
                    </Link>
                  )}
                  {user?.role !== ROLE.GENERAL && (
                    <Link
                      to={"/order"}
                      className="block text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      <FaShoppingCart /> Order
                      <span className="bg-amber-900 text-white text-xs font-bold mx-2 p-1 rounded-full">
                        {context?.orderCount}
                      </span>
                    </Link>
                  )}
                  {user?.role !== ROLE.GENERAL && (
                    <Link
                    to={"/booking-today"}
                      className="block text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      <IoToday/> Booking Today
                      <span className="bg-amber-900 text-white text-xs font-bold mx-2 p-1 rounded-full">
                        {context?.bookingTodayCount}
                      </span>
                    </Link>
                  )

                  }

                  {user?._id && (
                    <Link
                      to={"/booking-list"}
                      className="block text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      <FaConciergeBell /> Booking List
                      <span className="bg-amber-900 text-white text-xs font-bold mx-2 p-1 rounded-full">
                        {context?.bookingCount}
                      </span>
                    </Link>
                  )}

                  {user?._id && (
                    <Link
                      to={"/noti"}
                      className="block text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      <FaBell /> New Message
                      <span className="bg-amber-900 text-white text-xs font-bold mx-2 p-1 rounded-full">
                        {context?.unreadMessage}
                      </span>
                    </Link>
                  )}

                  {user?._id && (
                    <Link
                      to={"/favorite"}
                      className="block text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      <FaHeart /> Favorite
                      <span className="bg-amber-900 text-white text-xs font-bold mx-2 p-1 rounded-full">
                        {context?.favoriteProductCount}
                      </span>
                    </Link>
                  )}

                  {user?._id && (
                    <Link
                      to={"/user-infomation"}
                      className="block text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      <BsFillPeopleFill /> Thông tin tài khoản
                    </Link>
                  )}

                  {user?._id && (
                    <Link
                      className="block text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt /> Đăng xuất
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          {user?._id && (
            <div className="text-3xl cursor-pointer relative ">
              {user?.role === ROLE.GENERAL ? (
                <div className="flex items-center gap-1 sm:gap-5">
                  {
                    <Link className=" hidden sm:flex" to={"/noti"}>
                      <span className="text-lg">
                        {context?.unreadMessage ? (
                          <TbBellRingingFilled
                            className="text-red-500 hover:text-red-800"
                            size={28}
                          />
                        ) : (
                          <FaBell size={28} />
                        )}
                      </span>
                      {context?.unreadMessage ? (
                        <div className="bg-red-500 text-white w-4 h-4 flex rounded-full p-1 items-center justify-center absolute -top-2 -left-3">
                          <p className="text-xs">{context?.unreadMessage}</p>
                        </div>
                      ) : (
                        <div>
                          <p></p>
                        </div>
                      )}
                    </Link>
                  }
                  <Link to={"/favorite"}>
                    <span className="">
                      <MdFavorite />
                    </span>
                    <div className="bg-amber-900 text-white w-4 h-4 flex rounded-full p-1 items-center justify-center absolute -top-2 -right-2">
                      <p className="text-xs">{context?.favoriteProductCount}</p>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-1 sm:gap-3">
                  {
                    <Link className=" hidden sm:flex" to={"/noti"}>
                      <span className="text-base md:text-lg">
                        {context?.unreadMessage ? (
                          <TbBellRingingFilled
                            className=" text-red-500 hover:text-red-800"
                            // size={20}
                          />
                        ) : (
                          <FaBell
                            className=""
                            // size={20}
                          />
                        )}
                      </span>
                      {context?.unreadMessage ? (
                        <div className="bg-amber-900 text-white w-2 h-2 sm:w-4 sm:h-4 flex rounded-full p-2 sm:p-2 items-center justify-center absolute -top-2 -left-3">
                          <p className="text-xs">{context?.unreadMessage}</p>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </Link>
                  }
                  <Link to={"/cart"}>
                    <span className="">
                      <TiCoffee />
                    </span>
                    <div className="bg-amber-900 text-white w-2 h-2 sm:w-4 sm:h-4 flex rounded-full p-2 sm:p-2 items-center justify-center absolute -top-2 -right-2">
                      <p className="text-xs">{context?.cartProductCount}</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          )}

          <div className="relative">
            {!user?._id && (
              <Link
                to={"/login"}
                className="text-sm py-2 sm:text-base mr-auto sm:mr-0 px-3 sm:px-4 sm:py-3 rounded-xl text-white bg-[#4bac4d] hover:bg-[#4bac4dc5] hover:scale-105 transition-all whitespace-nowrap"
              >
                Login
              </Link>
            )}
          </div>
          <div>
            {!user?._id && (
              <div>
                <Link
                  to={"/sign-up"}
                  className="hidden lg:flex px-2 py-2 rounded-full text-white bg-amber-900 hover:bg-amber-950 hover:scale-105 transition-all btnColor addBtnColor"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
