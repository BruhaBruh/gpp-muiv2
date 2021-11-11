import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Permissions, Role } from "../../graphql/graphql";
import { UserDataState } from "./types";

export const initialState: UserDataState = {
  isLoggedIn: false,
  isValidated: false,
  onServer: false,
  nickname: "",
  profileId: 0,
  permissions: [],
  roles: [],
  serverId: 0,
  userId: 0,
  isLoading: true,
  blacklist: [],
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setIsValidated: (state, action: PayloadAction<boolean>) => {
      state.isValidated = action.payload;
    },
    setOnServer: (state, action: PayloadAction<boolean>) => {
      state.onServer = action.payload;
    },
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    setProfileId: (state, action: PayloadAction<number>) => {
      state.profileId = action.payload;
    },
    setServerId: (state, action: PayloadAction<number>) => {
      state.serverId = action.payload;
    },
    setPermissions: (state, action: PayloadAction<Permissions[]>) => {
      state.permissions = action.payload;
    },
    setRoles: (state, action: PayloadAction<Role[]>) => {
      state.roles = action.payload;
    },
    setUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setBlacklist: (state, action: PayloadAction<number[]>) => {
      state.blacklist = action.payload;
    },
  },
});

export const {
  setIsLoggedIn,
  setIsValidated,
  setOnServer,
  setNickname,
  setProfileId,
  setServerId,
  setPermissions,
  setRoles,
  setUserId,
  setIsLoading,
  setBlacklist,
} = userDataSlice.actions;

export default userDataSlice.reducer;
