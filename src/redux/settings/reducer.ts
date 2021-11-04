import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SettingsState } from "./types";

const loadBoolean = (key: string): boolean => {
  const item = localStorage.getItem(key);
  switch (item) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      localStorage.setItem(key, "false");
      return false;
  }
};

const loadVerticalSnackbarPosition = (): string => {
  const vp = localStorage.getItem("vsnackpos");
  if (!vp || !["top", "bottom"].includes(vp)) {
    return "top";
  } else {
    return vp;
  }
};

const loadHorizontalSnackbarPosition = (): string => {
  const hp = localStorage.getItem("hsnackpos");
  if (!hp || !["left", "center", "right"].includes(hp)) {
    return "center";
  } else {
    return hp;
  }
};

export const initialState: SettingsState = {
  redirect: "/info",
  hideBlacklistedProfiles: loadBoolean("hbp"),
  hideGlobalChat: loadBoolean("hgc"),
  verticalSnackbarPosition: loadVerticalSnackbarPosition(),
  horizontalSnackbarPosition: loadHorizontalSnackbarPosition(),
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setRedirect: (state, action: PayloadAction<string>) => {
      state.redirect = action.payload;
    },
    setHideBlacklistedProfiles: (state, action: PayloadAction<boolean>) => {
      state.hideBlacklistedProfiles = action.payload;
      localStorage.setItem("hbp", String(action.payload));
    },
    setHideGlobalChat: (state, action: PayloadAction<boolean>) => {
      state.hideGlobalChat = action.payload;
      localStorage.setItem("hgc", String(action.payload));
    },
    setVerticalSnackbarPosition: (
      state,
      action: PayloadAction<"top" | "bottom" | string>
    ) => {
      state.verticalSnackbarPosition = action.payload;
      localStorage.setItem("vsnackpos", action.payload);
    },
    setHorizontalSnackbarPosition: (
      state,
      action: PayloadAction<"left" | "center" | "right" | string>
    ) => {
      state.horizontalSnackbarPosition = action.payload;
      localStorage.setItem("hsnackpos", action.payload);
    },
  },
});

export const {
  setRedirect,
  setHideBlacklistedProfiles,
  setHideGlobalChat,
  setHorizontalSnackbarPosition,
  setVerticalSnackbarPosition,
} = settingsSlice.actions;

export default settingsSlice.reducer;
