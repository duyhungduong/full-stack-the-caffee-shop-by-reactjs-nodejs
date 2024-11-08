import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helper/fetchCategoryWiseProduct";
import displayVNCurrency from "../helper/displayCurrency";
import { TbShoppingCartFilled } from "react-icons/tb";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helper/addToCart";
import Context from "../context";
import addToFavorite from "../helper/addToFavorite";
import { useSelector } from "react-redux";
import ROLE from "../common/role";
import { MdFavorite } from "react-icons/md";
import { BiSolidDiscount } from "react-icons/bi";

const LoadingPlaceholder = () => (
  <div className="w-full min-w-[240px] max-w-[300px] bg-gray-100 rounded-lg shadow-md skeleton-loading transition-all duration-300">
    <div className="bg-slate-200 h-72 p-3 flex justify-center items-center rounded-lg">
      <div className="bg-slate-400 h-full w-full rounded-lg"></div>
    </div>
    <div className="p-4 grid gap-1 mt-1">
      <div className="w-3/4 h-4 bg-gray-400 rounded-md"></div>
      <div className="w-1/2 h-4 bg-gray-400 rounded-md"></div>
      <div className="w-full h-6 bg-gray-400 rounded-md"></div>
    </div>
  </div>
);

const VerticalCardProduct = ({ category, heading }) => {
  const user = useSelector((state) => state?.user?.user);
  const [data, setData] = useState({ products: [], loading: true });
  const scrollElement = useRef();
  const { fetchUserAddToCart, fetchUserAddToFavorite } = useContext(Context);

  const fetchData = useCallback(async () => {
    try {
      const categoryProduct = await fetchCategoryWiseProduct(category);
      setData({ products: categoryProduct?.data || [], loading: false });
    } catch (error) {
      console.error("Error fetching data", error);
      setData({ products: [], loading: false });
    }
  }, [category]);

  useEffect(() => {
    let isMounted = true; 
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [fetchData]);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleAddToFavorite = async (e, id) => {
    await addToFavorite(e, id);
    fetchUserAddToFavorite();
  };

  const scrollRight = useCallback(() => {
    scrollElement.current.scrollBy({
      left: scrollElement.current.offsetWidth,
      behavior: "smooth",
    });
  }, []);

  const scrollLeft = useCallback(() => {
    scrollElement.current.scrollBy({
      left: -scrollElement.current.offsetWidth,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-coffee-dark py-2 sm:py-3 md:py-4">{heading}</h2>
      <div className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none" ref={scrollElement}>
        
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-lg md:text-2xl bg-coffee-light shadow-lg rounded-full p-2 md:p-3 hover:z-20 transition-all hover:scale-110 hover:bg-coffee-brown text-white"
        >
          <FaAngleLeft />
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-lg md:text-2xl bg-coffee-light shadow-lg rounded-full p-2 md:p-3 hover:z-20 transition-all hover:scale-110 hover:bg-coffee-brown text-white"
        >
          <FaAngleRight />
        </button>

        {data.loading
          ? Array.from({ length: 20 }).map((_, index) => (
              <LoadingPlaceholder key={index} />
            ))
          : data.products.map((product) => (
              <Link
                to={`product/${product?._id}`}
                key={product?._id}
                className="w-full min-w-[240px] max-w-[300px] md:min-w-[400px] bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-coffee-background h-72 md:h-96 p-3 flex justify-center items-center rounded-lg overflow-hidden">
                  <img
                    className="object-cover h-full w-full hover:scale-110 transition-transform duration-300"
                    src={product.productImage[0]}
                    alt={product?.productName}
                  />
                </div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-lg md:text-xl text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <div className="flex gap-2 items-center">
                    <p className="capitalize text-slate-500">{product.category}</p>
                    {product?.sellingPrice !== product?.price && (
                      <p className="flex items-center font-sans justify-center bg-yellow-200 font-serif rounded-md p-1">
                        <BiSolidDiscount className="mr-1" />
                        Giảm giá {Math.round(((product.price - product.sellingPrice) / product.price) * 100)} %
                      </p>
                    )}
                  </div>
                  <p className="text-ellipsis line-clamp-2">{product?.description}</p>
                  <div className="flex gap-2">
                  {
                    product?.sellingPrice !== product?.price ? (<p className="text-red-600 font-serif font-medium">{displayVNCurrency(product?.sellingPrice)}</p>) : (<p className="text-green-600 font-serif font-medium">{displayVNCurrency(product?.sellingPrice)}</p>)
                  }
                    
                    {product?.sellingPrice !== product?.price && (
                      <p className="text-slate-500 line-through">
                        {displayVNCurrency(product?.price)}
                      </p>
                    )}
                  </div>
                  <button
                    className="text-xl font-sans flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-coffee-beige to-coffee-light text-coffee-dark rounded-lg transition-all hover:scale-105"
                    onClick={(e) =>
                      user?.role === ROLE.GENERAL
                        ? handleAddToFavorite(e, product?._id)
                        : handleAddToCart(e, product?._id)
                    }
                  >
                    {user?.role === ROLE.GENERAL ? (
                      <>
                        <MdFavorite /> Favorite
                      </>
                    ) : (
                      <>
                        <TbShoppingCartFilled /> Thêm vào giỏ
                      </>
                    )}
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
