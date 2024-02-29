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

  const onSubmit = () => {
    dispatch(loginHadler(LoginData));
  };

  useEffect(() => {
    if (userState.isLogin === true) {
      router.push("/");
      router.replace("/");
    }
  }, [userState, router]);

  return (
    <div className="Login">
      <div className="input_box">
        <div>
          <input
            type="text"
            onChange={(e) => {
              setId(e.target.value);
            }}
            className="form-control"
          />
        </div>
        <div>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-control"
          />
        </div>
      </div>
      <button type="submit" onClick={onSubmit}>
        로그인
      </button>
    </div>
  );
};
export default Login;
