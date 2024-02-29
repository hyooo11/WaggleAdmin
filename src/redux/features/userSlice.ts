import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie, deleteCookie } from "cookies-next";

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
    memberInfo: object[] | null;
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

// 로그인 실행
export const loginHadler = createAsyncThunk(
  "auth/login",
  async (userData: { id: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/auth/login",
        {
          id: userData.id,
          password: userData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({
          data: error.response.data,
          status: error.response.status,
          statusText: error.response.statusText,
        });
      } else {
        throw new Error("에러가 발생했습니다.");
      }
    }
  }
);
// 로그인 확인
export const loginCheck = createAsyncThunk(
  "auth/login_check",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/auth/login-check", {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({
          data: error.response.data,
          status: error.response.status,
          statusText: error.response.statusText,
        });
      } else {
        throw new Error("에러가 발생했습니다.");
      }
    }
  }
);

//토큰 웹스토리지 저장 함수
export const setToken = (pid: string, refreshToken: string) => {
  setCookie("pid", pid);
  setCookie("refreshToken", refreshToken);
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      state.isLogin = false;
      state.data.memberInfo = null;
      deleteCookie("pid");
      deleteCookie("refreshToken");
    },
    //엑세스 토큰 재발급시(SideBar.js)
    setAccessToken(state, action) {
      if (action.payload.newToken) {
        state.data.token = action.payload.newToken;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginHadler.pending, (state, action) => {
        state.isLoading = true;
        state.isLogin = false;
        state.isLoginError = false;
      })
      .addCase(loginHadler.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoginError = false;
        if (action.payload.data.message === "success") {
          if (action.payload.data.memberInfo.role === "ROLE_ADMIN") {
            state.isLogin = true;
            state.data.memberInfo = action.payload.data.memberInfo;
            setToken(
              action.payload.data.memberInfo.pid,
              action.payload.data.refreshToken
            );
          } else if (action.payload.data.memberInfo.role === "ROLE_USER") {
            state.isLogin = false;
            state.data.memberInfo = null;
          }
        } else if (action.payload.data.message === "expired token") {
          state.isLogin = false;
          state.data.memberInfo = null;
        } else if (action.payload.data.message === "does not login") {
          state.isLogin = false;
          state.data.memberInfo = null;
        }
      })
      .addCase(loginHadler.rejected, (state, action) => {
        state.isLoading = false;
        state.isLogin = false;
        state.isLoginError = true;
      });
  },
});

export const { clearUser, setAccessToken } = userSlice.actions;
export default userSlice;
