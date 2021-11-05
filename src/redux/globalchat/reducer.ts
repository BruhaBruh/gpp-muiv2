import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalChatMessage } from "../../graphql/graphql";
import { GlobalChatState } from "./types";

export const initialState: GlobalChatState = {
  messages: [],
};

export const globalchatSlice = createSlice({
  name: "globalchat",
  initialState,
  reducers: {
    addGCMessages: (state, action: PayloadAction<GlobalChatMessage[]>) => {
      state.messages = [
        ...state.messages.filter(
          (m) => !action.payload.map((i) => i.id).includes(m.id)
        ),
        ...action.payload,
      ].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    removeGCMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter((m) => m.id !== action.payload);
    },
  },
});

export const { addGCMessages, removeGCMessage } = globalchatSlice.actions;

export default globalchatSlice.reducer;
