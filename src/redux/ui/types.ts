import { ThemeOptions } from "@mui/material";

export interface UIState {
  sidebarHeader: any;
  header: any;
  theme: number;
  themes: ThemeOption[];
  customThemes: ThemeOption[];
}

export interface ThemeOption {
  name: string;
  theme: ThemeOptions;
}

export enum Theme {
  DARK = 0,
  LIGHT = 1,
}
