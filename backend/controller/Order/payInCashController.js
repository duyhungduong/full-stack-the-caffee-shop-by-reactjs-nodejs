const addToCartModel = require("../../models/cartProduct");
const orderModel = require("../../models/orderProductModel")
const userModel = require("../../models/userModel");

const payInCashController = async (req, res) => {
  try {
    const { cartItems, email, userId, totalAmount } = req.body;

    const user = await userModel.findOne({ _id: req.userId });
    console.log("user payInCashController", user);
    console.log("userId payInCashController", userId);

    if(!cartItems){
      throw new Error("Please provide cartItems");
    }

    const productDetails = cartItems.map((item) => ({
      productId: item.productId._id, // hoặc item.productId tùy vào cấu trúc của cartItems
      name: item.productId.productName,
      price: item.productId.sellingPrice,
      quantity: item.quantity,
      image: item.productId.productImage, // Giả sử mảng image là productImage
    }));

    const payload = {
      productDetails: productDetails,
      email: email,
      userId: userId,
      paymentDetails: {
        payment_method_type: ["cash"],
        payment_status: "paid", // Hoặc trạng thái mà bạn muốn
        paymentId: "",
      },
      shipping_options: {
        shipping_amount: 0,
        shipping_rate: "shr_1Q3vukG27K4Z31a08ZqEfxxP",
      },
      totalAmount: totalAmount,
    };
    

    const newAddToOrder = new orderModel(payload);
    const saveOrder =await newAddToOrder.save();
    if(saveOrder?._id){
      const deleteCartItem = await addToCartModel.deleteMany({ userId : userId })
  }
    return res.status(201).json({
      data: saveOrder,
      success: true,
      message: "Order saved successfully",
      error: false,
    });
  } catch (error) {
    res.json({
      message: error?.message || error,
      error: true,
      success: false,
    });
  }
};
module.exports = payInCashController;
