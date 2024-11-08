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

const Home = () => {
  const [dataSearch, setDataSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const sendDataDate = (data) => {
    setDataSearch(data);
  };
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardDiscountProduct
        heading={"Chương trình Siêu Sale từ 15 đến 45%"}
      />
      <VerticalCardProduct category={"matcha"} heading={"Matcha for life"} />
      <HorizontalCardProduct category={"latte"} heading={"Enjoy Latte"} />
      <HorizontalCardProduct category={"matcha"} heading={"Enjoy Matcha"} />
      <HorizontalCardProduct category={"cake"} heading={"Enjoy 1st Cake"} />
      <VerticalCardProduct category={"takeaway"} heading={"Take Away Coffee"} />
      <VerticalCardProduct category={"icecoffee"} heading={"Super IceCoffee"} />

      <VerticalCardProduct category={"latte"} heading={"Real Latte"} />
      <VerticalCardProduct
        category={"cappuccino"}
        heading={"Little Cappuccino"}
      />
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
