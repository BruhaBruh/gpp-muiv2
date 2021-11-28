import { ThemeOptions } from "@mui/material";
import { ReactElement } from "react";

export interface UIState {
  modal: ReactElement | null;
  sidebarHeader: boolean;
  header: any;
  theme: number;
  themes: ThemeOption[];
}

export interface ThemeOption {
  name: string;
  system?: boolean;
  theme: ThemeOptions;
}

export enum Theme {
  DARK = 0,
  LIGHT = 1,
}
