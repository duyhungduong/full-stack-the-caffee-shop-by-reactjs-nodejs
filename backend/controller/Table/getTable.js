const tableModel = require("../../models/tableModel");

const getTableController = async (req, res) => {
  try {
    const allTable = await tableModel.find().sort({ createdAt: -1 });
    res.json({
      message: "All Table",
      success: true,
      error: false,
      data: allTable,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getTableController;
