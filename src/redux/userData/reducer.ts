import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRoleEnum } from "../../graphql/types";
import { UserDataState } from "./types";

export const initialState: UserDataState = {
  isLoggedIn: false,
  isLoading: true,
  isAuthenticated: false,
  nickname: "",
  userId: 0,
  userRole: UserRoleEnum.None,
  permissions: 0,
  avatar: "",
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    setUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
    setPermissions: (state, action: PayloadAction<number>) => {
      state.permissions = action.payload;
    },
    setUserRole: (state, action: PayloadAction<UserRoleEnum>) => {
      state.userRole = action.payload;
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
  },
});

export const {
  setLoggedIn,
  setLoading,
  setAuthenticated,
  setNickname,
  setUserId,
  setPermissions,
  setUserRole,
  setAvatar,
} = userDataSlice.actions;

export default userDataSlice.reducer;
