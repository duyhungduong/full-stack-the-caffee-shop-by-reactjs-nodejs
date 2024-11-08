const mongoose = require("mongoose");

const addToFavorite = new mongoose.Schema(
  {
    productId: {
      ref: "product",
      type: String,
    },
    userId : String,
  },
  {
    timestamps: true,
  }
);

const addToFavoriteModel = mongoose.model("addToFavorite", addToFavorite);

module.exports = addToFavoriteModel;