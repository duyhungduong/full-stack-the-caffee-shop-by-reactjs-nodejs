const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    tableId: {
      ref: "table",
      type: String,
    },
    userId: {
      ref: "user",
      type: String,
    },
    arrivalTime:  Date,
    endTime: Date,
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

const bookingTablbeModel = mongoose.model("booking", bookingSchema);

module.exports = bookingTablbeModel;
