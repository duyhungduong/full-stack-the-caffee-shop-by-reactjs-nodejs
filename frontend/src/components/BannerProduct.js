import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

import image0 from "../assest/banner/White Coffee Banner.png";
import image1 from "../assest/banner/Beige Green Modern Abstract Cappuccino Banner Landscape.png";
import image2 from "../assest/banner/Minimalist Coffee Banner.png";
import image3 from "../assest/banner/Pink And Brown Cute Cake Shop Banner.png";
import image4 from "../assest/banner/Yellow and Orange Modern Simple Clean Food This or That Banner.png";

import image0Mobile from "../assest/banner/mobile - White Coffee Banner.png";
import image1Mobile from "../assest/banner/mobile - Beige Green Modern Abstract Cappuccino Banner Landscape.png";
import image2Mobile from "../assest/banner/mobile - Minimalist Coffee Banner.png";
import image3Mobile from "../assest/banner/mobile - Pink And Brown Cute Cake Shop Banner.png";
import image4Mobile from "../assest/banner/mobile- Yellow and Orange Modern Simple Clean Food This or That Banner.png";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  // Arrays for desktop and mobile images
  const desktopImages = [
    { src: image0, category: "americano" },
    { src: image1, category: "hotcoffee" },
    { src: image2, category: "cappuccino" },
    { src: image3, category: "brownie" },
    { src: image4, category: "cake" }
  ];

  const mobileImages = [
    { src: image0Mobile, category: "americano" },
    { src: image1Mobile, category: "hotcoffee" },
    { src: image2Mobile, category: "cappuccino" },
    { src: image3Mobile, category: "brownie" },
    { src: image4Mobile, category: "cake" }
  ];

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    } else {
      setCurrentImage(0);
    }
  };

  const preveImage = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    } else {
      setCurrentImage(desktopImages.length - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        setCurrentImage((prev) => prev + 1);
      } else {
        setCurrentImage(0);
      }
    }, 7500);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="mx-auto container p-2 px-4 rounded">
      <div className="h-90 md:h-auto w-full bg-slate-100 relative">
        <div className="absolute z-10 h-full w-full flex items-center">
          <div className="w-full flex justify-between text-base">
            <button
              onClick={preveImage}
              className="bg-white shadow-md rounded-full p-1"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white shadow-md rounded-full p-1"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Desktop and tablet */}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          {desktopImages.map((image, index) => (
            <div
              className="w-full h-full min-w-full min-h-full transition-all"
              key={image.src}
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <Link to={`/product-category?category=${image.category}`}>
                <img
                  src={image.src}
                  alt={image.category}
                  className="w-full h-full object-cover object-center rounded-2xl"
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImages.map((image, index) => (
            <div
              className="w-full h-full min-w-full min-h-full transition-all"
              key={image.src}
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <Link to={`/product-category?category=${image.category}`}>
                <img
                  src={image.src}
                  alt={image.category}
                  className="w-full h-full object-cover object-center rounded-2xl"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
