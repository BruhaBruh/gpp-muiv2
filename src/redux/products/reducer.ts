import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../graphql/graphql";
import { ProductsState } from "./types";

export const initialState: ProductsState = {
  products: [],
  page: 1,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = [
        ...state.products,
        ...action.payload.filter(
          (p) => !state.products.map((i) => i.id).includes(p.id)
        ),
      ];
    },
    clearProducts: (state) => {
      state.products = [];
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    incPage: (state) => {
      state.page = state.page + 1;
    },
  },
});

export const { addProducts, clearProducts, incPage, setPage } =
  productsSlice.actions;

export default productsSlice.reducer;
