import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../../graphql/graphql";
import { TopsState } from "./types";

export const initialState: TopsState = {
  rating: [],
  sold: [],
  bought: [],
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
  },
});

export const { setRatingTop, setSoldTop, setBoughtTop } = topsSlice.actions;

export default topsSlice.reducer;
