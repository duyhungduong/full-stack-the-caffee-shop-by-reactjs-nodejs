import React, { useState } from "react";
//import displayVNCurrency from '../helper/displayCurrency'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditTable from "./AdminEditTable";

const AdminTableCard = ({ data, fetchdata }) => {
  const [editTable, setEditTable] = useState(false);
  return (
    <div className="bg-coffee-beige p-6 rounded-lg shadow-md transition-all hover:shadow-lg w-64 h-80 flex flex-col justify-between">
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

      <div
        className="w-10 h-10 mt-4 mx-auto flex items-center justify-center rounded-full bg-coffee-brown text-white transition-all hover:bg-coffee-dark cursor-pointer"
        onClick={() => setEditTable(true)}
      >
        <MdModeEditOutline className="w-6 h-6" />
      </div>

      {editTable && (
        <AdminEditTable
          tableData={data}
          onClose={() => setEditTable(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminTableCard;
