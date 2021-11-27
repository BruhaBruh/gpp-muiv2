import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SettingsState } from "./types";

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
  redirect: "/f",
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
  setHorizontalSnackbarPosition,
  setVerticalSnackbarPosition,
} = settingsSlice.actions;

export default settingsSlice.reducer;
