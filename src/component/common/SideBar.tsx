"use client";
import { SiPhpmyadmin } from "react-icons/si";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useAppDispatch } from "@/redux/hook";
import {
  loginCheck,
  setAccessToken,
  clearUser,
} from "@/redux/features/userSlice";
import { useRouter } from "next/navigation";

const SideBar = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const userPid = getCookie("pid");
  const refreshToken = getCookie("refreshToken");

  useEffect(() => {
    const reissueToken = async () => {
      if (userPid && refreshToken) {
        await axios
          .post("/api/auth/refresh", {
            pid: userPid,
            refreshToken: refreshToken,
          })
          .then((response) => {
            const newReissueToken = response.data.data.reissueToken;
            dispatch(loginCheck(newReissueToken));
            dispatch(setAccessToken({ newToken: newReissueToken }));
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.log("리프레시 토큰 없음");
      }
    };
    reissueToken();
  }, []);

  //로그아웃
  const logoutBtn = () => {
    dispatch(clearUser());
    router.push("/");
    router.replace("/");
  };

  if (pathname.includes("login")) return null;
  return (
    <div className="gloval-nav">
      <div className="nav_header">
        <h1>
          <Link href="/admin">
            <SiPhpmyadmin />
            <span>Admin</span>
          </Link>
        </h1>
        <div className="__inner">
          <div className="thumbnail">
            <img src="/media/img/default_profile.jpeg" alt="기본 사진" />
          </div>
          <div className="user_txt">
            <span className="__name">신효진</span>
            <span className="__belong">관리자</span>
          </div>
        </div>
      </div>
      <ul className="nav_body">
        <li>
          <Link href="/admin/product">와인리스트 관리</Link>
        </li>
        <li>
          <Link href="/admin/member">회원 관리</Link>
        </li>
      </ul>
      <div>
        <button onClick={logoutBtn}>로그아웃</button>
      </div>
    </div>
  );
};
export default SideBar;
