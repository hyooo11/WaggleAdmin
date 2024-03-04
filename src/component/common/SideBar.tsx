"use client";
import { SiPhpmyadmin } from "react-icons/si";
import { MdLogout } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  loginCheck,
  setAccessToken,
  clearUser,
} from "@/redux/features/userSlice";
import { useRouter } from "next/navigation";

const SideBar = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const pathname = usePathname();
  const router = useRouter();
  const userPid = getCookie("pid");
  const refreshToken = getCookie("refreshToken");

  const userNickName =
    userState.data.memberInfo !== null && userState.data.memberInfo.nickName;

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
  }, [userPid, refreshToken, dispatch]);

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
          <Link href="/">
            <SiPhpmyadmin />
            <span>Admin</span>
          </Link>
        </h1>
        <div className="__inner">
          <div className="thumbnail">
            <img src="/media/img/default_profile.jpeg" alt="기본 사진" />
          </div>
          <div className="user_txt">
            <span className="__name">{userNickName}</span>
            <span className="__belong">님 안녕하세요!</span>
          </div>
          <div className="button_area">
            <Link
              href="https://project-wagu.vercel.app/"
              target="_blank"
              className="link_box"
            >
              <span className="icon">
                <IoHome />
              </span>
              <span className="txt">Homepage</span>
            </Link>
            <button onClick={logoutBtn} className="link_box">
              <span className="icon">
                <MdLogout />
              </span>
              <span className="txt">Logout</span>
            </button>
          </div>
        </div>
      </div>
      <ul className="nav_body">
        <li>
          <Link href="/productlist">상품 리스트</Link>
        </li>
        <li>
          <Link href="/registerproduct">상품 등록</Link>
        </li>
        <li>
          <Link href="/memberlist">회원 관리</Link>
        </li>
      </ul>
    </div>
  );
};
export default SideBar;
