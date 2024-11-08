import React, { useEffect, useState, useRef } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";
import { PiCakeDuotone } from "react-icons/pi";
import { CiCoffeeCup } from "react-icons/ci";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null); // Ref for the scroll container

  const categoryLoading = new Array(20).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();

    setTimeout(() => {
      setLoading(false);
      setCategoryProduct(dataResponse.data);
    }, 50);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  useEffect(() => {
    // Auto-scroll effect with circular looping
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;

    const scrollInterval = setInterval(() => {
      if (scrollContainer) {
        scrollAmount += 1;
        scrollContainer.scrollLeft = scrollAmount;

        // When end of original items is reached, reset back to start
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
          scrollContainer.scrollLeft = 0;
        }
      }
    }, 20); // Adjust interval for speed

    return () => clearInterval(scrollInterval); // Cleanup on unmount
  }, [categoryProduct]);

  return (
    <div className="container mx-auto p-4 m-2">
      <div
        ref={scrollRef}
        className="flex items-center gap-4 justify-between overflow-x-scroll scrollbar-none p-4"
        style={{ whiteSpace: "nowrap" }}
      >
        {loading
          ? categoryLoading.map((el, index) => (
              <div
                key={"areaTableLoading" + index}
                className="bg-gray-200 p-8 rounded-lg shadow-md flex flex-col justify-between items-center skeleton-loading"
              >
                <div className="w-24 h-24 md:w-28 md:h-28 text-center flex items-center justify-center">
                  <div className="bg-gray-500 w-full h-full object-cover rounded-full mx-auto"></div>
                </div>
                <p className="bg-scale-500 text-center mt-2 w-20 h-4 rounded"></p>
              </div>
            ))
          : [...categoryProduct, ...categoryProduct].map((product, index) => (
              <Link
                key={product?.category + index}
                to={"/product-category?category=" + product?.category}
                className="cursor-pointer bg-gradient-to-r from-coffee-beige to-coffee-light hover:from-pastel-teal hover:to-pastel-blue-dark p-8 rounded-lg shadow-md hover:shadow-lg flex flex-col justify-between text-coffee-dark hover:text-amber-600 transition-transform duration-300 transform hover:scale-105"
              >
                <div className="w-24 h-24 md:w-28 md:h-28 text-center flex items-center justify-center">
                  <img
                    className="w-full h-full object-cover rounded-full mx-auto border-4 border-coffee-brown transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:border-[#6b3310]"
                    src={product?.productImage[0]}
                    alt={product?.category}
                  />
                </div>
                {product?.category === "cake" ? (
                  <p className="text-center flex items-center justify-center hover:text-amber-600 font-serif font-medium mt-2 text-sm md:text-base capitalize">
                    <PiCakeDuotone size={20} className="mr-1" /> {product?.category}
                  </p>
                ) : (
                  <p className="text-center flex items-center justify-center hover:text-amber-600 font-serif font-medium mt-2 text-sm md:text-base capitalize">
                    <CiCoffeeCup size={20} className="mr-1" />
                    {product?.category}
                  </p>
                )}
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryList;
