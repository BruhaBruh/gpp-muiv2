import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../graphql/graphql";
import { ServicesState } from "./types";

export const initialState: ServicesState = {
  services: [],
  page: 1,
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    addServices: (state, action: PayloadAction<Product[]>) => {
      state.services = [
        ...state.services,
        ...action.payload.filter(
          (p) => !state.services.map((i) => i.id).includes(p.id)
        ),
      ];
    },
    clearServices: (state) => {
      state.services = [];
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    incPage: (state) => {
      state.page = state.page + 1;
    },
  },
});

export const { addServices, clearServices, incPage, setPage } =
  servicesSlice.actions;

export default servicesSlice.reducer;
