import React, { useContext, useEffect, useState } from "react";
import Context from "../context";
import SummaryApi from "../common";
import moment from "moment";
import { useSelector } from "react-redux";
import { MdMarkChatUnread, MdMarkChatRead } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";

const Notification = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const user = useSelector((state) => state?.user?.user);
  // console.log("user", user?._id);

  const {
    
    fetchUserMessage,
  } = useContext(Context);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.getMessage.url, {
      method: SummaryApi.getMessage.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const responseData = await response.json();
    console.log("responseData getMessage", responseData);

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const toggleReadStatus = async (id) => {
    setData((prevData) =>
      prevData.map((notification) =>
        notification._id === id
          ? { ...notification, read: !notification.read }
          : notification
      )
    );
    await markAsRead(id);
  };

  const markAsRead = async (id) => {
    try {
      const response = await fetch(SummaryApi.markMessage.url, {
        method: SummaryApi.markMessage.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageId: id }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        console.log("Message marked as read:", responseData.data);
        fetchUserMessage()
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Notifications
      </h2>
      {data.length === 0 && !loading && (
        <p className="bg-slate-600 py-7 text-center text-white text-lg">
          No messages in your Notification
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading
          ? loadingCart.map((_, index) => (
              <div
                key={"Loading" + index}
                className="w-full bg-slate-300 h-40 my-3 border border-slate-50 rounded-lg skeleton-loading"
              ></div>
            ))
          : data.map((notification) => (
              <div
                key={notification._id}
                className={`rounded-lg shadow-lg p-6 flex flex-col gap-4 hover:shadow-xl transition-shadow 
                  ${
                    notification.read
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={notification?.sender?.profilePic}
                      alt={notification?.sender?.name}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div className="flex-1">
                    {notification?.sender?.name === user?.name ? (
                      <h3 className="text-lg font-semibold text-gray-900 truncate italic">
                        Tôi
                      </h3>
                    ) : (
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {notification?.sender?.name}
                      </h3>
                    )}

                    <p className="text-sm flex items-center gap-3 text-gray-500 capitalize italic">
                      <RiAdminFill /> {notification?.sender?.role}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      {moment(notification?.createdAt).format("DD MMM YYYY")}
                    </p>
                  </div>
                  <div
                    className="text-pastel-pink hover:text-pastel-blue-dark cursor-pointer"
                    onClick={() => toggleReadStatus(notification._id)}
                  >
                    {notification.read ? (
                      <MdMarkChatRead size={24} />
                    ) : (
                      <MdMarkChatUnread size={24} />
                    )}
                  </div>
                </div>
                <div className="bg-slate-100 p-4 rounded-lg shadow-inner">
                  <p className="text-gray-700 text-base leading-relaxed">
                    {notification?.message}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Notification;
