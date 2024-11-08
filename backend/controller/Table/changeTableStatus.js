const tableModel = require("../../models/tableModel");

async function changeTableStatus(req, res) {
  try {
    const sessionTable = req.tableId;

    const { tableId, tableNumber, tableArea, tableType, tableImage, description , seatCount , tableStatus , isAvailableTable } = req.body;

    const payload = {
      ...(tableNumber && { tableNumber: tableNumber }),
      ...(tableArea && { tableArea: tableArea }),
      ...(tableType && { tableType: tableType }),
      ...(tableImage && { tableImage: tableImage }),
      ...(description && { description: description }),
      ...(seatCount && { seatCount: seatCount }),
      ...(tableStatus && { tableStatus: tableStatus }),
      ...({ isAvailableTable: isAvailableTable }),
    };

    const table = await tableModel.findById(sessionTable);
    console.log("payload change tablestatus", payload)

    console.log("table status before change: ", table);

    const updateUser = await tableModel.findByIdAndUpdate(tableId, payload);
    res.json({
      data: updateUser,
      message: "Cập nhật thông tin bàn đã đặt thành công!!",
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

module.exports = changeTableStatus;