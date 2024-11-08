import React, { useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helper/imageTobase64";
import homeImg from "../assest/home-img-1.png";
import bookBg from "../assest/book-bg.jpg";
import SummaryApi from "../common";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    profilePic: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => ({
      ...preve,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataJson = await dataResponse.json();

      if (dataJson.success) {
        toast.success(dataJson.message);
        navigate("/login");
      }
      if (dataJson.error) {
        toast.error(dataJson.message);
      }
    } else {
      toast.error("Password and Confirm Password are not same");
      //alert("Password and Confirm Password are not same");
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageTobase64(file);
    console.log("imagePic", imagePic);
    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };

  return (
    <section
      id="signup"
      style={{
        backgroundImage: `url(${bookBg})`, // Use the background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto container p-4 flex items-center justify-center h-full">
        <div className="hidden lg:flex w-5/12 mx-4">
          <img src={homeImg} alt="Coffee Cup" className="w-full h-auto" />
        </div>
        <div className="bg-white p-5 focus-within:shadow-md rounded-xl w-full max-w-sm mx-5">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcons} alt="pic profile" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-50 bg-slate-100 pb-3 pt-2 text-center absolute bottom-0 w-full cursor-pointer">
                  New Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <form
            action=""
            className="pt-6 flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <div className="grid">
              <label htmlFor="">Email</label>
              <div className="bg-slate-200 p-4 rounded-full my-2">
                <input
                  name="email"
                  type="email"
                  value={data.email}
                  required
                  onChange={handleOnChange}
                  placeholder="enter your email..."
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label htmlFor="">Name</label>
              <div className="bg-slate-200 p-4 rounded-full my-2">
                <input
                  name="name"
                  type="text"
                  value={data.name}
                  onChange={handleOnChange}
                  placeholder="enter your name..."
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label htmlFor="">Phone</label>
              <div className="bg-slate-200 p-4 rounded-full my-2">
                <input
                  name="phone"
                  type="text"
                  value={data.phone}
                  onChange={handleOnChange}
                  placeholder="enter your phone..."
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label htmlFor="">Address</label>
              <div className="bg-slate-200 p-4 rounded-full my-2">
                <input
                  name="address"
                  type="text"
                  value={data.address}
                  onChange={handleOnChange}
                  placeholder="enter your address..."
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label htmlFor="">Password</label>
              <div className="bg-slate-50 p-4 flex rounded-full my-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  required
                  onChange={handleOnChange}
                  placeholder="enter your password..."
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div className="grid">
              <label htmlFor="">Confirm Password</label>
              <div className="bg-slate-50 p-4 flex rounded-full my-2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={data.confirmPassword}
                  required
                  onChange={handleOnChange}
                  placeholder="enter your password..."
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setShowConfirmPassword((preve) => !preve)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button className="bg-amber-900 text-white hover:bg-amber-950 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-4 btnUpdateColor addBtnColor">
              Sign Up
            </button>
          </form>
          <p className="my-4">
            Already you have account ?{" "}
            <Link
              to={"/login"}
              className="text-amber-900 hover:text-amber-950 hover:underline "
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
