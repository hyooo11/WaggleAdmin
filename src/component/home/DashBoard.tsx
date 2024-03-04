"use client";
import CounterList from "./CounterList";
import Chart from "./Chart";
import { getProductCount } from "@/api/productAPI";
import { getMemberList } from "@/api/memberListAPI";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hook";

export type WidgetCounterType = {
  productCount?: string;
  memberList?: string;
};

const DashBoard = () => {
  const [productCount, setProductCount] = useState("");
  const [memberList, setMemberList] = useState("");

  const token = useAppSelector((state) => state.user.data.token);

  useEffect(() => {
    getProductCount().then((response) => {
      setProductCount(response.data.data);
    });
  }, []);

  useEffect(() => {
    if (token) {
      getMemberList(token).then((response) => {
        setMemberList(response.data.data);
      });
    }
  }, [token]);
  return (
    <>
      <CounterList productCount={productCount} memberList={memberList} />
      <Chart />
    </>
  );
};

export default DashBoard;
