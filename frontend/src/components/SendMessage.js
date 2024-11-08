import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SendMessage = ({
  onClose,
  sender, // Tham chiếu đến ObjectId của sender
  receiver, // Tham chiếu đến ObjectId của receiver
  
  callFunc,
}) => {
  const [data, setData] = useState({
    sender: sender,
    receiver: receiver,
    message: "",
    read: false,
  });
  console.log("sender", sender)
  console.log("receiver", receiver)
  

  const updateUser = async () => {
    const fetchResponse = await fetch(SummaryApi.sendMessageToreceiver.url, {
      method: SummaryApi.sendMessageToreceiver.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await fetchResponse.json();
    console.log("sendMessageToreceiver", responseData)

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }
    if (responseData.error) {
      toast.error(responseData.message);
    }

    //console.log("Role updated: ", responseData);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto  " onClick={onClose}>
          <IoClose
            className="text-xl hover:text-red-600
          "
          />
        </button>
        <h1 className="pb-4 text-lg font-medium">SendMessage</h1>
        <label htmlFor="message">Tin nhắn </label>
          <input
            type="text"
            name="message"
            id="message"
            placeholder=" Nhập tin nhắn ... "
            value={data.message}
            onChange={handleOnChange}
            className="p-3 bg-slate-100 border rounded"
            required
          />
        <button
          className="w-fit mx-auto block border p-2 rounded-full updateBtnColor btnColor "
          onClick={updateUser}
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default SendMessage;
