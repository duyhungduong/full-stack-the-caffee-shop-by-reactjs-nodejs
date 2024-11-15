const bookingTablbeModel = require("../../models/bookingTable");

const countTodayBookings = async (request, response) => {
  try {
    // Xác định thời điểm bắt đầu và kết thúc của ngày hôm nay
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Đếm số lượng booking có arrivalTime trong khoảng thời gian hôm nay
    const todayBookingCount = await bookingTablbeModel.countDocuments({
      arrivalTime: { $gte: startOfDay, $lte: endOfDay },
    });

    response.json({
      data: {
        count: todayBookingCount,
      },
      message: "Total bookings for today",
      success: true,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

module.exports = countTodayBookings;
