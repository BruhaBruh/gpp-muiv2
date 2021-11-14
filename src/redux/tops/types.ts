import { Profile } from "../../graphql/graphql";

export interface TopsState {
  rating: Profile[];
  sold: Profile[];
  bought: Profile[];
  badrating: { profiles: Profile[]; total: number };
  views: Profile[];
  friends: Profile[];
  subscribers: Profile[];
}
