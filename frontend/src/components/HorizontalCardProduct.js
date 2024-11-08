import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helper/fetchCategoryWiseProduct";
import displayVNCurrency from "../helper/displayCurrency";
import { TbShoppingCartFilled } from "react-icons/tb";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helper/addToCart";
import Context from "../context";
import addToFavorite from "../helper/addToFavorite";
import { MdFavorite } from "react-icons/md";
import { useSelector } from "react-redux";
import ROLE from "../common/role";
import { BiSolidDiscount } from "react-icons/bi";

// Tạo thành phần tái sử dụng ProductCard
const ProductCard = ({ product, userRole, handleAction, isFavorite }) => {
  return (
    <Link
      to={`product/${product._id}`}
      className="relative w-full min-w-[360px] md:min-w-[400px] max-w-[360px] md:max-w-[400px] h-44 bg-white rounded-lg hover:shadow-md shadow-slate-600 flex transition-transform duration-300 transform hover:scale-105 hover:z-20 m-2 mb-3 " // Sản phẩm nhỏ hơn một chút khi rê chuột vào
      style={{ overflow: "visible", zIndex: 1 }}
    >
      <div className="bg-coffee-background h-full w-1/2 p-4 min-w-[120px] md:min-w-[145px] rounded-l-lg">
        <img
          className="object-cover  h-full w-full rounded-md transition-transform hover:scale-110"
          src={product.productImage[0]}
          alt={product.productName}
        />
      </div>
      <div className="p-4 flex flex-col justify-between  w-1/2">
        <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-black hover:underline">
          {product.productName}
        </h2>
        {product?.sellingPrice === product?.price ? (
          <p className="capitalize text-slate-500">{product.category}</p>
        ) : (
          <div className="items-center flex gap-2">
            <p className="capitalize text-slate-500 text-sm">
              {product.category}
            </p>
            <p className="flex items-center justify-center text-xs bg-yellow-200 rounded-md p-1 hover:shadow-md transition-transform duration-300 transform hover:scale-105">
              <BiSolidDiscount /> Giảm giá
            </p>
          </div>
        )}

        {
          // Hiển thị giá sản phẩm
          product?.sellingPrice === product?.price ? (
            <div className=" gap-2 items-center">
              <p className="text-[#00d084] font-serif font-medium transition-transform duration-300 transform hover:scale-105">
                {displayVNCurrency(product.sellingPrice)}
              </p>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <p className="text-red-600 font-serif font-medium transition-transform duration-300 transform hover:scale-105">
                {displayVNCurrency(product.sellingPrice)}
              </p>
              <p className="text-slate-500 line-through">
                {displayVNCurrency(product.price)}
              </p>
            </div>
          )
        }

        <button
          onClick={(e) => handleAction(e, product._id)}
          className="text-sm flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-coffee-beige to-coffee-light text-coffee-dark hover:from-pastel-teal hover:to-pastel-blue-dark rounded-lg shadow-md z-20"
        >
          {isFavorite ? <MdFavorite /> : <TbShoppingCartFilled />}
          {isFavorite ? "Favorite" : "Thêm vào giỏ"}
        </button>
      </div>
    </Link>
  );
};

const HorizontalCardProduct = ({ category, heading }) => {
  const user = useSelector((state) => state?.user?.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(20).fill(null); // Chỉ tạo loading giả lập khi cần

  const scrollElement = useRef();
  const { fetchUserAddToCart, fetchUserAddToFavorite } = useContext(Context);

  const fetchData = async () => {
    setLoading(true);
    try {
      const categoryProduct = await fetchCategoryWiseProduct(category);
      setData(categoryProduct?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAction = async (e, id, isFavorite) => {
    e.preventDefault();
    if (isFavorite) {
      await addToFavorite(e, id);
      fetchUserAddToFavorite();
    } else {
      await addToCart(e, id);
      fetchUserAddToCart();
    }
  };

  const scrollRight = () => {
    scrollElement.current.scrollBy({
      left: scrollElement.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    scrollElement.current.scrollBy({
      left: -scrollElement.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto px-4 my-8 relative">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-coffee-dark py-2 sm:py-3 md:py-4">{heading}</h2>
      <div className="relative">
        {/* Nút cuộn trái */}
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

        {/* Thanh sản phẩm */}
        <div
          className="flex items-center gap-6 overflow-x-scroll scrollbar-none transition-all px-8" // Thêm padding để tạo không gian tránh các nút cuộn
          ref={scrollElement}
          style={{ scrollBehavior: "smooth" }}
        >
          {loading
            ? loadingList.map((_, index) => (
                <div
                  key={`loadingProduct-${index}`}
                  className="bg-gray-200 p-6 rounded-lg shadow-md flex w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-44 skeleton-loading"
                >
                  <div className="h-full p-4 min-w-[120px] md:min-w-[145px] bg-gray-300 rounded-md"></div>
                  <div className="mx-3">
                    <p className="bg-gray-300 w-32 h-4 mb-2 rounded"></p>
                    <p className="bg-gray-300 w-20 h-4 mb-2 rounded"></p>
                    <p className="bg-gray-300 w-24 h-4 mb-2 rounded"></p>
                  </div>
                </div>
              ))
            : data.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  userRole={user?.role}
                  handleAction={(e) =>
                    handleAction(e, product._id, user?.role === ROLE.GENERAL)
                  }
                  isFavorite={user?.role === ROLE.GENERAL}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
