import { Report, User } from "../../graphql/types";

export interface CacheState {
  user?: User;
  userUpdate: boolean;
  reports: Report[];
  reportsUpdate: boolean;
  reportIsClosed: boolean;
}
