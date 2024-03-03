"use client";
import CounterList from "./CounterList";
import { getProductCount } from "@/api/productAPI";
import { useEffect, useState } from "react";

export type ProductCountType = {
  productCount?: string;
};

const DashBoard = () => {
  const [productCount, setProductCount] = useState("");
  useEffect(() => {
    getProductCount().then((response) => {
      setProductCount(response.data.data);
    });
  }, []);

  console.log(productCount);
  return <CounterList productCount={productCount} />;
};

export default DashBoard;
