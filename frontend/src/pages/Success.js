import React, { useContext } from "react";
import SuccessImage from "../assest/Payment method success.gif";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Context from "../context";
const Success = () => {
  //const user = useSelector((state) => state?.user?.user);
  const { fetchUserOrderProduct} = useContext(Context);

  const handleOrder =  () => {
    // await addToFavorite(e, id);
    fetchUserOrderProduct();
  };

  return (
    <div className="bg-white  max-w-2xl mx-auto flex justify-center items-center flex-col p-4 mt-10 rounded shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
      
      <img src={SuccessImage} alt="" className="" />
      <p className="text-green-600 font-bold text-xl">Payment Successfully</p>
      <Link
        to={"/order"}
        className="p-2 px-3 my-2 mt-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:text-white hover:bg-green-600 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
        onClick={handleOrder}
      >
        See order
      </Link>
    </div>
  );
};

export default Success;
