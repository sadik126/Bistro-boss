import React, { useState } from "react";
import Cover from "../Cover/Cover";
import Coverimg from "../../assets/shop/banner2.jpg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../useMenu/useMenu";
import Foodcard from "../Foodcard/Foodcard";
import Ordertab from "../Ordertab/Ordertab";
import { useParams } from "react-router-dom";

const Order = () => {
  const { category } = useParams();
  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
  const initialcategory = categories.indexOf(category);
  const [menu] = useMenu();

  const [tabIndex, setTabIndex] = useState([]);

  console.log(category);
  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const offered = menu.filter((item) => item.category === "offered");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const drinks = menu.filter((item) => item.category === "drinks");
  return (
    <div>
      <Cover
        img={Coverimg}
        title="OUR SHOP"
        para="Would you like to try a dish?"
      ></Cover>

      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList className="md:w-1/2 mx-auto text-center">
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soups</Tab>
          <Tab>Desserts</Tab>
          <Tab>Drinks</Tab>
        </TabList>

        <TabPanel>
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
