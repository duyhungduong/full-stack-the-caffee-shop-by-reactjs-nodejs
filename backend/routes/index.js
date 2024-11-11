const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/User/userSignUp");
const userSignInController = require("../controller/User/userSignIn");
const userDetailsController = require("../controller/User/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/User/userLogout");
const allUsers = require("../controller/User/allUsers");
const updateUser = require("../controller/User/updateUser");
const UploadProductController = require("../controller/Product/uploadProduct");
const getProductController = require("../controller/Product/getProduct");
const updateProductController = require("../controller/Product/updateProduct");
const UploadTableController = require("../controller/Table/uploadTable");
const getTableController = require("../controller/Table/getTable");
const updateTableController = require("../controller/Table/updateTable");
const getCategoryProduct = require("../controller/Product/getCategoryProduct");
const getTypeTable = require("../controller/Table/getTypeTable");
const getAreaTable = require("../controller/Table/getAreaTable");
const getCategoryWiseProduct = require("../controller/Product/getCategoryWiseProduct");
const getProductDetails = require("../controller/Product/getProductDetails");
const addToCartController = require("../controller/User/addToCartController");
const addToCartTableController = require("../controller/Table/addToCartTableController");
const countAddToCartTable = require("../controller/Table/countAddToCartTable");
const countAddToCartProduct = require("../controller/User/countAddToCartProduct");
const addToCartViewProduct = require("../controller/User/addToCartProductView");
const updateAddToCartProduct = require("../controller/User/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/User/deleteAddToCartProduct");
const searchProduct = require("../controller/Product/searchProduct");
const filterProductController = require("../controller/Product/filterProduct");
const paymentController = require("../controller/Order/paymentController");
const USDpaymentController = require("../controller/Order/USDpaymentController");
const webhooks = require("../controller/Order/webhook");
const getTypeWiseTable = require("../controller/Table/getTypeWiseTable");
const addToFavoriteController = require("../controller/User/addToFavoriteController");
const countAddToFavoriteProduct = require("../controller/User/countAddToFavoriteProduct");
const addToFavoriteViewProduct = require("../controller/User/addToFavoriteProductView");
const deleteAddToFavoriteProduct = require("../controller/User/deleteAddToFavoriteProduct");
const orderController = require("../controller/Order/order.controller");
const allOrderController = require("../controller/Order/allOrder.controller");
const getTableDetails = require("../controller/Table/getTableDetails");
const addToBookingTableController = require("../controller/User/addToBookingTableController");
const countOrderProduct = require("../controller/Order/countOrderProduct");
const bookingController = require("../controller/Booking/bookingController");
const changeTableStatus = require("../controller/Table/changeTableStatus");
const allBookingController = require("../controller/Booking/allBookingController");
const payInCashController = require("../controller/Order/payInCashController");
const addToMessageController = require("../controller/User/addToMessageController");
const addToMessageView = require("../controller/User/addToMessageView");
const updateMessage = require("../controller/User/updateMessage");
const countMessage = require("../controller/User/countMessage");
const countBookingTable = require("../controller/Booking/countBookingTable");
const filterTableController = require("../controller/Table/filterTable");
const sendMessageToAllUserController = require("../controller/User/sendMessageToAllUser");
const getDiscountProductController = require("../controller/Product/getDiscountProduct");
const userLoginGoogleController = require("../controller/User/userLoginGoogle");
const updateUserInformationController = require("../controller/User/updateUserInformation");
const searchTableController = require("../controller/Table/searchTableController");
const userLoginFBController = require("../controller/User/userLoginFB");
const { createBooking } = require("../controller/Booking/sendBookingConfirmationEmail");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

//admin
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

//product
router.post("/upload-product", authToken, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
//category - product
router.get("/get-categoryProduct", getCategoryProduct);
//
router.post("/category-product", getCategoryWiseProduct);
//product details
router.post("/product-details", getProductDetails);
//searchProduct
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);
//discount product
router.get("/get-discount-product", getDiscountProductController);

//Emloyee add to cart
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-cart-product", authToken, addToCartViewProduct);
//update quantity
router.post("/update-cart-product", authToken, updateAddToCartProduct);

router.post("/delete-cart-product", authToken, deleteAddToCartProduct);
//Generall add to favorite
router.post("/addtofavorite", authToken, addToFavoriteController);
router.get("/countAddToFavoriteProduct", authToken, countAddToFavoriteProduct);
router.get("/view-favorite-product", authToken, addToFavoriteViewProduct);
router.post("/delete-favorite-product", authToken, deleteAddToFavoriteProduct);

//Payment and order
router.post("/checkout", authToken, paymentController);
router.post("/testcheckout", authToken, USDpaymentController);
router.post("/webhook", webhooks); //api/webhook
router.get("/order-list", authToken, orderController);
router.get("/all-order", authToken, allOrderController);
router.get("/countOrderProduct", authToken, countOrderProduct);
router.post("/pay-In-Cash", authToken, payInCashController);

//table
router.post("/upload-table", authToken, UploadTableController);
router.get("/get-table", getTableController);
router.post("/update-table", authToken, updateTableController);
//type - table
router.get("/get-typeTable", getTypeTable);
router.post("/type-table", getTypeWiseTable);
//area - table
router.get("/get-areaTable", getAreaTable);
//User add table to cart
router.post("/addtabletocart", authToken, addToCartTableController);
//Count add to cart table
router.get("/countaddtocarttable", authToken, countAddToCartTable);
router.post("/table-details", getTableDetails);
//filterTable
router.post("/filter-table", filterTableController);

//Booking and Booking list
router.post("/booking", addToBookingTableController);
router.post("/create-booking", createBooking)
router.get("/booking-list", authToken, bookingController);
router.post("/change-table-status", authToken, changeTableStatus);
router.get("/all-booking", authToken, allBookingController);
router.get("/count-booking-table", authToken, countBookingTable);
//Message
router.post("/send-message", addToMessageController);
router.get("/getMessage", authToken, addToMessageView);
router.put("/mark-as-read", updateMessage);
router.get("/count-unreadmessage", authToken, countMessage);
router.post("/send-to-all", sendMessageToAllUserController);

//Login with Google
router.post("/auth/google", userLoginGoogleController)

//Update Information User After
router.post("/update-information-user", authToken, updateUserInformationController)

//Login with facebook
router.post("/auth/facebook", userLoginFBController)

//search table
router.post("/get-search-table", searchTableController)

module.exports = router;
