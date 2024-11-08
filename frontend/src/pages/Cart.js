import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayVNCurrency from "../helper/displayCurrency";
import { MdDelete } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsCashCoin } from "react-icons/bs";
import { FaCcVisa } from "react-icons/fa6";
import { BsBank2 } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import image0 from "../assest/transferImg.jpg";
import { toast } from "react-toastify";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);
  const [openTransfer, setOpenTransfer] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToProductView.url, {
      method: SummaryApi.addToProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    //setLoading(false);
    const responseData = await response.json();
    console.log("responseData cart", responseData);

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    //  fetchData();
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );
  // console.log("totalQty", totalQty)
  // console.log("totalPrice", totalPrice)

  const handlePayment = async () => {
    //const stripePromise = await loadStripe('pk_test_51Q3uSAG27K4Z31a03jXRBSu4hP801vrr3cBVu3smG5OWj4AWolCXoOTynMbMxjGLEeGeFvu5ZZ6VsS5qim1HY7gJ00l1RmpCII');
    const stripePromise = await loadStripe(
      process.env.REACT_APP_STRIPE_PUBLIC_KEY
    );

    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartItems: data,
      }),
    });
    const responseData = await response.json();

    if (responseData?.id) {
      stripePromise.redirectToCheckout({ sessionId: responseData.id });
    }

    console.log("responseData", responseData);
  };

  const user = useSelector((state) => state?.user?.user);
  // console.log(" user?.email", user?._id)

  const handleCashPayment = async () => {
    const totalAmount = totalPrice; // Hoặc giá trị tổng bạn đã tính
    const response = await fetch(SummaryApi.payInCash.url, {
      method: SummaryApi.payInCash.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartItems: data,
        email: user?.email, // Giả sử bạn có thông tin email người dùng trong context
        userId: user?._id, // Giả sử bạn có thông tin userId trong context
        totalAmount: totalAmount,
      }),
    });

    const responseData = await response.json();
    console.log("handleCashPayment responseData", responseData);
    if (responseData.success) {
      // Bạn có thể xử lý để thông báo cho người dùng đã lưu đơn hàng thành công
      // alert("Order saved successfully!");
      toast.success(responseData.message)
      navigate("/success");
      // Nếu cần, bạn có thể xóa giỏ hàng sau khi thanh toán
      context.fetchUserAddToCart(); // Cập nhật lại giỏ hàng
    } else {
      alert("Error saving order");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart</h2>

      {data.length === 0 && !loading && (
        <p className="bg-slate-600 py-7 text-center text-white text-lg">
          No items in your cart
        </p>
      )}

      <div className="flex flex-col lg:flex-row gap-7 lg:justify-between">
        {/* Sản phẩm trong giỏ hàng */}
        <div className="w-full lg:w-3/4">
          {loading
            ? loadingCart.map((_, index) => (
                <div
                  key={"Add to Cart Loading" + index}
                  className="w-full bg-slate-300 h-40 my-3 border border-slate-50 rounded skeleton-loading"
                ></div>
              ))
            : data.map((product) => (
                <div
                  key={product._id}
                  className="w-full bg-white rounded-lg shadow-lg p-4 flex gap-4 mb-6 transition-all hover:shadow-xl"
                >
                  <div className="w-40 h-40 bg-gray-100 flex items-center justify-center">
                    <img
                      src={product?.productId?.productImage[0]}
                      alt={product?.productId?.productName}
                      className="object-contain h-full"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {product?.productId?.productName}
                      </h2>
                      <p className="text-gray-500 capitalize">
                        {product?.productId?.category}
                      </p>
                      <p className="font-semibold text-gray-500 line-through">
                        {displayVNCurrency(product?.productId?.price)}
                      </p>
                      <p className="font-semibold text-2xl text-coffee-green">
                        {displayVNCurrency(product?.productId?.sellingPrice)}
                      </p>
                    </div>
                    <div className="flex items-center mt-3">
                      <button
                        onClick={() =>
                          decraseQty(product?._id, product?.quantity)
                        }
                        className="w-9 h-9 bg-gray-200 text-gray-800 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="mx-4 text-lg">{product?.quantity}</span>
                      <button
                        onClick={() =>
                          increaseQty(product?._id, product?.quantity)
                        }
                        className="w-9 h-9 bg-gray-200 text-gray-800 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    onClick={() => deleteCartProduct(product?._id)}
                  >
                    <MdDelete size={24} />
                  </div>
                </div>
              ))}
        </div>

        {/* Tổng kết giỏ hàng */}
        {data[0] && (
          <div className="w-full lg:w-1/4 bg-white rounded-lg shadow-lg p-6 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Summary
              </h2>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">Total Quantity</p>
                <p className="font-semibold text-gray-800">{totalQty}</p>
              </div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">Total Price</p>
                <p className="font-semibold text-coffee-green">
                  {displayVNCurrency(totalPrice)}
                </p>
              </div>
              <button
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md mb-4"
                onClick={handleCashPayment}
              >
                <BsCashCoin className="text-2xl" /> Pay in Cash
              </button>

              <button
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-md mb-4"
                onClick={() => setOpenTransfer(true)}
              >
                <BsBank2 className="text-2xl" /> Transfer
              </button>

              <button
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md"
                onClick={handlePayment}
              >
                <FaCcVisa className="text-2xl" /> Proceed to Checkout
              </button>

              
            </div>
          </div>
        )}
      </div>
      {openTransfer && (
        <div className="fixed inset-0 bg-slate-100 bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-[90%] max-h-[90%] overflow-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-bold text-lg sm:text-xl">Bank Transfer</h2>
              <div
                className="text-2xl text-gray-600 hover:text-red-600 cursor-pointer"
                onClick={() => setOpenTransfer(false)}
              >
                <IoClose />
              </div>
            </div>
            <div className="p-4 flex justify-center items-center">
              {/* Hiển thị ảnh giữ đúng tỉ lệ */}
              <img
                src={image0}
                alt="Bank Transfer QR Code"
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            </div>
            <div className="p-4">
              <button
                onClick={handleCashPayment}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Xác nhận đã thanh toán
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
