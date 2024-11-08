const addToCartTableModel = require("../../models/cartTable");

const addToCartTableController = async (req, res) => {
  try {
    const { tableId } = req?.body;
    const currentUser = req.userId;

    const isTableAvailable = await addToCartTableModel.findOne({ tableId });

    // console.log("isTableAvailable ", isTableAvailable);

    if (isTableAvailable) {
      return res.json({
        message: "Table is already in your cart",
        success: true,
        error: false,
      });
    }

    const payload = {
      tableId: tableId,
      userId: currentUser,
      quantity: 1,
    };

    const newAddToCart = new addToCartTableModel(payload);
    const saveProduct = await newAddToCart.save();

    return res.json({
      data: saveProduct,
      message: "Table added to cart successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartTableController;
