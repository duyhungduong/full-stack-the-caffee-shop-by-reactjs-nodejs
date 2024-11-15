import { HiFilter } from "react-icons/hi";
import { useEffect, useState } from "react";
import axios from "axios";
import tableTypeE from "../../helper/tableType";
import tableAreaA from "../../helper/tableArea";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import TypingEffect from "../../helper/TypingEffect";

function SearchTableHorizontal(props) {
  const [tables, setTables] = useState([]);
  const [formData, setFormData] = useState({
    tableArea: "",
    tableType: "",
    arrivalTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const searchHandle = async () => {
    try {
      const response = await axios.post(SummaryApi.getSearchTable.url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data.data;
      if(data.length === 0){
        toast.error("Không có kết quả tìm kiếm bàn phù hợp")
      }
      console.log("Filtered tables:", data);
      props.sendDataDate(data); // Gửi dữ liệu bàn về component cha (nếu cần)
    } catch (error) {
      console.error("Error fetching available tables:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-[#f7e7ce] rounded-md">
      <div className="mb-4 md:mb-6 text-center">
        <h1 className="text-lg md:text-xl text-[#3b2c35] font-semibold">
          Quán Cà Phê CAFFEE
        </h1>
        
        <TypingEffect  text="Hello, Welcome to Our Website!" speed={100}/>
        <h2 className="text-2xl md:text-3xl text-[#6f4e37] font-bold">
          Tìm kiếm bàn phù hợp
        </h2>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 bg-white  dark:bg-gray-100  p-4 sm:p-6 rounded-md shadow-lg">

        <div className="flex flex-col w-full md:w-1/5">
          <label htmlFor="tableType" className="text-[#3b2c35] font-medium mb-1">
            Loại bàn
          </label>
          <select
            id="tableType"
            name="tableType"
            onChange={handleChange}
            className="border bg-white  dark:bg-gray-100  border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#6f4e37]"
          >
            <option value="">Chọn loại bàn</option>
            {tableTypeE.map((el, index) => (
              <option key={el.value + index} value={el.value}>
                {el.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-full md:w-1/5">
          <label htmlFor="tableArea" className="text-[#3b2c35] font-medium mb-1">
            Khu vực bàn
          </label>
          <select
            id="tableArea"
            name="tableArea"
            onChange={handleChange}
            className="border bg-white  dark:bg-gray-100  border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#6f4e37]"
          >
            <option value="">Tất cả khu vực</option>
            {tableAreaA.map((el, index) => (
              <option key={el.value + index} value={el.value}>
                {el.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-full md:w-1/5">
          <label htmlFor="arrivalTime" className="text-[#3b2c35] font-medium mb-1">
            Thời gian đến quán
          </label>
          <input
            id="arrivalTime"
            name="arrivalTime"
            type="datetime-local"
            value={formData.arrivalTime}
            onChange={handleChange}
            className="border bg-white  dark:bg-gray-100  border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#6f4e37]"
          />
        </div>

        <div className="flex flex-col w-full md:w-1/5">
          <label htmlFor="endTime" className="text-[#3b2c35] font-medium mb-1">
            Thời gian ra về dự tính
          </label>
          <input
            id="endTime"
            name="endTime"
            type="datetime-local"
            value={formData.endTime}
            onChange={handleChange}
            className="border bg-white  dark:bg-gray-100  border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#6f4e37]"
          />
        </div>

        <div className="w-full md:w-auto">
            <label htmlFor="" className="text-white dark:text-gray-100">Tìm kiếm</label>
          <button
            onClick={searchHandle}
            className="flex items-center justify-center bg-[#6f4e37] text-white font-bold py-2 px-4 rounded-md w-full md:w-auto hover:bg-[#5a392e] hover:scale-105 hover:shadow-lg transition duration-200"
          >
            <HiFilter className="mr-2" />
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchTableHorizontal;
