const uploadProductPermission = require("../../helper/permission");
const tableModel = require("../../models/tableModel");

async function UploadTableController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    const uploadTable = new tableModel(req.body);
    const saveTable = await uploadTable.save();

    res.status(201).json({
      message: "Table uploaded successfully",
      error: false,
      success: true,
      data: saveTable,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = UploadTableController;
