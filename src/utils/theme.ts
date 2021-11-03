import { alpha, darken, lighten, Theme, ThemeOptions } from "@mui/material";

export const defaultThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
  palette: {
    error: {
      main: "#FF6C6D",
      light: lighten("#FF6C6D", 0.1),
      dark: darken("#FF6c6d", 0.1),
    },
    info: {
      main: "#42A5F5",
      light: lighten("#42A5F5", 0.1),
      dark: darken("#42A5F5", 0.1),
    },
    success: {
      main: "#44B462",
      light: lighten("#44B462", 0.1),
      dark: darken("#44B462", 0.1),
    },
    warning: {
      main: "#FE774C",
      light: lighten("#FE774C", 0.1),
      dark: darken("#FE774C", 0.1),
    },
  },
  components: {
    MuiPaper: {
      defaultProps: { elevation: 0 },
    },
    MuiButton: {
      defaultProps: { size: "small" },
    },
    MuiButtonGroup: {
      defaultProps: { size: "small" },
    },
    MuiCheckbox: {
      defaultProps: { size: "small" },
    },
    MuiFab: {
      defaultProps: { size: "small" },
    },
    MuiFormControl: {
      defaultProps: { margin: "dense", size: "small" },
    },
    MuiFormHelperText: {
      defaultProps: { margin: "dense" },
    },
    MuiIconButton: {
      defaultProps: { size: "small" },
    },
    MuiInputBase: {
      defaultProps: { margin: "dense", autoComplete: "off" },
    },
    MuiInputLabel: {
      defaultProps: { margin: "dense" },
    },
    MuiRadio: {
      defaultProps: { size: "small" },
    },
    MuiSwitch: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTextField: {
      defaultProps: { margin: "dense", size: "small", autoComplete: "off" },
    },
    MuiTooltip: {
      defaultProps: { arrow: false },
    },
    MuiBadge: {
      defaultProps: {
        sx: {
          ".MuiBadge-dot": {
            border: (theme: Theme) =>
              `2px solid ${theme.palette.background.paper}`,
            minWidth: "auto",
            width: "7px",
            height: "7px",
            borderRadius: "0.10px",
            boxSizing: "content-box",
          },
        },
      },
    },
  },
};

export const lightThemeOptions: ThemeOptions = {
  ...defaultThemeOptions,
  palette: {
    ...defaultThemeOptions.palette,
    mode: "light",
    primary: {
      main: "#6490EA",
      light: lighten("#6490EA", 0.1),
      dark: darken("#6490EA", 0.1),
    },
    secondary: {
      main: "#8179D7",
      light: lighten("#8179D7", 0.1),
      dark: darken("#8179D7", 0.1),
    },
    text: {
      primary: "rgb(0, 0, 0, 0.87)",
      secondary: "rgb(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    background: {
      default: "#f5f5f5", //  #212121
      paper: "#ffffff", // #3C3E42
    },
  },
};

export const darkThemeOptions: ThemeOptions = {
  ...defaultThemeOptions,
  palette: {
    ...lightThemeOptions.palette,
    mode: "dark",
    text: {
      primary: "#e9e9e9",
      secondary: alpha("#e9e9e9", 0.54),
      disabled: alpha("#e9e9e9", 0.38),
    },
    background: {
      default: "#0e0e0e", //  #212121
      paper: "#181818", // #3C3E42
    },
  },
};

export const oledThemeOptions: ThemeOptions = {
  ...defaultThemeOptions,
  palette: {
    ...darkThemeOptions.palette,
    mode: "dark",
    text: {
      primary: "#e9e9e9",
      secondary: alpha("#e9e9e9", 0.54),
      disabled: alpha("#e9e9e9", 0.38),
    },
    background: {
      default: "#000000", //  #212121
      paper: "#0e0e0e", // #3C3E42
    },
  },
};

export const nightThemeOptions: ThemeOptions = {
  ...defaultThemeOptions,
  palette: {
    ...darkThemeOptions.palette,
    mode: "dark",
    text: {
      primary: "#cdd9e5",
      secondary: alpha("#cdd9e5", 0.54),
      disabled: alpha("#cdd9e5", 0.38),
    },
    background: {
      default: "#1c2128", //  #212121
      paper: "#252c35", // #3C3E42
    },
  },
};
