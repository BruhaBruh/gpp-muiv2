import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  darkThemeOptions,
  lightThemeOptions,
  nightThemeOptions,
  oledThemeOptions,
} from "../../utils/theme";
import { Theme, UIState } from "./types";

export const initialState: UIState = {
  sidebarHeader: null,
  header: null,
  theme: Theme.DARK,
  themes: [
    { name: "Темная", theme: darkThemeOptions },
    { name: "Светлая", theme: lightThemeOptions },
    { name: "OLED", theme: oledThemeOptions },
    { name: "Ночной", theme: nightThemeOptions },
  ],
  customThemes: [],
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSidebarHeader: (state, action: PayloadAction<any>) => {
      state.sidebarHeader = action.payload;
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setHeader: (state, action: PayloadAction<any>) => {
      state.header = action.payload;
    },
  },
});

export const { setTheme, setSidebarHeader, setHeader } = uiSlice.actions;

export default uiSlice.reducer;
