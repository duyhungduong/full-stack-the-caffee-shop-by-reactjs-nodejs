// src/controllers/bookingController.js
const Booking = require("../../models/bookingTable"); // Import your booking model
const tableModel = require("../../models/tableModel");
const userModel = require("../../models/userModel");
const {
  sendBookingConfirmationEmail,
} = require("../Booking/sendBookingConfirmationEmail");

const createBooking = async (req, res) => {
  try {
    const { tableId, userId, arrivalTime, endTime, notes } = req.body;

    const newBooking = await Booking.create({
      tableId,
      userId,
      arrivalTime,
      endTime,
      notes,
    });

    const user = await userModel.findById(userId); // Find user for email details
    const table = await tableModel.findById(tableId); // Find table for table details

    // Send booking confirmation email
    await sendBookingConfirmationEmail(user.email, user.name, {
      arrivalTime: newBooking.arrivalTime,
      endTime: newBooking.endTime,
      tableInfo: `Table ${table.tableNumber} - ${table.tableArea} - ${table.tableType}`,
    });

    res
      .status(200)
      .json({
        success: true,
        message: "Booking created and email sent successfully.",
        error: false,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error creating booking or sending email.",
        error: true,
      });
  }
};

module.exports = { createBooking };
