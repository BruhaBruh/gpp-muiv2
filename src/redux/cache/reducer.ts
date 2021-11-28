import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification, Report, User } from "../../graphql/types";
import { CacheState } from "./types";

export const initialState: CacheState = {
  userUpdate: false,
  reports: [],
  reportsUpdate: true,
  reportIsClosed: false,
  notifications: [],
};

const getNotificationString = (n: Notification) => {
  switch (n.__typename) {
    case "Billnotification":
      return JSON.stringify({
        id: n.billnotificationId,
        __typename: n.__typename,
      });
    case "Friendnotification":
      return JSON.stringify({
        id: n.friendnotificationId,
        __typename: n.__typename,
      });
    case "Subscribernotification":
      return JSON.stringify({
        id: n.subscribernotificationId,
        __typename: n.__typename,
      });
    case "Systemnotification":
      return JSON.stringify({
        id: n.systemnotificationId,
        __typename: n.__typename,
      });
  }
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
    addReports: (state, action: PayloadAction<Report[]>) => {
      state.reports = [
        ...state.reports.filter(
          (u) => !action.payload.map((r) => r.reportId).includes(u.reportId)
        ),
        ...action.payload,
      ].sort(
        (a, b) =>
          new Date(b.lastMessage?.createdAt).getTime() -
          new Date(a.lastMessage?.createdAt).getTime()
      );
    },
    setReportsUpdate: (state, action: PayloadAction<boolean>) => {
      state.reportsUpdate = action.payload;
    },
    setReportIsClosed: (state, action: PayloadAction<boolean>) => {
      if (state.reportIsClosed === action.payload) return;
      state.reportIsClosed = action.payload;
      state.reportsUpdate = true;
    },
    clearReports: (state) => {
      state.reports = [];
    },
    addNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = [
        ...state.notifications.filter((n) => {
          const s = getNotificationString(n);
          return !action.payload.map(getNotificationString).includes(s);
        }),
        ...action.payload,
      ].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    removeNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications = state.notifications.filter(
        (n) =>
          getNotificationString(n) !== getNotificationString(action.payload)
      );
    },
  },
});

export const {
  setUser,
  setUserUpdate,
  addReports,
  setReportsUpdate,
  clearReports,
  setReportIsClosed,
  addNotifications,
  clearNotifications,
  removeNotification,
} = cacheSlice.actions;

export default cacheSlice.reducer;
