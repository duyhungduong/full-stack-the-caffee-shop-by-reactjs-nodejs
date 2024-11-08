const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    tableNumber: String,
        tableArea: String,
        tableType: String,
        tableImage: [],
        description: String,
        seatCount: Number,
        tableStatus: String,
        isAvailableTable: Boolean,
  },
  {
    timestamps: true,
  }
);

const tableModel = mongoose.model("table", tableSchema);

module.exports = tableModel;