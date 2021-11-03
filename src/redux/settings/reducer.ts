import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SettingsState } from "./types";

export const initialState: SettingsState = {
  redirect: "/info",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setRedirect: (state, action: PayloadAction<string>) => {
      state.redirect = action.payload;
    },
  },
});

export const { setRedirect } = settingsSlice.actions;

export default settingsSlice.reducer;
