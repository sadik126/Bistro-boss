import React, { useEffect, useState } from "react";

const useMenu = () => {
  const [menu, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("Menu.json")
      .then((res) => res.json())
      .then((data) => {
        setMenuData(data);
        setLoading(false);
      });
  }, []);
  return [menu, loading];
};

export default useMenu;
