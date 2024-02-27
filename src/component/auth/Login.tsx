"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { loginHadler } from "@/redux/features/userSlice";
import { useState } from "react";

const Login = () => {
  const dispatch = useAppDispatch();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const LoginData: { id: string; password: string } = {
    id: id,
    password: password,
  };

  const loginSubmit = () => {
    dispatch(loginHadler(LoginData));
  };

  return (
    <div className="Login">
      <div className="input_box">
        <div>
          <input
            type="text"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" onClick={loginSubmit}>
          로그인
        </button>
      </div>
    </div>
  );
};
export default Login;
