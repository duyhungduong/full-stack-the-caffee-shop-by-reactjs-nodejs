const messageModel = require("../../models/messageModel");
const userModel = require("../../models/userModel");

const sendMessageToAllUserController = async (req, res) => {
  try {
    const { messageContent, senderId } = req.body;

    if (!messageContent || !senderId) {
      return res.status(400).json({
        success: false,
        message: "Thiếu nội dung tin nhắn hoặc ID người gửi",
        error: true,
      });
    }
    const users = await userModel.find({});

    const messagePromises = users.map((user) => {
      const newMessage = new messageModel({
        sender: senderId, // ID của người gửi
        receiver: user._id, // Gửi tin nhắn tới từng người dùng
        message: messageContent,
        read: false, // Mặc định là chưa đọc
      });
      return newMessage.save(); // Lưu mỗi tin nhắn vào cơ sở dữ liệu
    });

    // Chờ tất cả các tin nhắn được lưu
    await Promise.all(messagePromises);

    res
      .status(200)
      .json({
        success: true,
        message: "Tin nhắn đã được gửi đến tất cả người dùng",
        error: false,
      });
  } catch (err) {
    console.log("Error send Message To AllUser:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error" || err,
      error: true,
    });
  }
};
module.exports = sendMessageToAllUserController