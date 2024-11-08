const mongoose = require("mongoose");

const addToCartTable = new mongoose.Schema(
  {
    tableId: String,
    quantity: Number,
    userId: String,
  },
  {
    timestamps: true,
  }
);

const addToCartTableModel = mongoose.model("addToCartTable", addToCartTable);

module.exports = addToCartTableModel;
