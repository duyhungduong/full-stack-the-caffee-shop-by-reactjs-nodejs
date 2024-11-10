import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import Context from "../../context";
// import addToCart from "../../helper/addToCart";
// import addToFavorite from "../../helper/addToFavorite";
import fetchTypeWiseTable from "../../helper/Table/fetchTypeWiseTable";
import { MdFavorite } from "react-icons/md";
import scrollTop from "../../helper/scrollTop";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSadCry } from "react-icons/fa";

const TypeWiseTableDisplay = ({ tableType, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(20).fill(null);
  const user = useSelector((state) => state?.user?.user);
  
  const navigate = useNavigate();
  // const { fetchUserAddToCart } = useContext(Context);
  // const { fetchUserAddToFavorite } = useContext(Context);

  // const handleAddToCart = async (e, id) => {
  //   await addToCart(e, id);
  //   fetchUserAddToCart();
  // };
  // const handleAddToFavorite = async (e, id) => {
  //   await addToFavorite(e, id);
  //   fetchUserAddToFavorite();
  // };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const categoryProduct = await fetchTypeWiseTable(tableType);

      setLoading(false);
      setData(categoryProduct?.data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data", error);
    }
  }, [tableType]);
  const handleBooking = () => {
    if(!user?._id){
      toast.error("Vui lòng đăng nhập trước khi Booking");
      navigate("/login");
    }else{
      navigate("/booking", { state: { tableData: data } }); // Chuyển hướng đến trang Booking với dữ liệu
    }
    
  };

  const handleClickUnBooking = ()=>{
    toast.error("Bàn đã được đặt. Quý khách vui lòng chọn bàn khác!!!")
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container mx-auto px-4 my-4">
      <h2 className="text-lg font-semibold py-4">{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-md p-4 animate-pulse"
              >
                <div className="bg-slate-200 h-48 w-full mb-4"></div>
                <div className="h-4 bg-gray-400 rounded mb-2"></div>
                <div className="h-4 bg-gray-400 rounded mb-2"></div>
                <div className="h-6 bg-gray-400 rounded"></div>
              </div>
            ))
          : data.map((product) => (
              
                product?.isAvailableTable ? (
                  <Link
                    to={"/table/" + product?._id}
                    key={product._id}
                    className="bg-white  dark:bg-gray-100  dark:border  rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer"
                    onClick={scrollTop}
                  >
                    <div className="bg-coffee-background h-72 p-3 flex justify-center items-center">
                      <img
                        className="object-cover h-full hover:scale-110 transition-all"
                        src={product.tableImage[0]}
                        alt={product.tableNumber}
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="font-medium text-base text-black line-clamp-1">
                        Bàn số {product?.tableNumber}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.tableType}
                      </p>
                      <div className="flex gap-2 mt-1">
                        <p className="text-gray-500 font-semibold">
                          {product?.tableArea}
                        </p>
                        <p className="text-green-600 font-medium">
                          {product?.tableStatus}
                        </p>
                      </div>
                      {
                        <button
                          className="mt-2 text-sm flex text-coffee-dark items-center gap-2 px-3 py-1 bg-gradient-to-r from-coffee-beige to-coffee-light  rounded-lg transition-all hover:from-pastel-teal hover:to-pastel-blue-dark"
                          onClick={handleBooking}
                        >
                          <MdFavorite /> Booking
                        </button>
                      }
                    </div>
                  </Link>
                ) : (
                  <div
                    
                    key={product._id}
                    className="bg-red-200 rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-not-allowed"
                    onClick={handleClickUnBooking}
                  >
                    <div className="bg-red-400 h-72 p-3 flex justify-center items-center">
                      <img
                        className="object-cover h-full hover:scale-110 transition-all"
                        src={product.tableImage[0]}
                        alt={product.tableNumber}
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="font-medium text-base text-black line-clamp-1">
                        Bàn số {product?.tableNumber}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.tableType}
                      </p>
                      <div className="flex gap-2 mt-1">
                        <p className="text-gray-500 font-semibold">
                          {product?.tableArea}
                        </p>
                        <p className="text-green-600 font-medium">
                          {product?.tableStatus}
                        </p>
                      </div>
                      {
                        <button
                          className="mt-2 text-sm flex text-coffee-dark items-center gap-2 px-3 py-1 bg-gradient-to-r from-coffee-beige to-coffee-light  rounded-lg transition-all hover:from-pastel-pink hover:to-pastel-purple cursor-not-allowed"
                          onClick={scrollTop}
                        >
                          <FaSadCry /> Bàn không khả dụng
                        </button>
                      }
                    </div>
                  </div>
                )
              
            ))}
      </div>
    </div>
  );
};

export default TypeWiseTableDisplay;
