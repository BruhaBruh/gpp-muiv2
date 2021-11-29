import { Notification, Report, User } from "../../graphql/types";
import { ReportType } from "./../../graphql/types";

export interface CacheState {
  user?: User;
  userUpdate: boolean;
  reports: Report[];
  reportsUpdate: boolean;
  reportIsClosed: boolean;
  reportType: ReportType;
  notifications: Notification[];
}
