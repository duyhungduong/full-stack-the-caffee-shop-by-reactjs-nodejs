import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";


function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)
  const [favoriteProductCount, setFavoriteProductCount] = useState(0)
  const [orderCount, setOrderCount] = useState(0)
  const [bookingCount, setBookingCount] = useState(0)
  const [unreadMessage, setUnreadMessage] = useState(0);


  //Can 1 context de chia se chuc nang nay
  const fetchUserDetails = async() =>{
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method: SummaryApi.current_user.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }

  }

  const fetchUserAddToCart = async() =>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method: SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi.data?.count)
  }

  const fetchUserAddToFavorite = async() =>{
    const dataResponse = await fetch(SummaryApi.addToFavoriteProductCount.url,{
      method: SummaryApi.addToFavoriteProductCount.method,
      credentials : 'include'
    })
    const dataApi = await dataResponse.json()

    setFavoriteProductCount(dataApi.data?.count)
  }

  const fetchUserOrderProduct = async() =>{
    const dataResponse = await fetch(SummaryApi.orderProductCount.url,{
      method: SummaryApi.orderProductCount.method,
      credentials : 'include'
    })
    const dataApi = await dataResponse.json()
    setOrderCount(dataApi.data?.count)
  }
  
  const fetchUserBookingProduct = async() =>{
    const dataResponse = await fetch(SummaryApi.getCountBookingTable.url,{
      method: SummaryApi.getCountBookingTable.method,
      credentials : 'include'
    })
    const dataApi = await dataResponse.json()
    setBookingCount(dataApi.data?.count)
  }
  
  const fetchUserMessage = async() =>{
    const dataResponse = await fetch(SummaryApi.getCountUnreadMessage.url,{
      method: SummaryApi.getCountUnreadMessage.method,
      credentials : 'include'
    })
    const dataApi = await dataResponse.json()
    setUnreadMessage(dataApi.data?.count)
    // console.log("dataApi.data?.count", dataApi.data?.count)
  }


  //Dang nhap lai thanh cong thi chuc nay se duoc goi vi cookie luu lai thong tin nguoi dung
  useEffect(()=>{
    //user Details
    fetchUserDetails()
    //user Add to cart count
    fetchUserAddToCart()
    //user Add to favorite count
    fetchUserAddToFavorite()
    //admin or emloyee order for cumstomer
    fetchUserOrderProduct()
    //general count booking 
    fetchUserBookingProduct()
    //user message
    fetchUserMessage()
  })
  return (
    <>
      <Context.Provider value={{
        fetchUserDetails, //nap thong tin nguoi dung
        cartProductCount, //nap so luong san pham trong gio hang
        fetchUserAddToCart,
        favoriteProductCount,
        fetchUserAddToFavorite,
        fetchUserOrderProduct,
        orderCount,
        fetchUserMessage,
        unreadMessage,
        fetchUserBookingProduct,
        bookingCount,
      }}>
      <ToastContainer
      position="top-center"
       />
      <Header />
      <main className="min-h-[calc(100vh-110px)] pt-20">
        <Outlet />
      </main>
      <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
