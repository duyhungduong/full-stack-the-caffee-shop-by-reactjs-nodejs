import React, { useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import { useSelector } from "react-redux";
import { RxAvatar } from "react-icons/rx";

const SendMessageToAll = () => {
  const [messageContent, setMessageContent] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user?.user);

  const handleSendMessage = async () => {
    if (!messageContent.trim()) {
      toast.error("Nội dung tin nhắn không được để trống");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.sendToAll.url, {
        method: SummaryApi.sendToAll.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageContent,
          senderId: user?._id,
        }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        setMessageContent("");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Lỗi khi gửi tin nhắn");
      console.log("Lỗi khi gửi tin nhắn", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-coffee-background py-5 h-[calc(100vh-190px)]">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-lg mx-5">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Gửi Thông Báo
        </h2>
        <div className="w-36 h-36 mx-auto relative overflow-hidden rounded-full border-4 border-coffee-brown shadow-md">
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <RxAvatar className="w-full h-full text-gray-400" />
          )}
        </div>
        <div className="mt-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">
              {user?.name || "Admin Name"}
            </h2>
            <p className="text-gray-500 mt-1">{user?.email || "Email not provided"}</p>
            <p className="text-gray-500 mt-1">{user?.role || "Role not provided"}</p>
          </div>
        </div>
        <div className="mt-8">
          <div className="rounded-lg shadow-lg p-6 flex flex-col gap-4 hover:shadow-xl transition-shadow bg-green-50 border border-green-200 hover:border-green-500">
            {/* Textarea */}
            <div className="flex items-center gap-4">
              <textarea
                className="border-none w-full p-2 rounded h-40 resize-none text-gray-700 bg-green-50 focus:outline-none focus:border-none placeholder:text-gray-500"
                rows="4"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Nhập nội dung tin nhắn..."
              ></textarea>
            </div>
          </div>
        </div>

        <button
          className={`mt-8 px-4 py-2 bg-gradient-to-r from-coffee-beige to-coffee-light text-coffee-dark hover:from-pastel-teal hover:to-pastel-blue-dark rounded-full w-full ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          } transition-colors`}
          onClick={handleSendMessage}
          disabled={loading}
        >
          {loading ? "Đang gửi..." : "Gửi tin nhắn"}
        </button>
      </div>
    </div>
  );
};

export default SendMessageToAll;
