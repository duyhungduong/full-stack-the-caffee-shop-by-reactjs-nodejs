import React, { useContext, useEffect, useState } from "react";
import Context from "../context";
import SummaryApi from "../common";
import displayVNCurrency from "../helper/displayCurrency";
import { MdDelete } from "react-icons/md";
import { IoHeartDislike } from "react-icons/io5";
import Spinner from "../helper/Spinner";

const Favorite = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.favoriteProductCount).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToFavoriteProductView.url, {
      method: SummaryApi.addToFavoriteProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    //setLoading(false);
    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    //  fetchData();
    setLoading(true);

    setTimeout(() => {
       handleLoading();
    setLoading(false);
    },500)
   
    
  }, []);


    const deleteFavoriteProduct = async (id) => {
      const response = await fetch(SummaryApi.deleteFavoriteProduct.url, {
        method: SummaryApi.deleteFavoriteProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
        context.fetchUserAddToFavorite();
      }
    };


  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-coffee-brown">Your Favorite</h1>
        <p className="text-gray-600 mt-2">
          Below is a list of all your table favorite.
        </p>
      </div>

      {data.length === 0 && !loading && (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 text-lg">No Products Available in your favorite</p>
        </div>
      )}
      <div className="flex flex-col lg:flex-row gap-7 lg:justify-between">
        {/* Sản phẩm trong giỏ hàng */}
        <div className="w-full ">
        {
          loading && (<Spinner/>)
        }
          {loading
            ? loadingCart.map((_, index) => (
                <div
                  key={"Add to Cart Loading" + index}
                  className="w-full bg-slate-300 h-40 my-3 border border-slate-50 rounded skeleton-loading"
                ></div>
              ))
            : data.map((product) => (
                <div
                  key={product._id}
                  className="w-full bg-white rounded-lg shadow-lg p-4 flex gap-4 mb-6 transition-all hover:shadow-xl duration-300 transform hover:scale-105"
                >
                  <div className="w-40 h-40 bg-gray-100 flex items-center justify-center">
                    <img
                      src={product?.productId?.productImage[0]}
                      alt={product?.productId?.productName}
                      className="object-contain h-full hover:shadow-md transition-transform duration-300 transform hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="h-full w-full">
                      <h2 className="text-3xl font-semibold text-gray-800">
                        {product?.productId?.productName}
                      </h2>
                      <p className="text-gray-500 capitalize">
                        {product?.productId?.category}
                      </p>
                      <p className="font-semibold text-xl text-gray-500 line-through">
                        {displayVNCurrency(product?.productId?.price)}
                      </p>
                      <p className="font-semibold text-4xl text-coffee-green">
                        {displayVNCurrency(product?.productId?.sellingPrice)}
                      </p>
                    </div>
                  </div>
                  <div
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    onClick={() => deleteFavoriteProduct(product?._id)}
                    alt="Xóa sản phẩm yêu thích"
                  >
                    <IoHeartDislike size={24} className=" transition-all duration-300 transform hover:scale-105"/>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
