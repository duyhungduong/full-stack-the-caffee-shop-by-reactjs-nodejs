import React, { useEffect, useState } from "react";
import displayVNCurrency from "../helper/displayCurrency";
import moment from "moment";
import SummaryApi from "../common";

const OrderPage = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: "include",
    });

    const responseData = await response.json();

    setData(responseData.data);
    console.log("order list", responseData);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const totalPrice = data.reduce((preve, curr) => preve + curr.totalAmount, 0);

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-coffee-brown">Your Orders</h1>
        <p className="text-gray-600 mt-2">Here is a list of your recent orders.</p>
      </div>

      {/* No Orders */}
      {!data[0] && (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 text-lg">No Orders Available</p>
        </div>
      )}

      {/* Order List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data?.map((item, index) => (
  <div
    key={item.userId + index}
    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
  >
    <div className="p-4 border-b bg-slate-50">
      <p className="font-medium text-lg text-gray-800">
        {moment(item.createdAt).format("LLL")}
      </p>
    </div>

    <div className="p-4">
      {item?.productDetails?.map((product, index) => (
        <div
          key={product?.productId + index}
          className="flex gap-3 bg-slate-100 mb-4 p-3 rounded-lg shadow-sm"
        >
          <img
            src={product?.image?.[0] || "fallback-image.jpg"} // Kiểm tra tồn tại
            className="w-24 h-24 object-scale-down rounded-md"
            alt="Product"
          />
          <div>
            <h2 className="font-semibold text-lg text-gray-700 mb-1">
              {product?.name || "No Name"}
            </h2>
            <div className="text-gray-600">
              <p className="text-lg text-red-500">
                {displayVNCurrency(product?.price || 0)}
              </p>
              <p>Quantity: {product?.quantity || 0}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="p-4 border-t bg-slate-50">
      <div className="mb-2">
        <h3 className="text-lg font-medium text-gray-800">
          Payment Details
        </h3>
        <p className="text-gray-600">
          Payment Method: {item?.paymentDetails?.payment_method_type?.[0] || "N/A"}
        </p>
        <p className="text-gray-600">
          Payment Status: {item?.paymentDetails?.payment_status || "N/A"}
        </p>
      </div>

      <div className="mb-2">
        <h3 className="text-lg font-medium text-gray-800">
          Shipping Details
        </h3>
        {item?.shipping_options?.map((shipping, index) => (
          <div key={shipping?.shipping_rate || index} className="text-gray-600">
            <p>
              Shipping Amount:{" "}
              {shipping?.shipping_amount === 0 ? (
                <span className="text-sm italic text-gray-500">
                  Free Shipping
                </span>
              ) : (
                displayVNCurrency(shipping?.shipping_amount || 0)
              )}
            </p>
          </div>
        ))}
      </div>

      <div className="text-right font-semibold text-lg text-gray-800">
        Total: {displayVNCurrency(item?.totalAmount || 0)}
      </div>
    </div>
  </div>
))}

      </div>
    </div>
  );
};

export default OrderPage;
