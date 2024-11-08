const userModel = require("../../models/userModel");

async function userDetailsController(req, res) {
  try {
    // console.log("userId", req.userId);

    const user = await userModel.findById(req.userId);

    res.status(200).json({
      data: user,
      error: false,
      message: "User details fetched successfully",
      success: true,
    });
    // console.log("user Details", user);
  } catch (err) {
    res.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailsController;
