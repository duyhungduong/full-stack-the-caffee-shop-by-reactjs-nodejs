const messageModel = require("../../models/messageModel");

const addToMessageView = async (req, res) => {
  try {
    const currentUser = req.userId;
    const allMessage = await messageModel
      .find({ receiver: currentUser })
      .populate("sender").sort({ createdAt : -1 });

    //console.log("allMessage", allMessage)

    res.json({
      data: allMessage,
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = addToMessageView;
