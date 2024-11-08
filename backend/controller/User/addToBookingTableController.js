const bookingTableModel = require("../../models/bookingTable");

async function addToBookingTableController(req, res) {
  try {
    const { tableId, arrivalTime, endTime, notes } = req.body; // Lấy các thông tin từ body
    const currentUser = req.body.userId // Lấy userId từ token đã xác thực

    // Kiểm tra xem bàn đã được đặt bởi user này chưa
    const isTableAvailable = await bookingTableModel.findOne({
      tableId,
      userId: currentUser,
      arrivalTime
    });


    if (isTableAvailable) {
      return res.status(400).json({
        message: "Table is already in your Booking",
        success: false,
        error: true,
      });
    }
    
    if (!arrivalTime) {
        throw new Error("Please provide arrivalTime");
    }
    

    // Tạo payload với thông tin từ request
    const payload = {
      tableId : tableId,
      userId: currentUser,
      arrivalTime: arrivalTime,
      endTime: endTime,
      notes: notes,
    };

    console.log("payload booking", payload)

    // Lưu booking mới
    const newAddToBooking = new bookingTableModel(payload);
    const savedBooking = await newAddToBooking.save();

    return res.status(201).json({
      data: savedBooking,
      success: true,
      error: false,
      message: "Booking successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Something went wrong",
      error: true,
      success: false,
    });
  }
}

module.exports = addToBookingTableController;
