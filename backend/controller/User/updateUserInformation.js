const userModel = require("../../models/userModel");

async function updateUserInformationController(req, res) {
  try {
    const { userId, email, name, phone, address, role } = req.body;

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(phone && { phone: phone }),
      ...(address && { address: address }),
      ...(role && { role: role }),
    };

    const updateUser = await userModel.findByIdAndUpdate(userId, payload);

    res.json({
      message: "Update successfully!!!",
      data: updateUser,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
module.exports = updateUserInformationController;