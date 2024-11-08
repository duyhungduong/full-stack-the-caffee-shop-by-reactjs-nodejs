const messageModel = require("../../models/messageModel");

const updateMessage = async(req, res) => {
  try {
    const {messageId} = req.body;
    console.log("sessionMessage", messageId)
    const updatedMessage = await messageModel.findByIdAndUpdate(
        messageId,
      { read: true },
      { new: true } // Trả về document đã cập nhật
    );

    if (!updatedMessage) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Message marked as read",
      data: updatedMessage,
      error: false,
    });
  } catch (err) {
    console.error("Error updating message status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error" || err,
      error: true,
    });
  }
}

module.exports = updateMessage;
