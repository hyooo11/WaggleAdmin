import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface userState {
  isLoading: boolean;
  isLogin: boolean;
  isLoginError: boolean;
  isClearing: boolean;
  isClear: boolean;
  isClearError: string;
  data: {
    message: string;
    token: string;
    refreshToken: string;
    memberInfo: null | string[];
  };
}

const initialState = {
  isLoading: false, //로딩중
  isLogin: false, //로그인 유무
  isLoginError: false, //로그인 에러
  isClearing: false, //로그아웃중
  isClear: false, //로그아웃 유무
  isClearError: "", //로그아웃 에러
  data: {
    message: "", //서버에서 오는 상태 메세지
    token: "", //엑세스 토큰
    refreshToken: "", //리프레시 토큰
    memberInfo: null, //서버에서 받아오는 유저정보
  },
} satisfies userState as userState;

// 로그인 실행 함수
// 로그인 확인 함수

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser() {},
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
