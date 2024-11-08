const bookingTableModel = require("../../models/bookingTable");
const tableModel = require("../../models/tableModel");

const searchTableController = async (req, res) => {
  try {
    const { tableArea, tableType, arrivalTime, endTime } = req.body;

    // Chuyển đổi các tham số thời gian thành đối tượng Date
    // const arrivalDate = new Date(arrivalTime);
    // const endDate = new Date(endTime);

    // Tạo đối tượng điều kiện tìm kiếm
    let searchConditions = {};
    if (tableArea) searchConditions.tableArea = tableArea;
    if (tableType) searchConditions.tableType = tableType;

    // Tìm tất cả các bàn phù hợp với điều kiện lọc
    let tables = await tableModel.find(searchConditions);

    // Tìm tất cả các đặt chỗ trong khoảng thời gian được chỉ định
    const bookings = await bookingTableModel.find({
      $or: [
        {
          arrivalTime: { $lt: endTime },
          endTime: { $gt: arrivalTime },
        },
      ],
    });

    // Lọc ra các bàn đã được đặt
    const bookedTableIds = bookings.map((booking) => booking.tableId);

    // Lọc danh sách bàn để chỉ hiển thị các bàn chưa được đặt
    const availableTables = tables.filter(
      (table) => !bookedTableIds.includes(table._id.toString())
    );

    console.log("searchTableController availableTables", availableTables);

    res.status(200).json({
      data: availableTables,
      message: "Tìm kiếm thành công",
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

module.exports = searchTableController;
