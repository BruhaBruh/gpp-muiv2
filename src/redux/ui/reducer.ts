import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactElement } from "react";
import {
  darkThemeOptions,
  lightThemeOptions,
  nightThemeOptions,
  oledThemeOptions,
} from "../../utils/theme";
import { Theme, ThemeOption, UIState } from "./types";

const loadCustomThemes = (): ThemeOption[] => {
  if (
    localStorage.getItem("site-version") === null ||
    localStorage.getItem("site-version") !== "1"
  ) {
    localStorage.clear();
    localStorage.setItem("site-version", "1");
  }
  const themes = localStorage.getItem("customThemes");
  if (themes === null) {
    return [
      { name: "Тёмная", system: true, theme: darkThemeOptions },
      { name: "Светлая", system: true, theme: lightThemeOptions },
      { name: "OLED", system: true, theme: oledThemeOptions },
      { name: "Ночная", system: true, theme: nightThemeOptions },
    ];
  } else {
    return [
      { name: "Тёмная", system: true, theme: darkThemeOptions },
      { name: "Светлая", system: true, theme: lightThemeOptions },
      { name: "OLED", system: true, theme: oledThemeOptions },
      { name: "Ночная", system: true, theme: nightThemeOptions },
      ...(JSON.parse(themes) as ThemeOption[]).slice(4),
    ];
  }
};

const loadTheme = (): number => {
  const i = localStorage.getItem("selectedTheme");
  if (i === null) {
    return 0;
  } else {
    const n = JSON.parse(i);
    return n < loadCustomThemes().length && n >= 0 ? n : 0;
  }
};

export const initialState: UIState = {
  modal: null,
  sidebarHeader: null,
  header: null,
  theme: loadTheme(),
  themes: loadCustomThemes(),
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<ReactElement | null>) => {
      state.modal = action.payload;
    },
    setSidebarHeader: (state, action: PayloadAction<any>) => {
      state.sidebarHeader = action.payload;
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem("selectedTheme", JSON.stringify(action.payload));
    },
    setHeader: (state, action: PayloadAction<any>) => {
      state.header = action.payload;
    },
    addCustomTheme: (state, action: PayloadAction<ThemeOption>) => {
      state.themes = [...(state.themes as any), action.payload];
      state.theme = state.themes.length - 1;
      localStorage.setItem("customThemes", JSON.stringify(state.themes));
    },
    removeCustomTheme: (state, action: PayloadAction<string>) => {
      state.themes = state.themes.filter((c) => c.name !== action.payload);
      localStorage.setItem("customThemes", JSON.stringify(state.themes));
    },
  },
});

export const {
  setModal,
  setTheme,
  setSidebarHeader,
  setHeader,
  addCustomTheme,
  removeCustomTheme,
} = uiSlice.actions;

export default uiSlice.reducer;
