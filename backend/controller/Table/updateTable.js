const uploadProductPermission = require("../../helper/permission");
const tableModel = require("../../models/tableModel");

async function updateTableController(req, res) {
  try {
    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permission denied");
    }
    const { _id, ...resBody } = req.body;

    const updateTable = await tableModel.findByIdAndUpdate(_id, resBody);

    res.json({
      message: "Update successfully!!!",
      data: updateTable,
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

module.exports = updateTableController;
