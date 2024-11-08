import { MdKeyboardArrowUp } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";
import { MdMeetingRoom } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { FaMoneyBillWave } from "react-icons/fa";
import { BiSolidCoffee } from "react-icons/bi";
import { Link } from "react-router-dom";

function Widget({ type, total }) {
  // format currency
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 3,
  });

  // temporary percentage difference
  const diff = 80;
  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "/admin-panel/all-users",
        titlelink: "See all users",
        icon: (
          <BiSolidUser className="text-[25px] p-1.5 rounded" style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }} />
        ),
        color: "crimson",
        name: "Người dùng",
      };
      break;
    case "product":
      data = {
        title: "PRODUCT",
        isMoney: false,
        link: "/admin-panel/all-products",
        titlelink: "See all products",
        icon: (
          <BiSolidCoffee className="text-[25px] p-1.5 rounded" style={{ color: "purple", backgroundColor: "rgba(128,0,128,0.2)" }} />
        ),
        color: "purple",
        name: "Sản phẩm",
      };
      break;
    case "table":
      data = {
        title: "TABLE",
        isMoney: false,
        link: "/admin-panel/all-tables",
        titlelink: "See all tables",
        icon: (
          <MdMeetingRoom className="text-[25px] p-1.5 rounded" style={{ color: "goldenrod", backgroundColor: "rgba(218,165,32,0.2)" }} />
        ),
        color: "goldenrod",
        name: "Bàn",
      };
      break;
    case "booking":
      data = {
        title: "BOOKING",
        isMoney: false,
        link: "/admin-panel/all-booking",
        titlelink: "See all bookings",
        icon: (
          <HiUsers className="text-[25px] p-1.5 rounded" style={{ color: "rgb(7, 150, 179)", backgroundColor: "rgb(202, 245, 245)" }} />
        ),
        color: "rgb(7, 150, 179)",
        name: "Đơn đặt bàn",
      };
      break;
    case "earning":
      data = {
        title: "EARNING",
        isMoney: true,
        link: "/admin-panel/all-orders",
        titlelink: "See net earning",
        icon: (
          <FaMoneyBillWave className="text-[25px] p-1.5 rounded" style={{ color: "green", backgroundColor: "rgba(0,128,0,0.2)" }} />
        ),
        color: "green",
      };
      break;
    default:
      break;
  }

  return (
    <div className="flex flex-1 bg-white justify-between p-2.5 shadow-md rounded-lg h-[150px] transform transition-all hover:shadow-lg hover:scale-105">
      <div className="flex flex-col justify-between">
        <span className="font-bold text-sm text-gray-500">{data?.title}</span>
        <span className="text-2xl font-bold ml-2" style={{ color: data?.color }}>
          {data?.isMoney ? formatter.format(total) : `${total} ${data?.name}`}
        </span>
        <Link to={data?.link} className="text-xs border-b border-gray-400 hover:text-blue-500 hover:shadow-sm">
          {data?.titlelink}
        </Link>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div className="flex items-center text-sm text-green-500">
          <MdKeyboardArrowUp />
          <span>{diff}%</span>
        </div>
        <div className="transform transition-all hover:shadow-lg hover:scale-105">
          {data?.icon}
        </div>
       
      </div>
    </div>
  );
}

export default Widget;
