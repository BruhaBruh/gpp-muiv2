import { Product } from "../../graphql/graphql";

export interface ServicesState {
  services: Product[];
  page: number;
}
