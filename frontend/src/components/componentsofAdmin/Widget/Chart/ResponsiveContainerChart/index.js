import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import SummaryApi from "../../../../../common";
import { toast } from "react-toastify";
import moment from "moment";

function ResponsiveContainerChart() {
  const initialData = [
    { name: "January", Total: 0 },
    { name: "February", Total: 0 },
    { name: "March", Total: 0 },
    { name: "April", Total: 0 },
    { name: "May", Total: 0 },
    { name: "June", Total: 0 },
    { name: "July", Total: 0 },
    { name: "August", Total: 0 },
    { name: "September", Total: 0 },
    { name: "October", Total: 1600 },
    { name: "November", Total: 0 },
    { name: "December", Total: 0 },
  ];

  const [data, setData] = useState(initialData);
  const [groupedOrders, setGroupedOrders] = useState({});

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(SummaryApi.allOrder.url, {
        method: SummaryApi.allOrder.method,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      groupOrdersByMonth(responseData.data); // Nhóm đơn hàng theo tháng
    } catch (error) {
      console.error("Failed to fetch order details:", error);
      toast.error("Failed to fetch order details!!!");
    }
  };

  // Hàm nhóm đơn hàng theo tháng và tính tổng số tiền của từng tháng
  const groupOrdersByMonth = (orders) => {
    const grouped = {};

    orders.forEach((order) => {
      const monthYear = moment(order.createdAt).format("MMMM"); // Lấy tháng bằng tên tháng

      if (!grouped[monthYear]) {
        grouped[monthYear] = {
          orders: [],
          totalAmountForMonth: 0,
        };
      }

      grouped[monthYear].orders.push(order);
      grouped[monthYear].totalAmountForMonth += order.totalAmount; // Cộng dồn tổng số tiền
    });

    setGroupedOrders(grouped);
    updateDataWithGroupedOrders(grouped);
  };

  // Hàm so sánh và thay thế giá trị Total trong data
  const updateDataWithGroupedOrders = (grouped) => {
    const updatedData = data.map((item) => {
      const monthData = grouped[item.name]; // Kiểm tra nếu tháng trong data tồn tại trong groupedOrders
      if (monthData) {
        return { ...item, Total: monthData.totalAmountForMonth }; // Thay thế Total bằng totalAmountForMonth
      }
      return item; // Nếu không có thay đổi, giữ nguyên item
    });
    setData(updatedData); // Cập nhật lại data
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="flex-3 p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Last 10 Months (Revenue)</h3>
      </div>
      <div className="w-full h-auto">
        <AreaChart
          width={1200} // Tăng chiều rộng
          height={320} // Tăng chiều cao
          data={data} // Sử dụng data đã được cập nhật
          margin={{ top: 20, right: 40, left: 20, bottom: 10 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6a85b6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#bac8e0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" className="text-gray-700 text-sm font-medium" />
          <YAxis className="text-gray-700 text-sm font-medium" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: "10px",
              boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#4a77b6"
            strokeWidth={2} // Tăng độ dày
            fillOpacity={1}
            fill="url(#total)"
            activeDot={{ r: 8 }} // Kích thước lớn hơn khi hover
          />
        </AreaChart>
      </div>
    </div>
  );
}

export default ResponsiveContainerChart;
