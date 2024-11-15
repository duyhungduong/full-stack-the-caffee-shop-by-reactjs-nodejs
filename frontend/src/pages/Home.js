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
      <VerticalCardProduct category={"americano"} heading={"Savor the Bold Flavors of a Classic Americano"} />
      <HorizontalCardProduct category={"espresso"} heading={"Experience the Intensity of Bold Espresso"} />
      <HorizontalCardProduct category={"americano"} heading={"Pure Americano for a Rich, Authentic Taste"} />
      <HorizontalCardProduct category={"latte"} heading={"Indulge in the Creamy Smoothness of Our Latte Bliss"} />
      <HorizontalCardProduct category={"coldbrew"} heading={"Refresh Yourself with a Cool, Crisp Cold Brew"} />
      <HorizontalCardProduct category={"matcha"} heading={"Delight in the Smooth, Earthy Taste of Matcha"} />
      <HorizontalCardProduct category={"cake"} heading={"Treat Yourself to a Sweet and Delicious Cake"} />
      <VerticalCardProduct category={"cappuccino"} heading={"Enjoy the Perfect Blend of Frothy Cappuccino"} />
      <VerticalCardProduct category={"cake"} heading={"Discover Delicious Desserts to Brighten Your Day"} />
      <VerticalCardProduct category={"coldbrew"} heading={"Cold Brew Magic: Refreshment in Every Sip"} />
      <VerticalCardProduct category={"matcha"} heading={"Embrace the Harmony of Green Tea in Every Cup"} />
      <VerticalCardProduct category={"takeaway"} heading={"Grab Your Coffee To Go, Wherever You’re Headed"} />
      <VerticalCardProduct category={"icecoffee"} heading={"Stay Cool with Our Chilled, Refreshing Ice Coffee"} />

      
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
