import { User } from "../../graphql/types";

export interface CacheState {
  user?: User;
  userUpdate: boolean;
}
