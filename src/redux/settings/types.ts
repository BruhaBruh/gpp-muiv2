export interface SettingsState {
  redirect: string;
  hideGlobalChat: boolean;
  hideBlacklistedProfiles: boolean;
  verticalSnackbarPosition: "top" | "bottom" | string;
  horizontalSnackbarPosition: "left" | "center" | "right" | string;
}
