import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../../graphql/graphql";
import { TopsState } from "./types";

export const initialState: TopsState = {
  rating: [],
  sold: [],
  bought: [],
  badrating: { profiles: [], total: 0 },
  views: [],
  friends: [],
  subscribers: [],
};

export const topsSlice = createSlice({
  name: "tops",
  initialState,
  reducers: {
    setRatingTop: (state, action: PayloadAction<Profile[]>) => {
      state.rating = action.payload;
    },
    setSoldTop: (state, action: PayloadAction<Profile[]>) => {
      state.sold = action.payload;
    },
    setBoughtTop: (state, action: PayloadAction<Profile[]>) => {
      state.bought = action.payload;
    },
    setBadRatingTop: (
      state,
      action: PayloadAction<{ profiles: Profile[]; total: number }>
    ) => {
      state.badrating = action.payload;
    },
    setViews: (state, action: PayloadAction<Profile[]>) => {
      state.views = action.payload;
    },
    setFriends: (state, action: PayloadAction<Profile[]>) => {
      state.friends = action.payload;
    },
    setSubscribers: (state, action: PayloadAction<Profile[]>) => {
      state.subscribers = action.payload;
    },
  },
});

export const {
  setRatingTop,
  setSoldTop,
  setBoughtTop,
  setBadRatingTop,
  setViews,
  setFriends,
  setSubscribers,
} = topsSlice.actions;

export default topsSlice.reducer;
