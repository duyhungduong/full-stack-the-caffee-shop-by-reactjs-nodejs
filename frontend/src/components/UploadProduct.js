import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import productCategory from "../helper/productCategory";
import { MdCloudUpload } from "react-icons/md";
import uploadImage from "../helper/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose,fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
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

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];

    const uploadImageCloudinary = await uploadImage(file);

    setData((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    console.log("index", index);
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((preve) => {
      return {
        ...preve,
        productImage: [...newProductImage],
      };
    });
  };


  {/**Them san pham */}
  const handleSubmit = async(e)=>{
    e.preventDefault()

    const response = await fetch(SummaryApi.uploadProduct.url,{
      method: SummaryApi.uploadProduct.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    const responseData =  await response.json()

    if(responseData.success){
      toast.success(responseData?.message)
      onClose()
      fetchData()
    }
    if(responseData.error){
      toast.error(responseData?.message)
    }

  }


  return (
    <div className="fixed w-full h-full  bg-slate-100 bg-opacity-30 top-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-1">
          <h2 className="font-bold text-lg ">Upload Product</h2>
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
          <label htmlFor="productName">Tên sản phẩm </label>
          <input
            type="text"
            name="productName"
            id="productName"
            placeholder=" Nhập tên sản phẩm ... "
            value={data.productName}
            onChange={handleOnChange}
            className="p-3 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="brandName" className="mt-1.5">
            Tên thương hiệu cà phê{" "}
          </label>
          <input
            type="text"
            name="brandName"
            id="brandName"
            placeholder=" Nhập tên thương hiệu ... "
            value={data.brandName}
            onChange={handleOnChange}
            className="p-3 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="category" className="mt-1.5">
            {" "}
            Loại{" "}
          </label>
          <select
            value={data.category}
            className="p-3 bg-slate-100 border rounded"
            name="category"
            id="category"
            onChange={handleOnChange}
          >
            <option value={""}>
                  Chọn loại sản phẩm
                </option>
            {productCategory.map((el, index) => {
              return (
                <option key={el.value + index} value={el.value}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productImage" className="mt-1.5">
            {" "}
            Hình ảnh sản phẩm{" "}
          </label>
          <label htmlFor="uploadImageInput">
            <div className="bg-slate-100 p-2 border rounded-md h-36 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-400 flex justify-center items-center flex-col gap-1">
                <span className="text-4xl">
                  <MdCloudUpload />
                </span>
                <p className="text-xm">Tải lên hình ảnh sản phẩm</p>
                <input
                  type="file"
                  name="uploadImageInput"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className=" flex items-center gap-2">
                {data.productImage.map((el, index) => {
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
                        onClick={() => handleDeleteProductImage(index)}
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
                **Vui lòng tải lên hình ảnh sản phẩm**
              </p>
            )}
          </div>

          <label htmlFor="price" className="mt-1.5">
            {" "}
            Giá{" "}
          </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder=" Nhập giá sản phẩm ... "
            value={data.price}
            onChange={handleOnChange}
            className="p-3 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="sellingPrice" className="mt-1.5">
            {" "}
            Giá bán{" "}
          </label>
          <input
            type="number"
            name="sellingPrice"
            id="sellingPrice"
            placeholder=" Nhập giá bán sản phẩm ... "
            value={data.sellingPrice}
            onChange={handleOnChange}
            className="p-3 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="description" className="mt-1.5">
            Mô tả sản phẩm{" "}
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

          <button className="px-4 py-4 mt-2 mb-10 bg-[#0090da] hover:bg-[#0091daa7] text-white rounded-md shadow-xl ">
            Thêm sản phẩm
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

export default UploadProduct;
