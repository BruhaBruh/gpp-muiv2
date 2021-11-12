import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "../../graphql/graphql";
import { NotificationsState } from "./types";

export const initialState: NotificationsState = {
  notifications: [],
};

export const notificationsSlice = createSlice({
  name: "notificationsProfile",
  initialState,
  reducers: {
    addNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = [
        ...state.notifications.filter(
          (nf) =>
            !action.payload
              .map((n) => n.id.toString())
              .includes(nf.id.toString())
        ),
        ...action.payload,
      ].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    readNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications = state.notifications.filter(
        (n) => n.id.toString() !== action.payload.id.toString()
      );
    },
  },
});

export const { addNotifications, readNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
