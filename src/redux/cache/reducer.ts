import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../graphql/types";
import { CacheState } from "./types";

export const initialState: CacheState = {
  userUpdate: false,
};

export const cacheSlice = createSlice({
  name: "cache",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
    },
    setUserUpdate: (state, action: PayloadAction<boolean>) => {
      state.userUpdate = action.payload;
    },
  },
});

export const { setUser, setUserUpdate } = cacheSlice.actions;

export default cacheSlice.reducer;
