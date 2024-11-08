const messageModel = require("../../models/messageModel");

const countMessage = async (req, res) => {
  try {
    const userId = req.userId;
    const unreadCount = await messageModel.countDocuments({
      receiver: userId,
      read: false,
    });
    // console.log("unreadCount", unreadCount)

    return res.status(200).json({
      success: true,
      message: "Unread message count fetched successfully",
      data: {
        count: unreadCount || 0,
      },
      error: false,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: false,
      success: false,
    });
  }
};

module.exports = countMessage;
