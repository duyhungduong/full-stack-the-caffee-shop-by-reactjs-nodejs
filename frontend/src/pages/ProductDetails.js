import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa6";
import displayVNCurrency from "../helper/displayCurrency";
import VerticalCardProduct from "../components/VerticalCardProduct";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helper/addToCart";
import Context from "../context";
import { useSelector } from "react-redux";
import { MdFavoriteBorder } from "react-icons/md";
import ROLE from "../common/role";
import addToFavorite from "../helper/addToFavorite";
import { BiSolidDiscount } from "react-icons/bi";
import scrollTop from "../helper/scrollTop";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const user = useSelector((state) => state?.user?.user);
  const params = useParams();

  const [loading, setLoading] = useState(false);

  const productImageListLoading = new Array(4).fill(null);

  const [activeImage, setActiveImage] = useState("");

  const [zoomStyle, setZoomStyle] = useState({});

  const { fetchUserAddToCart } = useContext(Context);

  const { fetchUserAddToFavorite } = useContext(Context);

  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setLoading(true);
    // API call to fetch product details
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });

    const dataResponse = await response.json();

    setLoading(false);
    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImage[0]);
  };

  console.log("data product ", data);

  useEffect(() => {
    scrollTop();
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imgURL) => {
    setActiveImage(imgURL);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.2)", // Adjust to 1.2 or 1.3 for a more subtle effect
      transition: "transform 0.2s ease-in-out", // Smooth transition
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)", // Trả ảnh về kích thước gốc
    });
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };
  const handleAddToFavorite = async (e, id) => {
    await addToFavorite(e, id);
    fetchUserAddToFavorite();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();

    navigate("/cart");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-6">
        {/** Product Images */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-3/4">
            {loading ? (
              <div className="w-full h-96 bg-skeleton-loading rounded-lg" />
            ) : (
              <img
                src={activeImage}
                className="h-full w-full object-cover transition-transform duration-300"
                alt=""
                style={zoomStyle}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            )}
          </div>
          <div className="flex flex-row lg:flex-col gap-5 overflow-x-auto lg:overflow-y-auto scrollbar-none">
            {loading
              ? new Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <div
                      key={"loadingImage" + index}
                      className="w-20 h-20 bg-skeleton-loading rounded-lg"
                    />
                  ))
              : data?.productImage?.map((imgURL, index) => (
                  <div
                    key={index}
                    className="w-24 h-24 p-1 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition-transform hover:scale-105 cursor-pointer"
                    onClick={() => handleMouseEnterProduct(imgURL)}
                  >
                    <img
                      src={imgURL}
                      alt=""
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                ))}
          </div>
        </div>

        {/** Product Details */}
        <div className="flex flex-col gap-6">
          <div>
            {loading ? (
              <div className="w-full h-8 bg-skeleton-loading rounded" />
            ) : (
              <h2 className="text-2xl lg:text-4xl font-bold">
                {data?.productName}
              </h2>
            )}

            {loading ? (
              <div className="w-32 h-6 bg-skeleton-loading mt-2 rounded" />
            ) : (
              <p className="mt-1 text-sm text-gray-500">
                Brand: {data?.brandName}
              </p>
            )}

            {loading ? (
              <div className="w-40 h-6 bg-skeleton-loading mt-2 rounded" />
            ) : (
              <div>
                {data?.sellingPrice === data?.price ? (
                  <p className="capitalize text-slate-500">{data.category}</p>
                ) : (
                  <div className="items-center flex gap-2 mt-2">
                    <p className="capitalize text-slate-500 text-base">
                      {data.category}
                    </p>
                    <p className="flex items-center text-lg justify-center bg-yellow-200 rounded-md p-1 hover:shadow-md transition-transform duration-300 transform hover:scale-105">
                      <BiSolidDiscount className="mr-1" /> Giảm giá{" "}
                      {Math.round(
                        ((data.price - data.sellingPrice) / data.price) * 100
                      )}{""}
                      %
                    </p>
                  </div>
                )}
                {/* <p className="capitalize text-sm text-gray-400">
                Category: {data?.category}
              </p> */}
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-skeleton-loading rounded-full" />
              <div className="w-8 h-8 bg-skeleton-loading rounded-full" />
              <div className="w-8 h-8 bg-skeleton-loading rounded-full" />
              <div className="w-8 h-8 bg-skeleton-loading rounded-full" />
              <div className="w-8 h-8 bg-skeleton-loading rounded-full" />
            </div>
          ) : (
            <div className="flex items-center text-yellow-500 space-x-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
          )}

          <div className="flex items-center space-x-3">
            {
              // Hiển thị giá sản phẩm
              data?.sellingPrice === data?.price ? (
                <div>
                  {loading ? (
                    <div className=" w-32 h-8 bg-skeleton-loading rounded" />
                  ) : (
                    <p className="text-3xl font-serif font-semibold text-[#00d084] transition-transform duration-300 transform hover:scale-105">
                      {displayVNCurrency(data.sellingPrice)}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  {loading ? (
                    <div className="w-32 h-8 bg-skeleton-loading rounded" />
                  ) : (
                    <p className="text-3xl font-semibold text-[#00d084] transition-transform duration-300 transform hover:scale-105">
                      {displayVNCurrency(data?.sellingPrice)}
                    </p>
                  )}

                  {loading ? (
                    <div className="w-24 h-8 bg-skeleton-loading rounded" />
                  ) : (
                    <p className="text-xl text-gray-500 line-through">
                      {displayVNCurrency(data?.price)}
                    </p>
                  )}
                </div>
              )
            }
          </div>
          {user?.role === ROLE.GENERAL ? (
            <div className="flex space-x-4">
              {loading ? (
                <div className="w-full lg:w-1/3 h-12 bg-skeleton-loading rounded" />
              ) : (
                <button
                  className="w-full flex items-center gap-2 lg:w-2/3 px-4 py-2 bg-gradient-to-r from-coffee-brown to-coffee-dark text-white rounded-md hover:from-coffee-light hover:to-coffee-green transition-all hover:shadow-md duration-300 transform hover:scale-105"
                  onClick={(e) => handleAddToFavorite(e, data?._id)}
                >
                  <MdFavoriteBorder /> Thêm vào yêu thích
                </button>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              {loading ? (
                <div className="w-full lg:w-1/3 h-12 bg-skeleton-loading rounded" />
              ) : (
                <button
                  className="w-full lg:w-1/3 px-4 py-2 bg-gradient-to-r from-coffee-brown to-coffee-dark text-white rounded-md hover:from-coffee-light hover:to-coffee-green transition-all hover:shadow-md duration-300 transform hover:scale-105"
                  onClick={(e) => handleBuyProduct(e, data?._id)}
                >
                  Mua
                </button>
              )}
              {loading ? (
                <div className="w-full lg:w-1/3 h-12 bg-skeleton-loading rounded" />
              ) : (
                <button
                  className="w-full lg:w-1/3 px-4 py-2 bg-gradient-to-r from-coffee-beige to-coffee-light text-coffee-dark rounded-md hover:from-pastel-teal hover:to-pastel-blue-dark hover:shadow-md transition-all duration-300 transform hover:scale-105"
                  onClick={(e) => handleAddToCart(e, data?._id)}
                >
                  Thêm vào giỏ
                </button>
              )}
            </div>
          )}

          <div>
            {loading ? (
              <>
                <div className="w-24 h-6 bg-skeleton-loading rounded mt-4" />
                <div className="w-full h-20 bg-skeleton-loading rounded mt-2" />
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium text-gray-700">
                  Mô tả sản phẩm
                </h3>
                <p className="text-gray-600 mt-2 text-justify">
                  {data?.description}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        {data.category && (
          <CategoryWiseProductDisplay
            category={data?.category}
            heading={"Recommended Product"}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
