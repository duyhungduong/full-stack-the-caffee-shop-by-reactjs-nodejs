import React from "react";
import { useSelector } from "react-redux";
import scrollTop from "../../helper/scrollTop";
import { Link, useNavigate } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import { toast } from "react-toastify";
import { FaSadCry } from "react-icons/fa";

const VerticalTableCard = ({ loading, data = [] }) => {
  const loadingList = new Array(20).fill(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);

  const handleClickUnBooking = () => {
    toast.error("Bàn đã được đặt. Quý khách vui lòng chọn bàn khác!!!");
  };
  const handleBooking = (product) => {
    if (!user?._id) {
      toast.error("Vui lòng đăng nhập trước khi Booking");
      navigate("/login");
    } else {
      navigate("/booking", { state: { tableData: product } }); // Chuyển hướng đến trang Booking với dữ liệu
    }
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading
        ? loadingList.map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg shadow-md p-4 animate-pulse"
            >
              <div className="bg-slate-200 h-48 w-full mb-4"></div>
              <div className="h-4 bg-gray-400 rounded mb-2"></div>
              <div className="h-4 bg-gray-400 rounded mb-2"></div>
              <div className="h-6 bg-gray-400 rounded"></div>
            </div>
          ))
        : data.map((product, index) =>
            product?.isAvailableTable ? (
              <Link
                to={"/table/" + product?._id}
                key={product._id}
                className="bg-white dark:bg-gray-100  dark:border  rounded-lg shadow-md transition-transform transform hover:scale-105 opacity-0 animate-fadeIn delay-75"
                onClick={scrollTop}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="bg-coffee-background h-72 p-3 flex justify-center items-center">
                  <img
                    className="object-cover h-full hover:scale-110 transition-all"
                    src={product.tableImage[0]}
                    alt={product.tableNumber}
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-medium text-base text-black line-clamp-1">
                    Bàn số {product?.tableNumber}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product?.tableType}
                  </p>
                  <div className="flex gap-2 mt-1">
                    <p className="text-gray-500 font-semibold">
                      {product?.tableArea}
                    </p>
                    <p className="text-green-600 font-medium">
                      {product?.tableStatus}
                    </p>
                  </div>
                  {
                    <button
                      className="mt-2 text-sm flex text-coffee-dark items-center gap-2 px-3 py-1 bg-gradient-to-r from-coffee-beige to-coffee-light  rounded-lg transition-all hover:from-pastel-teal hover:to-pastel-blue-dark"
                      onClick={(e) => {
                      e.preventDefault(); // Prevents Link navigation when clicking the button
                      handleBooking(product);
                    }}
                    >
                      <MdFavorite /> Booking
                    </button>
                  }
                </div>
              </Link>
            ) : (
              <div
                key={product._id}
                className="bg-red-200 rounded-lg shadow-md transition-transform transform hover:scale-105 opacity-0 animate-fadeIn delay-75 cursor-not-allowed"
                onClick={handleClickUnBooking}
              >
                <div className="bg-red-400 h-72 p-3 flex justify-center items-center">
                  <img
                    className="object-cover h-full hover:scale-110 transition-all"
                    src={product.tableImage[0]}
                    alt={product.tableNumber}
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-medium text-base text-black line-clamp-1">
                    Bàn số {product?.tableNumber}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product?.tableType}
                  </p>
                  <div className="flex gap-2 mt-1">
                    <p className="text-gray-500 font-semibold">
                      {product?.tableArea}
                    </p>
                    <p className="text-green-600 font-medium">
                      {product?.tableStatus}
                    </p>
                  </div>
                  {
                    <button
                      className="mt-2 text-sm flex text-coffee-dark items-center gap-2 px-3 py-1 bg-gradient-to-r from-coffee-beige to-coffee-light  rounded-lg transition-all hover:from-pastel-pink hover:to-pastel-purple cursor-not-allowed"
                      onClick={scrollTop}
                    >
                      <FaSadCry /> Bàn không khả dụng
                    </button>
                  }
                </div>
              </div>
            )
          )}
    </div>
  );
};

export default VerticalTableCard;
