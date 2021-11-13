import { Profile } from "../../graphql/graphql";

export interface TopsState {
  rating: Profile[];
  sold: Profile[];
  bought: Profile[];
}
