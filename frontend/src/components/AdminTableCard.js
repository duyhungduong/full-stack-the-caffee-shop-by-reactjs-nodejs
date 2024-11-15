import React, { useState } from "react";
//import displayVNCurrency from '../helper/displayCurrency'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditTable from "./AdminEditTable";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import Switch from "react-switch";
import { FaBroom, FaRegLightbulb } from "react-icons/fa6";

const AdminTableCard = ({ data, fetchdata }) => {
  const [editTable, setEditTable] = useState(false);

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
      await fetchdata();
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
      // await fetchBookingDetails();
    } else {
      //alert("Sai") // false, "Da dat" "Đã đặt"
      changeStatusTable(tableId, "Đang sử dụng", false);
      // await fetchBookingDetails();
    }
  };

  return (
    <div>
      {
        data?.isAvailableTable ? (<div className="bg-coffee-beige p-6 rounded-lg shadow-md transition-all hover:shadow-lg w-64 h-80 flex flex-col justify-between">
        <div className="text-center">
          <img
            src={data?.tableImage[0]}
            alt={data.tableNumber}
            className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-coffee-brown transition-all hover:scale-105"
          />
          <h1 className="mt-4 text-lg font-semibold text-coffee-dark">
            {" "}
            {data.tableArea} - Bàn số {data.tableNumber}
          </h1>

          <div className="mt-2">
            <p className="text-coffee-green font-semibold text-xl">
              {data.tableType}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div
            className="w-10 h-10 mt-4 mr-2 flex items-center justify-center rounded-full bg-coffee-brown text-white transition-all hover:bg-coffee-dark cursor-pointer"
            onClick={() => setEditTable(true)}
          >
            <MdModeEditOutline className="w-6 h-6" />
          </div>
          <Switch
            className="mt-4"
            onChange={(checked) => handleChange(data?._id, checked)}
            checked={data?.isAvailableTable}
            onColor="#00d084"
            offColor="#d9534f"
            
          />
        </div>

        {editTable && (
          <AdminEditTable
            tableData={data}
            onClose={() => setEditTable(false)}
            fetchdata={fetchdata}
          />
        )}
      </div>) : (<div className="bg-orange-300 p-6 rounded-lg shadow-md transition-all hover:shadow-lg w-64 h-80 flex flex-col justify-between">
        <div className="text-center">
          <img
            src={data?.tableImage[0]}
            alt={data.tableNumber}
            className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-orange-600 transition-all hover:scale-105"
          />
          <h1 className="mt-4 text-lg font-semibold text-coffee-dark">
            {" "}
            {data.tableArea} - Bàn số {data.tableNumber}
          </h1>

          <div className="mt-2">
            <p className="text-coffee-green font-semibold text-xl">
              {data.tableType}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div
            className="w-10 h-10 mt-4 mr-2 flex items-center justify-center rounded-full bg-coffee-brown text-white transition-all hover:bg-coffee-dark cursor-pointer"
            onClick={() => setEditTable(true)}
          >
            <MdModeEditOutline className="w-6 h-6" />
          </div>
          <Switch
            className="mt-4"
            onChange={(checked) => handleChange(data?._id, checked)}
            checked={data?.isAvailableTable}
            onColor="#00d084"
            offColor="#d9534f"
            
          />
        </div>

        {editTable && (
          <AdminEditTable
            tableData={data}
            onClose={() => setEditTable(false)}
            fetchdata={fetchdata}
          />
        )}
      </div>)
      }
      
    </div>
  );
};

export default AdminTableCard;
