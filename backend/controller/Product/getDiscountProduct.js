const productModel = require("../../models/productModel");

const getDiscountProductController = async (req, res) => {
  try {
    // Tìm các sản phẩm có sellingPrice < price
    const discountedProducts = await productModel.find({
      $expr: { $lt: ["$sellingPrice", "$price"] },
    });
    //console.log("discountedProducts ",discountedProducts)
    if (discountedProducts.length > 0) {
      return res.status(200).json({
        success: true,
        data: discountedProducts,
        error: false,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Không có sản phẩm nào có giá khuyến mãi thấp hơn giá gốc",
        error: true,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = getDiscountProductController