import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUser from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import AllTables from "../pages/AllTables";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import OrderPage from "../pages/OrderPage";
import TestCart from "../pages/Test/TestCart";
import Favorite from "../pages/Favorite";
import Booking from "../pages/Booking";
import AllOrder from "../pages/AllOrder";
import TableDetails from "../pages/TableDetails";
import BookingPage from "../pages/BookingPage";
import Dashboard from "../pages/Dashboard";
import AllBooking from "../pages/AllBooking";
import AdminInfomationPage from "../pages/Admin/AdminInformationPage";
import Notification from "../pages/Notification";
import TypeTable from "../pages/TypeTable";
import SendMessageToAll from "../pages/SendMessageToAll";
import UserInfomationPage from "../pages/UserInfomationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "product-category",
        element: <CategoryProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "table/:id",
        element: <TableDetails />,
      },
      {
        path: "table-tableType",
        element: <TypeTable/>,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "noti",
        element: <Notification />,
      },
      {
        path: "favorite",
        element: <Favorite />,
      },
      {
        path: "booking",
        element: <Booking />,
      },
      {
        path: "booking-list",
        element: <BookingPage />,
      },
      {
        path: "user-infomation",
        element: <UserInfomationPage/>,
      },
      {
        path: "cart-test",
        element: <TestCart />,
      },

      {
        path: "success",
        element: <Success />,
      },
      {
        path: "cancel",
        element: <Cancel />,
      },
      {
        path: "order",
        element: <OrderPage />,
      },
      {
        path: "search",
        element: <SearchProduct />,
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUser />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
          {
            path: "all-tables",
            element: <AllTables />,
          },
          {
            path: "all-orders",
            element: <AllOrder />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "all-booking",
            element: <AllBooking />,
          },
          {
            path: "admin-info",
            element: <AdminInfomationPage />,
          },
          {
            path: "admin-send-message",
            element: <SendMessageToAll/>,
          },
        ],
      },
    ],
  },
]);

export default router;
