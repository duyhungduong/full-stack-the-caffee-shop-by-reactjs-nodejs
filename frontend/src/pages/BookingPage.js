import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";

const BookingPage = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getBooking.url, {
      method: SummaryApi.getBooking.method,
      credentials: "include",
    });

    const responseData = await response.json();

    setData(responseData.data);
    console.log("getBooking list", responseData);
  };

  useEffect(() => {
    fetchOrderDetails();
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
            className="bg-white dark:bg-gray-100  dark:border  rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
                Bàn số {item?.tableId?.tableNumber} - {item?.tableId?.description}
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
