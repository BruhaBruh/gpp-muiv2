import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRoleEnum } from "../../graphql/types";
import { UserDataState } from "./types";

export const initialState: UserDataState = {
  updateUser: false,
  isLoggedIn: false,
  isLoading: true,
  isAuthenticated: false,
  nickname: "",
  userId: 0,
  userRole: UserRoleEnum.None,
  permissions: 0,
  settings: 0,
  avatar: "",
  subscriptionEndAt: null,
  banreportEndAt: null,
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
    setSubscriptionEndAt: (state, action: PayloadAction<string | null>) => {
      state.subscriptionEndAt = action.payload;
    },
    setBanreportEndAt: (state, action: PayloadAction<string | null>) => {
      state.banreportEndAt = action.payload;
    },
    setSettings: (state, action: PayloadAction<number>) => {
      state.settings = action.payload;
    },
    setUpdateUser: (state, action: PayloadAction<boolean>) => {
      state.updateUser = action.payload;
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
  setSubscriptionEndAt,
  setBanreportEndAt,
  setSettings,
  setUpdateUser,
} = userDataSlice.actions;

export default userDataSlice.reducer;
