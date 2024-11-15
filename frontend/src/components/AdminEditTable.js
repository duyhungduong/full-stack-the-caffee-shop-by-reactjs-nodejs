import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../helper/uploadImage";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import tableNumbering from "../helper/tableNumber";
import tableAreaA from "../helper/tableArea";
import tableTypeE from "../helper/tableType";
import tableStatusS from '../helper/Table/tableStatus'
import { MdCloudUpload, MdDelete } from "react-icons/md";
import DisplayImage from "./DisplayImage";

const AdminEditTable = ({ onClose, tableData, fetchdata }) => {
  const [data, setData] = useState({
    ...tableData,
    tableNumber: tableData?.tableNumber,
    tableArea: tableData?.tableArea,
    tableType: tableData?.tableType,
    tableImage: tableData?.tableImage || [],
    description: tableData?.description,
    seatCount: tableData?.seatCount,
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadTable = async (e) => {
    const file = e.target.files[0];

    const uploadImageCloudinary = await uploadImage(file);

    setData((preve) => {
      return {
        ...preve,
        tableImage: [...preve.tableImage, uploadImageCloudinary.url],
      };
    });
  };


  const handleDeletetableImage = async (index) => {
    console.log("index", index);
    const newtableImage = [...data.tableImage];
    newtableImage.splice(index, 1);

    setData((preve) => {
      return {
        ...preve,
        tableImage: [...newtableImage],
      };
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.updateTable.url, {
      method: SummaryApi.updateTable.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchdata();
    }
    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  
  return (
    <div className="fixed w-full h-full  bg-slate-100 bg-opacity-30 top-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-1">
          <h2 className="font-bold text-lg ">Edit Product</h2>
          <div
            className="w-fit ml-auto text-xl hover:text-red-600"
            onClick={onClose}
          >
            <IoClose />
          </div>
        </div>
        <form
          action=""
          className="grid p-4 gap-1.5 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="tableNumber">Số thứ tự của bàn trong quán.</label>
          <select
            value={data.tableNumber}
            className="p-3 bg-slate-100 border rounded"
            name="tableNumber"
            id="tableNumber"
            onChange={handleOnChange}
          >
            <option value={""}>Chọn số thứ tự của bàn</option>
            {tableNumbering.map((el, index) => {
              return (
                <option key={el.value + index} value={el.value}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="tableArea">Khu vực bàn</label>
          <select
            value={data.tableArea}
            className="p-3 bg-slate-100 border rounded"
            name="tableArea"
            id="tableArea"
            onChange={handleOnChange}
          >
            <option value={""}>Chọn loại khu vực bàn</option>
            {tableAreaA.map((el, index) => {
              return (
                <option key={el.value + index} value={el.value}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="tableType">Loại bàn</label>
          <select
            value={data.tableType}
            className="p-3 bg-slate-100 border rounded"
            name="tableType"
            id="tableType"
            onChange={handleOnChange}
          >
            <option value={""}>Chọn loại bàn</option>
            {tableTypeE.map((el, index) => {
              return (
                <option key={el.value + index} value={el.value}>
                  {el.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="tableImage" className="mt-1.5">
            {" "}
            Hình ảnh bàn{" "}
          </label>
          <label htmlFor="uploadImageInput">
            <div className="bg-slate-100 p-2 border rounded-md h-36 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-400 flex justify-center items-center flex-col gap-1">
                <span className="text-4xl">
                  <MdCloudUpload />
                </span>
                <p className="text-xm">Tải lên hình ảnh bàn</p>
                <input
                  type="file"
                  name="uploadImageInput"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadTable}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.tableImage[0] ? (
              <div className=" flex items-center gap-2">
                {data.tableImage.map((el, index) => {
                  return (
                    <div className="relative">
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-600 bg-opacity-20 rounded-full cursor-pointer group-hover:block"
                        onClick={() => handleDeletetableImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-400 text-xs">
                {" "}
                **Vui lòng tải lên hình ảnh bàn**
              </p>
            )}
          </div>
          <label htmlFor="seatCount" className="mt-1.5">
            {" "}
            Số ghế{" "}
          </label>
          <input
            type="number"
            name="seatCount"
            id="seatCount"
            placeholder=" Nhập số lượng ghế ... "
            value={data.seatCount}
            onChange={handleOnChange}
            className="p-3 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="description" className="mt-1.5">
            Mô tả bàn{" "}
          </label>
          <textarea
            name="description"
            id="description"
            className="h-28 bg-slate-100 border resize-none p-2 "
            rows={3}
            placeholder="Nhập mô tả sản phẩm"
            onChange={handleOnChange}
            value={data.description}
          ></textarea>
          <label htmlFor="tableStatus">Tình trạng bàn</label>
          <select
            value={data.tableStatus}
            className="p-3 bg-slate-100 border rounded"
            name="tableStatus"
            id="tableStatus"
            onChange={handleOnChange}
          >
            <option value={""}>
                  Chọn Tình trạng bàn
                </option>
            {tableStatusS.map((el, index) => {
              return (
                <option key={el.value + index} value={el.value}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="isAvailableTable">Bàn có khả dụng?</label>
          <div className="flex gap-4 mt-2">
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="isAvailableTable"
                                value={true}
                                checked={data.isAvailableTable === true}
                                onChange={() => setData({ ...data, isAvailableTable: true })}
                            />
                            <span>Khả dụng</span>
                        </label>
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="isAvailableTable"
                                value={false}
                                checked={data.isAvailableTable === false}
                                onChange={() => setData({ ...data, isAvailableTable: false })}
                            />
                            <span>Không khả dụng</span>
                        </label>
                    </div>
          
          <button className="px-4 py-4 mt-2 mb-10 bg-[#0090da] hover:bg-[#0091daa7] text-white rounded-md shadow-xl ">
          Cập nhật sản phẩm
          </button>
        </form>
      </div>
      {/**Hien thi hinh anh khi re chuot */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default AdminEditTable;
