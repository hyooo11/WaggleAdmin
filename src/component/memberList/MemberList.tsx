"use client";
import { getMemberList } from "@/api/memberListAPI";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hook";

type MemberListType = {
  pid: number;
  id: string;
  password: string;
  name: string;
  nickName: string;
  email: string;
  address: string;
  phone: string;
  regiDate: string;
  role: string;
  refreshToken: string;
};

const MemberList = () => {
  const token = useAppSelector((state) => state.user.data.token);
  const [memberList, setMemberList] = useState<MemberListType[] | null>(null);

  useEffect(() => {
    getMemberList(token)
      .then((response) => {
        setMemberList(response.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <table className="table-auto">
        <thead>
          <tr>
            <th>No</th>
            <th>이름</th>
            <th>닉네임</th>
            <th>아이디</th>
            <th>이메일</th>
            <th>핸드폰번호</th>
            <th>권한</th>
            <th>가입일</th>
          </tr>
        </thead>
        <tbody>
          {memberList &&
            memberList.map((data, index) => {
              return (
                <tr>
                  <td>{data.pid}</td>
                  <td>{data.name}</td>
                  <td>{data.nickName}</td>
                  <td>{data.id}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td>{data.role}</td>
                  <td>{data.regiDate.slice(0, 10)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;
