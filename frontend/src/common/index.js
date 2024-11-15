const backendDomin = process.env.REACT_APP_BACKEND_URL; //"http://localhost:8080";
//console.log("backendDomin", backendDomin)

const SummaryApi = {
  signUP: {
    url: `${backendDomin}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomin}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomin}/api/userLogout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomin}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomin}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomin}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomin}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomin}/api/update-product`,
    method: "post",
  },
  uploadTable: {
    url: `${backendDomin}/api/upload-table`,
    method: "post",
  },
  allTable: {
    url: `${backendDomin}/api/get-table`,
    method: "get",
  },
  updateTable: {
    url: `${backendDomin}/api/update-table`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomin}/api/get-categoryProduct`,
    method: "get",
  },
  typeTable: {
    url: `${backendDomin}/api/get-typeTable`,
    method: "get",
  },
  typeWiseTable: {
    url: `${backendDomin}/api/type-table`,
    method: "post",
  },
  areaTable: {
    url: `${backendDomin}/api/get-areaTable`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomin}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomin}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomin}/api/addtocart`,
    method: "post",
  },
  addToFavoriteProduct: {
    url: `${backendDomin}/api/addtofavorite`,
    method: "post",
  },
  addToCartTable: {
    url: `${backendDomin}/api/addtabletocart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backendDomin}/api/countAddToCartProduct`,
    method: "get",
  },
  addToFavoriteProductCount: {
    url: `${backendDomin}/api/countAddToFavoriteProduct`,
    method: "get",
  },
  addToCartTableCount: {
    url: `${backendDomin}/api/countaddtocarttable`,
    method: "get",
  },
  addToProductView: {
    url: `${backendDomin}/api/view-cart-product`,
    method: "get",
  },
  addToFavoriteProductView: {
    url: `${backendDomin}/api/view-favorite-product`,
    method: "get",
  },
  addToBookingTable: {
    url: `${backendDomin}/api/view-booking-table`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomin}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomin}/api/delete-cart-product`,
    method: "post",
  },
  deleteFavoriteProduct: {
    url: `${backendDomin}/api/delete-favorite-product`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomin}/api/search`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomin}/api/filter-product`,
    method: "post",
  },
  payment: {
    url: `${backendDomin}/api/checkout`,
    method: "post",
  },
  testpayment: {
    url: `${backendDomin}/api/testcheckout`,
    method: "post",
  },
  getOrder: {
    url: `${backendDomin}/api/order-list`,
    method: "get",
  },
  allOrder: {
    url: `${backendDomin}/api/all-order`,
    method: "get",
  },
  tableDetails: {
    url: `${backendDomin}/api/table-details`,
    method: "post",
  },
  bookingTable: {
    url: `${backendDomin}/api/booking`,
    method: "post",
  },
  creatBookingTable : {
    url: `${backendDomin}/api/create-booking`,
    method: "post",
  },
  orderProductCount: {
    url: `${backendDomin}/api/countOrderProduct`,
    method: "get",
  },
  getBooking: {
    url: `${backendDomin}/api/booking-list`,
    method: "get",
  },
  getBookingTableToday: {
    url: `${backendDomin}/api/booking-today`,
    method: "get",
  },
  bookingTablesTodayCount: {
    url: `${backendDomin}/api/count-booking-table-today`,
    method: "get",
  },
  changeStatusTable: {
    url: `${backendDomin}/api/change-table-status`,
    method: "post",
  },
  allBooking: {
    url: `${backendDomin}/api/all-booking`,
    method: "get",
  },
  payInCash: {
    url: `${backendDomin}/api/pay-In-Cash`,
    method: "post",
  },
  sendMessageToreceiver : {
    url: `${backendDomin}/api/send-message`,
    method: "post",
  },
  getMessage : {
    url: `${backendDomin}/api/getMessage`,
    method: "get",
  },
  markMessage : {
    url: `${backendDomin}/api/mark-as-read`,
    method: "put",
  },
  getCountUnreadMessage : {
    url: `${backendDomin}/api/count-unreadmessage`,
    method: "get",
  },
  getCountBookingTable : {
    url: `${backendDomin}/api/count-booking-table`,
    method: "get",
  },
  filterTable : {
    url: `${backendDomin}/api/filter-table`,
    method: "post",
  },
  sendToAll : {
    url: `${backendDomin}/api/send-to-all`,
    method: "post",
  },
  getDiscountProduct: {
    url: `${backendDomin}/api/get-discount-product`,
    method: "get",
  },
  loginWithGoogle : {
    url: `${backendDomin}/api/auth/google`,
    method: "post",
  },
  updateInformationUser : {
    url: `${backendDomin}/api/update-information-user`,
    method: "post",
  },
  getSearchTable : {
    url: `${backendDomin}/api/get-search-table`,
    method: "post",
  },
  loginWithFacebook :{
    url: `${backendDomin}/api/auth/facebook`,
    method: "post",
  },
  getTopFavoritedProduct : {
    url: `${backendDomin}/api/top-favorited-product`,
    method: "get",
  },

};

export default SummaryApi;
