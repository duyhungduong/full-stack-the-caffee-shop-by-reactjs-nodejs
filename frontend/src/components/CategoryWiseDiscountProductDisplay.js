import React, { useCallback, useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helper/fetchCategoryWiseProduct";
import displayVNCurrency from "../helper/displayCurrency";
import { TbShoppingCartFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import addToCart from "../helper/addToCart";
import Context from "../context";
import scrollTop from "../helper/scrollTop";
import { useSelector } from "react-redux";
import ROLE from "../common/role";
import { MdFavorite } from "react-icons/md";
import addToFavorite from "../helper/addToFavorite";
import SummaryApi from "../common";
import { BiSolidDiscount } from "react-icons/bi";

const CategoryWiseDiscountProductDisplay = ({ heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(20).fill(null);
  const user = useSelector((state) => state?.user?.user);

  const { fetchUserAddToCart } = useContext(Context);
  const { fetchUserAddToFavorite } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };
  const handleAddToFavorite = async (e, id) => {
    await addToFavorite(e, id);
    fetchUserAddToFavorite();
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const categoryProduct = await fetch(SummaryApi.getDiscountProduct.url, {
        method: SummaryApi.getDiscountProduct.method,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataResponse = await categoryProduct.json();
      if (dataResponse.success) {
        console.log("dataResponse", dataResponse);
        setLoading(false);
        setData(dataResponse?.data);
      }
      if (dataResponse.error) {
        console.log("error");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="container mx-auto px-4 my-4">
      <h2 className="text-lg font-semibold py-4">{heading}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-md p-4 animate-pulse"
              >
                <div className="bg-slate-200 h-72 w-full mb-4"></div>
                <div className="h-4 bg-gray-400 rounded mb-2"></div>
                <div className="h-4 bg-gray-400 rounded mb-2"></div>
                <div className="h-6 bg-gray-400 rounded"></div>
              </div>
            ))
          : data.map((product) => (
              <Link
                to={"/product/" + product?._id}
                key={product._id}
                className="bg-white dark:bg-gray-100  rounded-lg shadow-md transition-transform transform hover:scale-105"
                onClick={scrollTop}
              >
                <div className="bg-coffee-background h-72 p-3 flex justify-center items-center">
                  <img
                    className="object-cover h-full hover:scale-110 transition-all"
                    src={product.productImage[0]}
                    alt={product.productName}
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-medium text-base text-black line-clamp-1">
                    {product?.productName}
                  </h2>
                  {product?.sellingPrice === product?.price ? (
                    <p className="capitalize text-slate-500">
                      {product.category}
                    </p>
                  ) : (
                    <div className="items-center flex gap-2 flex-nowrap">
                      <p className="capitalize text-slate-500 text-xs">
                        {product.category}
                      </p>
                      <p className="flex items-center justify-center text-xs bg-yellow-200 rounded-md p-1 hover:shadow-md transition-transform duration-300 transform hover:scale-105">
                        <BiSolidDiscount className="mr-1" />
                        {""}
                        Sale{" "}
                        {Math.round(
                          ((product.price - product.sellingPrice) /
                            product.price) *
                            100
                        )}
                        {""}%
                      </p>
                    </div>
                  )}
                  <div className="flex gap-2 mt-1">
                    {product?.sellingPrice === product?.price ? (
                      <div>
                        <p className="text-green-600 font-serif font-medium">
                          {displayVNCurrency(product?.sellingPrice)}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-red-600 font-serif font-medium">
                          {displayVNCurrency(product?.sellingPrice)}
                        </p>
                        <p className="text-slate-500 line-through">
                          {displayVNCurrency(product?.price)}
                        </p>
                      </div>
                    )}
                  </div>
                  {user?.role === ROLE.GENERAL ? (
                    <button
                      className="mt-2 text-sm flex text-coffee-dark items-center gap-2 px-3 py-1 bg-gradient-to-r from-coffee-beige to-coffee-light  rounded-lg transition-all hover:from-pastel-teal hover:to-pastel-blue-dark"
                      onClick={(e) => handleAddToFavorite(e, product?._id)}
                    >
                      <MdFavorite /> Favorite
                    </button>
                  ) : (
                    <button
                      className="mt-2 text-sm flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-coffee-beige to-coffee-light text-coffee-dark rounded-lg transition-all hover:from-pastel-teal hover:to-pastel-blue-dark"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      <TbShoppingCartFilled /> Add to Cart
                    </button>
                  )}
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryWiseDiscountProductDisplay;
