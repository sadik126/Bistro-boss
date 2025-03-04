import React, { useState } from "react";
import Cover from "../Cover/Cover";
import Coverimg from "../../assets/shop/banner2.jpg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../useMenu/useMenu";
import Foodcard from "../Foodcard/Foodcard";
import Ordertab from "../Ordertab/Ordertab";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

const Order = () => {
  const { category } = useParams();

  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
  const initialcategory = categories.indexOf(category);
  const [menu, loading] = useMenu();

  const [tabIndex, setTabIndex] = useState(initialcategory);

  if (loading) {
    return <Loading></Loading>
  }



  const soup = menu.filter((item) => item.category === "soup");
  const offered = menu.filter((item) => item.category === "offered");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const drinks = menu.filter((item) => item.category === "drinks");
  const dessert = menu.filter((item) => item.category === "dessert");

  console.log(dessert)
  return (
    <div>
      <Cover
        img={Coverimg}
        title="OUR SHOP"
        para="Would you like to try a dish?"
      ></Cover>

      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList className="flex flex-wrap md:flex-nowrap justify-center gap-3 bg-gray-100 p-2 rounded-lg shadow-md overflow-x-auto">
          {["Salad", "Pizza", "Soups", "Desserts", "Drinks"].map((item, index) => (
            <Tab
              key={index}
              className={`px-4 py-2 text-lg font-semibold cursor-pointer rounded-lg transition whitespace-nowrap
        ${tabIndex === index ? "bg-orange-500 text-white" : "bg-orange-500 hover:bg-gray-300"}
      `}
            >
              {item}
            </Tab>
          ))}
        </TabList>

        <TabPanel >
          <Ordertab items={salad}></Ordertab>
        </TabPanel>
        <TabPanel>
          <Ordertab items={pizza}></Ordertab>
        </TabPanel>
        <TabPanel>
          <Ordertab items={soup}></Ordertab>
        </TabPanel>
        <TabPanel>
          <Ordertab items={dessert}></Ordertab>
        </TabPanel>
        <TabPanel>
          <Ordertab items={drinks}></Ordertab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
