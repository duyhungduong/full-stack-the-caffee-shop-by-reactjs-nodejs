const bookingTablbeModel = require("../../models/bookingTable");

const bookingTodayController = async (request, response) => {
  try {
    const currentUserId = request.userId;

    // Xác định thời gian đầu và cuối ngày hôm nay
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Truy vấn booking có `arrivalTime` trong khoảng hôm nay
    const bookingList = await bookingTablbeModel
      .find({
        arrivalTime: { $gte: startOfDay, $lte: endOfDay },
      })
      .populate("tableId")
      .sort({ createdAt: -1 });

    response.json({
      data: bookingList,
      message: "Booking list for today",
      success: true,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

module.exports = bookingTodayController;
