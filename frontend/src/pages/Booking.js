import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import image0 from "../assest/mapdemo.png";
import { useNavigate, useLocation } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import scrollTop from "../helper/scrollTop";

const Booking = () => {
  const [formData, setFormData] = useState({
    arrivalTime: "",
    endTime: "",
    notes: "",
  });

  const location = useLocation();
  const { tableData } = location.state || {};
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Nếu không có tableData, chuyển hướng người dùng về trang chủ và thông báo lỗi
    scrollTop();
    if (!tableData) {
      toast.error("Vui lòng chọn bàn trước khi vào trang này!!!");
      navigate("/");
    }
  }, [tableData, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    const arrivalTimeMillis = Date.parse(formData.arrivalTime);
    const endTimeMillis = Date.parse(formData.endTime);

    // Kiểm tra nếu endTime được điền và khoảng cách thời gian vượt quá 12 tiếng
    if (
      formData.endTime &&
      endTimeMillis - arrivalTimeMillis > 12 * 60 * 60 * 1000
    ) {
      toast.error(
        "Bạn không được chọn thời quan rời đi quá thời gian đến quá 12 tiếng"
      );
      return;
    }

    const dataToSubmit = {
      ...formData,
      tableId: tableData?._id,
      userId: user?._id,
    };

    const dataResponse = await fetch(SummaryApi.bookingTable.url, {
      method: SummaryApi.bookingTable.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dataToSubmit),
    });
    const dataJson = await dataResponse.json();

    if (dataJson.success) {
      toast.success(dataJson.message);
      await changeStatusTable();
      navigate("/booking-list");
    } else if (dataJson.error) {
      toast.error(dataJson.message);
    }
  };

  const changeStatusTable = async () => {
    const fetchResponse = await fetch(SummaryApi.changeStatusTable.url, {
      method: SummaryApi.changeStatusTable.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        tableId: tableData._id,
        tableStatus: "Đã đặt",
        isAvailableTable: false,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      // onClose();
      // callFunc();
    }
    if (responseData.error) {
      toast.error(responseData.message);
    }

    console.log("changeStatusTable updated: ", responseData);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-coffee-brown">Booking</h2>
        <p className="text-gray-600 mt-2">
          Please fill out the form below to booking a table.
        </p>
        <p className="text-gray-800 mt-2">
          E-mail:{" "}
          <a
            href="mailto:hungb2103500@student.ctu.edu.vn"
            className="text-blue-600"
          >
            hungb2103500@student.ctu.edu.vn
          </a>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">
        {/* Phần bên trái: Google Maps và thông tin địa chỉ */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-3xl font-bold text-coffee-brown mb-4">
              Booking
            </h2>
            <p className="text-gray-600">
              Please fill out the form below to book a table.
            </p>
            <p className="text-gray-800 mt-2">
              E-mail contact :{" "}
              <a
                href="mailto:hungb2103500@student.ctu.edu.vn"
                className="text-blue-600 underline"
              >
                hungb2103500@student.ctu.edu.vn
              </a>
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6">
              Address:
            </h3>
            <img
              src={image0}
              alt="Location map"
              className="w-full h-72 object-cover rounded-lg mt-4 shadow-md"
            />

            {/* Thiết kế iframe với border radius và shadow */}
            <div className="mt-6">
              <iframe
                src="https://maps.google.com/maps?width=1610&amp;height=510&amp;hl=en&amp;q=Trường Đại Học Cần Thơ&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                className="w-full h-80 rounded-lg shadow-lg"
                frameBorder="0"
                allowFullScreen
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Phần bên phải: Form đặt bàn */}
        <div className="bg-gray-100 p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-coffee-brown mb-6 text-center">
              Book a Table
            </h2>

            {/* Thông tin khách hàng */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thông tin khách hàng
              </label>
              <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200">
                {user?.name} - {user?.email} - {user?.phone}
              </div>
            </div>

            {/* Thông tin bàn */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thông tin bàn
              </label>
              <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200">
                Bàn số {tableData?.tableNumber} - {tableData?.tableArea} -{" "}
                {tableData?.tableType}
              </div>
            </div>

            {/* Thời gian đến */}
            <div className="mb-6">
              <label
                htmlFor="arrivalTime"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Arrival Time
              </label>
              <input
                type="datetime-local"
                id="arrivalTime"
                name="arrivalTime"
                value={formData.arrivalTime}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-brown"
                required
              />
            </div>

            {/* Thời gian kết thúc */}
            <div className="mb-6">
              <label
                htmlFor="endTime"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                End Time (optional)
              </label>
              <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-brown"
              />
            </div>

            {/* Hình ảnh bàn */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Table Image
              </label>
              <img
                src={tableData?.tableImage[0]}
                alt="Table"
                className="w-full h-60 object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Ghi chú */}
            <div className="mb-6">
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Notes (optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-brown resize-none"
                placeholder="Add any additional notes"
              ></textarea>
            </div>

            {/* Nút Submit */}
            <button
              type="submit"
              className="w-full bg-coffee-brown text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
