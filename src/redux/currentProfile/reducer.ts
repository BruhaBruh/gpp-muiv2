import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile, ProfileStatus } from "../../graphql/graphql";
import { CurrentProfileState } from "./types";

export const initialState: CurrentProfileState = {};

export const settingsSlice = createSlice({
  name: "currentProfile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
    setStatus: (state, action: PayloadAction<ProfileStatus>) => {
      state.status = action.payload;
    },
    clearCurrentProfile: (state) => {
      state = initialState;
    },
  },
});

export const { setProfile, setStatus, clearCurrentProfile } =
  settingsSlice.actions;

export default settingsSlice.reducer;
