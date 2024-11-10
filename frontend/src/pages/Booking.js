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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
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
          <h3 className="text-xl font-bold text-gray-800 mb-2">Address:</h3>
          <img
            src={image0}
            alt="Location map"
            className="w-full h-80 object-cover rounded-lg mb-4"
          />
        </div>

        <div>
          <form
            className="bg-gray-100 p-6 rounded-lg shadow-lg"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                htmlFor="tableId"
                className="text-sm font-medium text-gray-700 mb-2 hidden"
              >
                Table ID
              </label>
              <input
                type="text"
                id="tableId"
                name="tableId"
                value={tableData?._id}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed hidden"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="userId"
                className="hidden text-sm font-medium text-gray-700 mb-2"
              >
                User ID
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={user?._id}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed hidden"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thông tin khách Hàng
              </label>
              <div className="w-full p-3 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed">
                {user?.name} - {user?.email} - {user?.phone}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thông tin bàn
              </label>
              <div className="w-full p-3 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed">
                Bàn số {tableData?.tableNumber} - {tableData?.tableArea} -{" "}
                {tableData?.tableType}
              </div>
            </div>

            <div className="mb-4">
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
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
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
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <img
                src={tableData?.tableImage[0]}
                alt="Table"
                className="w-full h-80 object-cover rounded-lg mb-4"
              />
            </div>

            <div className="mb-4">
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
                className="w-full h-32 p-3 border border-gray-300 resize-none rounded-md"
                placeholder="Add any additional notes"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-coffee-brown text-white py-3 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
