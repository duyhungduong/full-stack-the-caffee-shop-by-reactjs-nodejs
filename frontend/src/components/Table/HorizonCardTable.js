import React, { useEffect, useRef, useState, useCallback } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { PiCursorClickDuotone } from "react-icons/pi";
import { CgUnavailable } from "react-icons/cg";
import fetchTypeWiseTable from "../../helper/Table/fetchTypeWiseTable";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import scrollTop from "../../helper/scrollTop";

const HorizonCardTable = ({ tableType, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollElement = useRef();
  const loadingList = new Array(20).fill(null);
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  // Sử dụng useCallback để tối ưu hàm fetchData
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const categoryProduct = await fetchTypeWiseTable(tableType);
      setData(categoryProduct?.data || []); // Nếu không có dữ liệu, set mảng rỗng
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [tableType]);

  useEffect(() => {
    fetchData(); // Gọi hàm fetchData khi component mount
  }, [fetchData]); // Thêm fetchData vào dependency array

  const scrollRight = () => {
    scrollElement.current.scrollBy({
      left: scrollElement.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    scrollElement.current.scrollBy({
      left: -scrollElement.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const handleBooking = (table) => {
    if (!user?._id) {
      toast.error("Vui lòng đăng nhập trước khi Booking");
      navigate("/login");
    } else {
      
      navigate("/booking", { state: { tableData: table } }); // Chuyển hướng đến trang Booking với dữ liệu
      scrollTop();
    }
  };

  return (
    <div className="container mx-auto px-2 py-4 relative">
      <h2 className="text-xl font-semibold text-coffee-dark py-4">{heading}</h2>
      <div className="relative">
        {/* Nút cuộn trái */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl bg-coffee-light shadow-lg rounded-full p-3 z-20 transition-all hover:scale-110 hover:bg-coffee-brown text-white"
          style={{ pointerEvents: "auto" }} // Đảm bảo nút hoạt động mà không bị đè
        >
          <FaAngleLeft />
        </button>

        {/* Nút cuộn phải */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl bg-coffee-light shadow-lg rounded-full p-3 z-20 transition-all hover:scale-110 hover:bg-coffee-brown text-white"
          style={{ pointerEvents: "auto" }} // Đảm bảo nút hoạt động mà không bị đè
        >
          <FaAngleRight />
        </button>

        <div
          className="flex items-center gap-4 md:gap-6 overflow-x-auto scrollbar-none px-16"
          ref={scrollElement}
          style={{ scrollBehavior: "smooth" }}
        >
          {loading
            ? loadingList.map((_, index) => (
                <div
                  key={"loadingProduct" + index}
                  className="bg-gray-200 p-6 rounded-lg shadow-md flex w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 skeleton-loading"
                >
                  <div className="h-full p-3 min-w-[120px] md:min-w-[145px] bg-gray-300"></div>
                  <div className="mx-3">
                    <p className="bg-gray-300 w-32 h-4 mb-2 rounded"></p>
                    <p className="bg-gray-300 w-20 h-4 mb-2 rounded"></p>
                    <p className="bg-gray-300 w-24 h-4 mb-2 rounded"></p>
                  </div>
                </div>
              ))
            : data.map((table, index) =>
                table?.isAvailableTable ? (
                  <Link
                    to={"table/" + table?._id}
                    className="relative w-full min-w-[360px] md:min-w-[400px] max-w-[360px] md:max-w-[400px] h-48 bg-white  dark:border  dark:bg-gray-100  rounded-lg hover:shadow-md shadow-coffee-dark flex transition-transform duration-300 transform hover:scale-105 hover:z-20 m-2"
                    style={{ overflow: "visible", zIndex: 1 }}
                    key={
                      index + table?.tableNumber + table?.tableType + table?._id
                    }
                  >
                    <div className="bg-coffee-background hover:bg-gradient-to-r hover:from-coffee-background hover:to-coffee-light h-full p-3 min-w-[120px] md:min-w-[145px] rounded-l-lg flex items-center justify-center">
                      {table?.tableImage?.[0] && (
                        <img
                          className="object-cover  h-full w-full rounded-md transition-transform hover:scale-110"
                          src={table.tableImage[0]}
                          alt={table?.tableNumber}
                          key={
                            index +
                            table?.tableNumber +
                            table?.tableType +
                            table?._id
                          }
                        />
                      )}
                    </div>
                    <div className="p-4 grid">
                      <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                        Bàn số {table?.tableNumber}
                      </h2>
                      <p className="capitalize text-slate-500 text-sm md:text-base">
                        {table?.tableType}
                      </p>
                      <div className="flex gap-1">
                        <p className="text-[#00d084] text-xs md:text-base font-medium">
                          {table?.tableStatus}
                        </p>
                        <p className="text-slate-500 text-xs md:text-base font-medium">
                          {table?.tableArea}
                        </p>
                      </div>
                      <button
                        to={"table/" + table?._id}
                        className="text-sm flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-coffee-beige to-coffee-light text-coffee-dark hover:from-pastel-teal hover:to-pastel-blue-dark rounded-lg"
                        onClick={(e) => {
                          e.preventDefault(); // Prevents Link navigation when clicking the button
                          handleBooking(table);
                        }}
                      >
                        <PiCursorClickDuotone /> Booking
                      </button>
                    </div>
                  </Link>
                ) : (
                  <div
                    // to={"product/" + table?._id}
                    className="relative w-full min-w-[380px] md:min-w-[420px] max-w-[380px] md:max-w-[420px] h-48 bg-red-200 rounded-xl shadow-lg flex transition-transform duration-300 transform hover:scale-105 hover:z-20 m-2 cursor-not-allowed" // Sản phẩm nhỏ hơn một chút khi rê chuột vào
                    style={{ overflow: "visible", zIndex: 1 }}
                    key={
                      index + table?.tableNumber + table?.tableType + table?._id
                    }
                  >
                    <div className="bg-red-100 h-full p-3 min-w-[140px] md:min-w-[165px] flex items-center justify-center">
                      {table?.tableImage?.[0] && (
                        <img
                          className="object-scale-down h-full w-full  transition-transform hover:scale-110"
                          src={table.tableImage[0]}
                          alt={table?.tableNumber}
                          key={
                            index +
                            table?.tableNumber +
                            table?.tableType +
                            table?._id
                          }
                        />
                      )}
                    </div>
                    <div className="p-4 grid gap-2">
                      <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                        Bàn số {table?.tableNumber}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {table?.tableType}
                      </p>
                      <div className="flex gap-2">
                        <p className="text-red-600 font-medium">
                          {table?.tableStatus}
                        </p>
                        <p className="text-slate-500 font-medium">
                          {table?.tableArea}
                        </p>
                      </div>
                      <div className=" text-xs md:text-sm flex items-center cursor-not-allowed gap-2 px-3 py-1 bg-gradient-to-r from-coffee-beige to-coffee-light text-coffee-dark hover:from-pastel-pink hover:to-pastel-purple rounded-lg">
                        <CgUnavailable /> Bàn không khả dụng
                      </div>
                    </div>
                  </div>
                )
              )}
        </div>
      </div>
    </div>
  );
};

export default HorizonCardTable;
