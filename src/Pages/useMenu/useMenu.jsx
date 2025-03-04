import React, { useEffect, useState } from "react";

const useMenu = () => {
  const [menu, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  const refetch = () => {
    setLoading(true);
    fetch("https://bistro-boss-server-a7ed.onrender.com/menu")
      .then((res) => res.json())
      .then((data) => {
        setMenuData(data);
        setLoading(false);
      });
  }
  useEffect(() => {
    refetch();
  }, []);
  return [menu, loading, refetch];
};

export default useMenu;
