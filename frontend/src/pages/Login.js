import React, { useContext, useEffect, useState } from "react";
import loginIcons from "../assest/signin.gif";
import homeImg from "../assest/home-img-3.png";
import { Link, useNavigate } from "react-router-dom";
import bookBg from "../assest/book-bg.jpg";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import caffee from "../assest/logocaffee.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const generalContext = useContext(Context);
  const {
    fetchUserDetails,
    fetchUserAddToCart,
    fetchUserAddToFavorite,
    fetchUserOrderProduct,
    fetchUserMessage,
    fetchUserBookingProduct,
  } = useContext(Context);

  console.log("generalContext", generalContext.fetchUserDetails());

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);

      fetchUserDetails(); // Thong tin tai khoan
      fetchUserAddToCart(); // Thong tin gio hang
      fetchUserAddToFavorite(); //Thong tin trang san pham yeu thich
      fetchUserOrderProduct(); // Thong tin don hang
      fetchUserMessage(); // Thong tin tin nhắn
      fetchUserBookingProduct();

      navigate("/");
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
  
      // Send token to backend for verification and JWT generation
      const response = await axios.post(SummaryApi.loginWithGoogle.url, { token }, { withCredentials: true });
  
      if (response.data.success) {
        toast.success(response.data.message);
  
        // Tải lại thông tin chi tiết người dùng và dữ liệu khác sau khi đăng nhập thành công
        await fetchUserDetails(); 
        await fetchUserAddToCart(); 
        await fetchUserAddToFavorite(); 
        await fetchUserOrderProduct(); 
        await fetchUserMessage(); 
        await fetchUserBookingProduct();
  
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Google login failed");
    }
  };
  

  useEffect(() => {
    // Initialize Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "539949192001216",
        cookie: true,
        xfbml: true,
        version: "v15.0",
      });
    };
  }, []);

  // Handle Facebook Login
  const handleFacebookLogin = () => {
    window.FB.login(
      (response) => {
        // Wrap async actions inside a regular function
        (async () => {
          if (response.authResponse) {
            const { accessToken } = response.authResponse;

            try {
              // Send access token to the backend
              const res = await axios.post(
                SummaryApi.loginWithFacebook.url,
                {
                  accessToken,
                },
                { withCredentials: true }
              );

              if (res.data.success) {
                console.log("Login successful:", res.data);
                toast.success(res.data.message);

                // Load user details and other data after successful login
                await fetchUserDetails();
                await fetchUserAddToCart();
                await fetchUserAddToFavorite();
                await fetchUserOrderProduct();
                await fetchUserMessage();
                await fetchUserBookingProduct();

                navigate("/");
              }
            } catch (error) {
              console.error("Facebook login failed:", error);
            }
          } else {
            console.log("User cancelled login or did not fully authorize.");
          }
        })(); // Immediately invoke the async function
      },
      { scope: "public_profile,email" }
    );
  };

  // console.log("data login", data);

  return (
    <section
      id="login"
      style={{
        backgroundImage: `url(${bookBg})`, // Use the background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "110vh",
      }}
    >
      <div className="mx-auto container p-4 flex items-center justify-center h-full">
        <div className="hidden lg:flex w-1/2 ">
          <img src={homeImg} alt="Coffee Cup" className="w-full h-auto" />
        </div>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <div className="bg-white dark:bg-gray-100 dark:border  p-5 w-full max-w-sm mx-5 focus-within:shadow-md rounded-sm">
            
            {/* <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
              <img src={loginIcons} alt="login icons" />
            </div> */}
            <div className="pt-2 flex justify-center items-center mx-auto relative overflow-hidden hover:scale-125 duration-300 ease-in-out">
              <Link to={"/"} className="flex-shrink-0">
                <img
                  src={caffee}
                  alt=""
                  className="w-auto h-auto max-w-[200px] max-h-[110px] object-contain"
                />
              </Link>
            </div>
            <form
              action=""
              className="pt-3 flex flex-col gap-2"
              onSubmit={handleSubmit}
            >
              <div className="grid">
                {/* <label htmlFor="">Email</label> */}
                <div className="bg-[#d1c8c1] p-4 rounded-sm my-2">
                  <input
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={handleOnChange}
                    placeholder="EMAIL..."
                    className="w-full h-full outline-none bg-transparent font-montserrat"
                  />
                </div>
              </div>
              <div className="grid">
                {/* <label htmlFor="">Password</label> */}
                <div className="bg-[#d1c8c1] p-4 flex rounded-md my-2">
                  <input
                    type={showPassword ? "" : "password"}
                    name="password"
                    value={data.password}
                    onChange={handleOnChange}
                    placeholder="PASSWORD..."
                    className="w-full h-full outline-none bg-transparent"
                  />
                  <div
                    className="cursor-pointer text-lg"
                    onClick={() => setShowPassword((preve) => !preve)}
                  >
                    <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                  </div>
                </div>
                {/* <Link
                to={"/forgot-password"}
                className="my-1.5 block w-fit ml-auto hover:underline hover:text-amber-900"
              >
                Forgot password?
              </Link> */}
              </div>
              <button className="bg-amber-900 text-white hover:bg-amber-950 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 duration-200 ease-in-out transition-all mx-auto block my-2 updateBtnColor">
                Login
              </button>
            </form>
            
            <div className="border-t-2 mt-2">

           <div className="w-full justify-center items-center flex mt-4">
              <div>
                <button
                  onClick={handleFacebookLogin}
                  style={{
                    backgroundColor: "#4267B2",
                    color: "#fff",
                    padding: "10px 20px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                    transition: "transform 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    style={{ marginRight: "8px" }}
                  />
                  Login with Facebook
                </button>
              </div>{" "}
            </div>

            <div className="w-full justify-center items-center flex pt-3 my-2 hover:scale-110 duration-200 ease-in-out">
              <GoogleLogin
              onSuccess={handleGoogleLogin} onError={() => console.log("Login Failed")}
              /> 
            </div>
            
            
 </div>
            <p className="my-1">
              Don't have account ?{" "}
              <Link
                to={"/Sign-up"}
                className="text-amber-900 hover:text-amber-950 hover:underline "
              >
                Sign-up
              </Link>
            </p>
          </div>
        </GoogleOAuthProvider>
      </div>
    </section>
  );
};

export default Login;
