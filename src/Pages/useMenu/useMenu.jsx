import React, { useEffect, useState } from "react";

const useMenu = () => {
  const [menu, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:7065/menu")
      .then((res) => res.json())
      .then((data) => {
        setMenuData(data);
        setLoading(false);
      });
  }, []);
  return [menu, loading];
};

export default useMenu;
