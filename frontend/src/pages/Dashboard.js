import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import Widget from '../components/componentsofAdmin/Widget';
import PieChartt from '../components/componentsofAdmin/Widget/Chart/PieChartt';
import ResponsiveContainerChart from '../components/componentsofAdmin/Widget/Chart/ResponsiveContainerChart';
import BarChartt from '../components/componentsofAdmin/Widget/Chart/BarChartt';
import scrollTop from "../helper/scrollTop";

const Dashboard = () => {
    const [user, setUser] = useState([]);
    const [product, setProduct] = useState([]);
    // const [employee, setEmployee] = useState([]);
    const [earning, setEarning] = useState([]);
    const [table, setTable] = useState([]);
    const [booking, setBooking] = useState([]);
    
    const fetchAllUsers = async () => {
        const fetchData = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: "include",
        });
        const dataResponse = await fetchData.json();
        if (dataResponse.success) {
            setUser(dataResponse.data);
        } else {
            toast.error(dataResponse.message);
        }
    };

    const fetchOrderDetails = async () => {
        const response = await fetch(SummaryApi.allOrder.url, {
            method: SummaryApi.allOrder.method,
            credentials: 'include'
        });
        const responseData = await response.json();
        setEarning(responseData.data);
    };

    const totalPrice = earning.reduce((prev, curr) => prev + curr.totalAmount, 0);

    const fetchAllProduct = async () => {
        const response = await fetch(SummaryApi.allProduct.url);
        const dataResponse = await response.json();
        setProduct(dataResponse?.data || []);
    };

    const fetchAllTable = async () => {
        const response = await fetch(SummaryApi.allTable.url);
        const dataResponse = await response.json();
        setTable(dataResponse?.data || []);
    };

    const fetchBookingDetails = async () => {
        const response = await fetch(SummaryApi.allBooking.url, {
            method: SummaryApi.allBooking.method,
            credentials: 'include'
        });
        const responseData = await response.json();
        setBooking(responseData.data);
    };

    const dataPieChart = [
        { name: 'User', value: user.length, color: '#4A90E2' },
        { name: 'Product', value: product.length, color: '#50E3C2' },
        { name: 'Booking', value: booking.length, color: '#F5A623' },
        { name: 'Table', value: table.length, color: '#BD10E0' },
        { name: 'Earning', value: earning.length, color: '#B8E986' },
    ];

    useEffect(() => {
        scrollTop()
        fetchAllUsers();
        fetchAllProduct();
        fetchAllTable();
        fetchOrderDetails();
        fetchBookingDetails();
    }, []);

    return (
        <div className="flex flex-col p-6">
            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h3 className="text-lg font-semibold mb-2">Biểu Đồ Thống Kê</h3>
                <ResponsiveContainerChart />
            </div>
            <div className="grid grid-cols-5 gap-6 mb-6">
                <Widget total={user.length} type="user" />
                <Widget total={product.length} type="product" />
                <Widget total={booking.length} type="booking" />
                <Widget total={totalPrice} type="earning" />
                <Widget total={table.length} type="table" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-semibold mb-2">Biểu Đồ Tròn</h3>
                    <PieChartt dataPieChart={dataPieChart} />
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-semibold mb-2">Biểu Đồ Cột</h3>
                    <BarChartt />
                </div>
            </div>
            
        </div>
    );
}

export default Dashboard;
