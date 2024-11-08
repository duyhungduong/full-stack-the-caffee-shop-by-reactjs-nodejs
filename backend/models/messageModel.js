const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      ref: "user", // Liên kết đến mô hình User
      required: true,
    },
    receiver: {
      type: String,
      ref: "user", // Liên kết đến mô hình User
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Lưu trữ thời gian tạo và cập nhật
  }
);

const messageModel = mongoose.model("message", messageSchema);

module.exports = messageModel;
