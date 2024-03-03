"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import { loginHadler } from "@/redux/features/userSlice";
import { useState, useEffect } from "react";

const Login = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const router = useRouter();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const LoginData: { id: string; password: string } = {
    id: id,
    password: password,
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(loginHadler(LoginData));
    if (userState.isLogin === false) {
      alert("존재하지 않는 아이디 입니다.");
    }
  };

  useEffect(() => {
    if (userState.isLogin === true) {
      router.push("/");
      router.replace("/");
    }
  }, [userState, router]);

  return (
    <div className="Login">
      <form onSubmit={onSubmit}>
        <div className="input_box">
          <p className="desc">관리자 계정으로 로그인 해주세요 !</p>
          <div>
            <input
              type="text"
              onChange={(e) => {
                setId(e.target.value);
              }}
              placeholder="아이디 입력"
              className="form-control"
            />
          </div>
          <div>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="비밀번호 입력"
              className="form-control"
              autoComplete="off"
            />
          </div>
          <button type="submit" className="btn_login">
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
