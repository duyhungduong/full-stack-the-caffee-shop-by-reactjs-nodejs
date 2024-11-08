const messageModel = require("../../models/messageModel");
const userModel = require("../../models/userModel");

async function addToMessageController(req, res) {
  try {
    const { sender, receiver, message, read } = req.body;

    // const sender = await userModel.findOne({ senderEmail });
    // const receiver = await userModel.findOne({ receiverEmail });

    if (!sender) {
        throw new Error("Please provide sender");
    }
    if (!receiver) {
        throw new Error("Please provide receiver");
    }
    

    const payload = {
      sender: sender, 
      receiver: receiver, 
      message: message || "Hello",
      read: read || false,
    };

    const newMessage = new messageModel(payload);
    const saveMessage = await newMessage.save();

    return res.status(201).json({
      data: saveMessage,
      success: true,
      error: false,
      message: "Save Message successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Something went wrong",
      error: true,
      success: false,
    });
  }
}
module.exports = addToMessageController