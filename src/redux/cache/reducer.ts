import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Report, User } from "../../graphql/types";
import { CacheState } from "./types";

export const initialState: CacheState = {
  userUpdate: false,
  reports: [],
  reportsUpdate: true,
  reportIsClosed: false,
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
  },
});

export const {
  setUser,
  setUserUpdate,
  addReports,
  setReportsUpdate,
  clearReports,
  setReportIsClosed,
} = cacheSlice.actions;

export default cacheSlice.reducer;
