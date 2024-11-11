const bookingTableModel = require("../../models/bookingTable");
const tableModel = require("../../models/tableModel");
const userModel = require("../../models/userModel");
const { sendBookingConfirmationEmail } = require("../../helper/emailHelper");

async function addToBookingTableController(req, res) {
  try {
    const { tableId, arrivalTime, endTime, notes } = req.body; // Extract details from the body
    const currentUser = req.body.userId; // Get userId from the verified token

    // Check if the table is already booked by this user at the same time
    const isTableAvailable = await bookingTableModel.findOne({
      tableId,
      userId: currentUser,
      arrivalTime,
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

    // Create payload with the request information
    const payload = {
      tableId,
      userId: currentUser,
      arrivalTime,
      endTime,
      notes,
    };

    const user = await userModel.findById(payload.userId); // Find user for email details
    const table = await tableModel.findById(payload.tableId); // Find table for table details

    // Send booking confirmation email
    await sendBookingConfirmationEmail(user.email, user.name, table.tableImage[0], {
      arrivalTime: payload.arrivalTime,
      endTime: payload.endTime,
      tableInfo: `Table ${table.tableNumber} - ${table.tableArea} - ${table.tableType}`,
    });

    // Save the new booking
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
