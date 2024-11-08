import React from "react";
import { IoClose } from "react-icons/io5";

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto p-2">
      <div
            className="w-fit ml-auto text-4xl hover:text-red-600"
            onClick={onClose}
          >
            <IoClose />
          </div>
        <div className="flex justify-center p-4 max-w-[80vh] max-h-[95vh]">
          <img src={imgUrl} alt="Image" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
