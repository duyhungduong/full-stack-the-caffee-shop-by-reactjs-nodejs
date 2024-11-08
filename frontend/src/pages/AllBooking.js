import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import Switch from "react-switch";
import { WiStars } from "react-icons/wi";
import { MdEventBusy } from "react-icons/md";
import { toast } from "react-toastify";
import { FaRegMessage } from "react-icons/fa6";
import SendMessage from "../components/SendMessage";
import { useSelector } from "react-redux";

const AllBooking = () => {
  const [data, setData] = useState([]);

  const user = useSelector((state) => state?.user?.user);
  // Lưu trạng thái clean cho từng item
  const [openUpdateRole, setOpenUpdateRole] = useState({});
  const handleChangeSend = (tableId, nextChecked) => {
    setOpenUpdateRole((prevState) => ({
      ...prevState,
      [tableId]: nextChecked,
    }));
  }

  const [formData, setFormData] = useState({
    sender: "", // Tham chiếu đến ObjectId của sender
    receiver: "", // Tham chiếu đến ObjectId của receiver
    message: "Hello!",
    read: false,
  });

  const changeStatusTable = async (tableId, tableStatus, isAvailableTable) => {
    const fetchResponse = await fetch(SummaryApi.changeStatusTable.url, {
      method: SummaryApi.changeStatusTable.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        tableId: tableId,
        tableStatus: tableStatus,
        isAvailableTable: isAvailableTable,
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

  const handleChange = async (tableId, nextChecked) => {
    if (nextChecked) {
      // alert("Dung", tableId) //true, "Đang trống"
      changeStatusTable(tableId, "Đang trống", true);
      await fetchBookingDetails();
    } else {
      //alert("Sai") // false, "Da dat" "Đã đặt"
      changeStatusTable(tableId, "Đã đặt", false);
      await fetchBookingDetails();
    }
  };

  const fetchBookingDetails = async () => {
    const response = await fetch(SummaryApi.allBooking.url, {
      method: SummaryApi.allBooking.method,
      credentials: "include",
    });

    const responseData = await response.json();

    setData(responseData.data);
    console.log("booking list", responseData);
  };

  useEffect(() => {
    fetchBookingDetails();
  }, []);
  return (
    <div className="container mx-auto py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-coffee-brown">Your Bookings</h1>
        <p className="text-gray-600 mt-2">
          Below is a list of all your table bookings.
        </p>
      </div>

      {/* No Orders Available */}
      {!data[0] && (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 text-lg">No Orders Available</p>
        </div>
      )}

      {/* Booking List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item, index) => (
          <div
            key={item.userId + index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={item?.tableId?.tableImage[0]}
              className="w-full h-48 object-cover"
              alt="Table"
            />
            <div className="p-4">
              {/* Table Information */}
              <h2 className="font-semibold text-xl text-gray-800 mb-2">
                {item.tableId?.tableType}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                Bàn số {item?.tableId?.tableNumber} -{" "}
                {item?.tableId?.description}
              </p>

              {/* Booking Time */}
              <div className="mb-4">
                <div className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Arrival: </span>
                  {moment(item?.arrivalTime).format("lll")}
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">End: </span>
                  {item.endTime ? moment(item?.endTime).format("lll") : "N/A"}
                </div>
              </div>

              {/* Notes */}
              {item.notes && (
                <div className="bg-gray-100 p-2 rounded-md text-sm text-gray-700">
                  <span className="font-medium">Notes:</span> {item.notes}
                </div>
              )}
              <div className="flex items-center justify-between p-2 mt-4">
                <span className="text-gray-700">Trạng thái : </span>
                <div className="flex items-center gap-2">
                  {item?.tableId?.isAvailableTable ? (
                    <p className="flex items-center">
                      <WiStars className="text-3xl text-[#00d084]" />
                      Đã trả bàn
                    </p>
                  ) : (
                    <p className="flex items-center">
                      <MdEventBusy className="text-2xl text-[#d9534f]" />
                      Đang được sử dụng
                    </p>
                  )}
                </div>
                <Switch
                  onChange={(checked) =>
                    handleChange(item?.tableId?._id, checked)
                  }
                  checked={item?.tableId?.isAvailableTable}
                  onColor="#00d084"
                  offColor="#d9534f"

                  // checkedIcon={<FaRegLightbulb  />}
                  // uncheckedIcon={<FaBroom  />}
                />
              </div>
              <div className="flex items-center justify-between p-2 mt-4">
                <span className="text-gray-700">Liên hệ người đặt : </span>
                <div className="flex items-center gap-2 text-sm">
                  {item?.userId?.email}
                </div>
                <div className="hover:bg-slate-300 hover:shadow-md  w-5 h-5 flex justify-center items-center rounded-full">
                  <FaRegMessage
                    className="hover:scale-105 transition-all transform"
                    onClick={() => {
                      handleChangeSend(item?.tableId?._id,true);
                    }}
                  />
                </div>
              </div>
            </div>
            {openUpdateRole[item?.tableId?._id] && (
              <SendMessage
                onClose={() => setOpenUpdateRole(false)}
                sender={user?._id}
                receiver={item?.userId?._id}
                callFunc={fetchBookingDetails}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooking;
