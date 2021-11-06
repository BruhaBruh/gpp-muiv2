import { Product } from "../../graphql/graphql";

export interface ProductsState {
  products: Product[];
  page: number;
}
