import React, { useCallback, useContext, useEffect, useState } from "react";
import displayVNCurrency from "../helper/displayCurrency";
import { TbShoppingCartFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import addToCart from "../helper/addToCart";
import Context from "../context";
import scrollTop from "../helper/scrollTop";
import { useSelector } from "react-redux";
import ROLE from "../common/role";
import { MdFavorite } from "react-icons/md"; // Favorite icon
import addToFavorite from "../helper/addToFavorite";
import SummaryApi from "../common";
import { BiSolidDiscount } from "react-icons/bi"; // Discount icon (if needed)

const CategoryWiseTopFavoritedProductDisplay = ({ heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(8).fill(null); // Adjusted to 8 for top favorited

  const user = useSelector((state) => state?.user?.user);
  const { fetchUserAddToCart, fetchUserAddToFavorite } = useContext(Context);

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
      const response = await fetch(SummaryApi.getTopFavoritedProduct.url, {
        method: SummaryApi.getTopFavoritedProduct.method,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataResponse = await response.json();
      if (dataResponse.success) {
        setData(dataResponse.data);
        console.log("dataResponse.data favorited", dataResponse.data);
        setLoading(false);
      } else {
        console.log("No data found");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
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
                to={"/product/" + product.productDetails._id}
                key={product.productDetails.productId}
                className="bg-white dark:bg-gray-100  rounded-lg shadow-md transition-transform transform hover:scale-105"
                onClick={scrollTop}
              >
                <div className="bg-coffee-background h-72 p-3 flex justify-center items-center">
                  <img
                    className="object-cover h-full hover:scale-110 transition-all"
                    src={product.productDetails.productImage[0]}
                    alt={product.productDetails.productName}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-medium text-base text-black line-clamp-1">
                      {product.productDetails.productName}
                    </h2>
                    <p className="text-base items-center gap-1 transition-colors cursor-pointer">
                      <MdFavorite className="text-red-500 hover:scale-125 duration-200 ease-in-out" />
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      {product.productDetails.sellingPrice ===
                      product.productDetails.price ? (
                        <div>
                          <p className="text-slate-500 text-xs capitalize">
                            {product.productDetails.category}
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <p className="text-slate-500 text-xs capitalize mr-1">
                            {product.productDetails.category}
                          </p>
                          <p className="flex items-center justify-center text-xs bg-yellow-200 rounded-md p-1 hover:shadow-md transition-transform duration-300 transform hover:scale-105">
                            <BiSolidDiscount className="mr-1 " />
                            -
                            {Math.round(
                              ((product.productDetails.price - product.productDetails.sellingPrice) /
                              product.productDetails.price) *
                                100
                            )}
                            {""}%
                          </p>
                        </div>
                      )}
                    </div>

                    <p className="text-xs font-medium text-yellow-500 flex items-center gap-1 hover:text-yellow-600 transition-colors cursor-pointer">
                      {product.favoritesCount} lượt thích
                    </p>
                  </div>

                  <div className="flex gap-2 mt-1">
                    {product.productDetails.sellingPrice ===
                    product.productDetails.price ? (
                      <div>
                        <p className="text-green-600 font-serif font-medium">
                          {displayVNCurrency(
                            product.productDetails.sellingPrice
                          )}
                        </p>
                        <p className="text-white dark:text-gray-100  line-through">
                          {displayVNCurrency(product.productDetails.price)}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-red-600 font-serif font-medium">
                          {displayVNCurrency(
                            product.productDetails.sellingPrice
                          )}
                        </p>
                        <p className="text-slate-500 line-through">
                          {displayVNCurrency(product.productDetails.price)}
                        </p>
                      </div>
                    )}
                  </div>
                  {/* <div className="mt-2 text-sm flex text-coffee-dark items-center gap-2 px-3 py-1 bg-gradient-to-r from-coffee-beige to-coffee-light  rounded-lg transition-all hover:from-pastel-teal hover:to-pastel-blue-dark">
                  <MdFavorite /> {product.favoritesCount}
                  </div> */}
                  {user?.role === ROLE.GENERAL ? (
                    <button
                      className="mt-2 text-sm flex text-coffee-dark items-center gap-2 px-3 py-1 bg-gradient-to-r from-coffee-beige to-coffee-light  rounded-lg transition-all hover:from-pastel-teal hover:to-pastel-blue-dark"
                      onClick={(e) => handleAddToFavorite(e, product.productId)}
                    >
                      <MdFavorite /> Favorite
                    </button>
                  ) : (
                    <button
                      className="mt-2 text-sm flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-coffee-beige to-coffee-light text-coffee-dark rounded-lg transition-all hover:from-pastel-teal hover:to-pastel-blue-dark"
                      onClick={(e) => handleAddToCart(e, product.productId)}
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

export default CategoryWiseTopFavoritedProductDisplay;
