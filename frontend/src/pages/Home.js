import React, { useState } from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import TypeTableList from "../components/TypeTableList";
import AreaTableList from "../components/AreaTableList";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";
import HorizonCardTable from "../components/Table/HorizonCardTable";
import HorizontalCardDiscountProduct from "../components/HorizontalCardDiscountProduct";
import SearchTableHorizontal from "../components/Table/SearchTableHorizontal";
import VerticalTableCard from "../components/Table/VerticalTableCard";
import VideoBackground from "../components/VideoBackground";
import WelcomeBanner from "../components/WelcomeBanner";

const Home = () => {
  const [dataSearch, setDataSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const sendDataDate = (data) => {
    setDataSearch(data);
  };
  return (
    <div>
      <VideoBackground/>
      <WelcomeBanner 
        heading="Welcome to Caffee Shop"
        paragraphs={[
        'Cảm nhận hương vị cà phê đậm đà.',
        'Thưởng thức không gian thư giãn.',
        'Caffee Shop - Nơi đam mê bắt đầu!',
        'Khu 2, 3/2 Street, Xuan Khanh, Ninh Kieu',
        'Consensus - Devotion - Quality - Innovation',
        'Dont tell people your plans. Show them your results.',
        'Dont be so humble you are not that great',
        'You miss 100% of the shots you dont take.',
        'What comes easy wont last, what last wont come easy.',
        'Take Bold risks - Elon Musk',
        'Obsess over Customers - Jeff Bezos',
        'Say yes, Then Learn - Richard Branson',
        'Build Relentlessly - Diane Hendricks',
        'Work like you are Broke - Mark Cuban',
        'Learn from Failures - Bill Gates',
        'Embrace Rejection - Sarah Blakely',
        'Be the Change - Mahatma Gandhi',
        'Think BIG - Larry Page'
      ]}
      />
      <CategoryList />
      <BannerProduct />
      <HorizontalCardDiscountProduct
        heading={"Chương trình Siêu Sale từ 15 đến 45%"}
      />
      <VerticalCardProduct category={"americano"} heading={"Matcha for life"} />
      <HorizontalCardProduct category={"espresso"} heading={"espresso"} />
      <HorizontalCardProduct category={"americano"} heading={"americano"} />
      <HorizontalCardProduct category={"latte"} heading={"Enjoy Latte"} />
      <HorizontalCardProduct category={"coldbrew"} heading={"coldbrew"} />
      <HorizontalCardProduct category={"matcha"} heading={"Enjoy Matcha"} />
      
      <HorizontalCardProduct category={"cake"} heading={"Enjoy 1st Cake"} />
      
      <VerticalCardProduct
        category={"cappuccino"}
        heading={"Little Cappuccino"}
      />
      <VerticalCardProduct category={"cake"} heading={"Matcha for life"} />
      <VerticalCardProduct category={"coldbrew"} heading={"Matcha for life"} />
      <VerticalCardProduct category={"matcha"} heading={"Matcha for life"} />
      <VerticalCardProduct category={"takeaway"} heading={"Take Away Coffee"} />
      <VerticalCardProduct category={"icecoffee"} heading={"Super IceCoffee"} />
      
      {/* Search Component */}
      <SearchTableHorizontal sendDataDate={sendDataDate} />

      {dataSearch.length > 0 ? (
        <div className="container mx-auto p-4">
          <p className="text-lg font-semibold my-3">Search Results : {dataSearch.length}</p>
          <VerticalTableCard data={dataSearch} loading={loading} />
        </div>
      ) : (
        <div>
          <TypeTableList />
          <HorizonCardTable tableType="Bàn 2 người" heading="Bàn dành cho 2 người thoii" />
          <HorizonCardTable tableType="Bàn 4 người" heading="Bàn dành cho nhóm 4 bạn nè" />
          <HorizonCardTable tableType="Bàn dành cho nhóm" heading="Bạn dành cho nhóm bạn nhiều người" />
        </div>
      )}

      {/* <AreaTableList /> */}
    </div>
  );
};

export default Home;
