import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";

const AreaTableList = () => {
  const [areaTable, setAreaTable] = useState([]);
  const [loading, setLoading] = useState(false);

  const areaTableLoading = new Array(20).fill(null);

  const fetchAreaTable = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.areaTable.url);
    const dataResponse = await response.json();

    // Tạo độ trễ trước khi hoàn thành việc tải dữ liệu
    setTimeout(() => {
      setLoading(false); // Kết thúc loading sau khi hết thời gian trì hoãn
      setAreaTable(dataResponse.data); // Lưu dữ liệu
    }, 250); // Trì hoãn 2 giây (2000 milliseconds)
  };

  useEffect(() => {
    fetchAreaTable();
  }, []);
  return (
    <div className="container mx-auto p-4 m-2">
      <div className="flex items-center gap-4 justify-center overflow-scroll scrollbar-coffee p-4">
        {loading
          ? areaTableLoading.map((el, index) => {
              return (
                <div
                  key={"areaTableLoading" + index}
                  className="bg-gray-200 p-6 rounded-lg shadow-md flex flex-col justify-between items-center skeleton-loading"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 text-center flex items-center justify-center">
                  <div className="w-20 h-20 object-cover rounded-full mx-auto border-4"></div> 
                  </div>
                  <p className="text-center mt-2 bg-gray-300 w-12 h-4 mx-auto rounded"></p>
                </div>
              );
            })
          : areaTable.map((table, index) => {
              return (
                <Link
                  key={table?.tableArea + index}
                  to={"/tableArea-table/" + table?.tableArea}
                  className="cursor-pointer bg-coffee-beige p-6 rounded-lg shadow-md transition-all hover:shadow-lg flex flex-col justify-center items-center"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 text-center flex items-center justify-center">
                    <img
                      className="w-20 h-20 object-cover rounded-full mx-auto border-4 border-coffee-brown transition-all hover:scale-105"
                      src={table?.tableImage[0]}
                      alt={table?.tableArea}
                    />
                  </div>
                  <p className="text-center mt-2 text-sm md:text-base capitalize">
                    {table?.tableArea}
                  </p>
                  {/* <p className="text-center text-sm md:text-base capitalize">
                    {displayVNCurrency(product?.price)}
                  </p> */}
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default AreaTableList;
