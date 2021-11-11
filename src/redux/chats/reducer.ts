import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat, Message } from "../../graphql/graphql";
import { ChatsState } from "./types";

export const initialState: ChatsState = {
  chats: [],
};

const getMessagesOfChat = (state: ChatsState, chat: Chat): Message[] => {
  const chats = state.chats.filter((c) => c.chat.id === chat.id);
  if (!chats.length) return [];
  return chats.map((s) =>
    s.messages.filter((m) => m.id !== chat.lastMessage.id)
  )[0];
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload
        .map((c) => c)
        .sort(
          (a, b) =>
            new Date(b.lastMessage.createdAt).getTime() -
            new Date(a.lastMessage.createdAt).getTime()
        )
        .map((c) => ({
          chat: c,
          messages: [...getMessagesOfChat(state, c), c.lastMessage].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ),
          page: 1,
        }));
    },
    addChat: (state, action: PayloadAction<Chat>) => {
      state.chats = [
        ...state.chats.filter((c) => c.chat.id !== action.payload.id),
        {
          chat: action.payload,
          messages: [action.payload.lastMessage],
          page: 1,
        },
      ]
        .map((c) => c)
        .sort(
          (a, b) =>
            new Date(b.chat.lastMessage.createdAt).getTime() -
            new Date(a.chat.lastMessage.createdAt).getTime()
        );
    },
    addMessages: (
      state,
      action: PayloadAction<{ id: string; messages: Message[] }>
    ) => {
      state.chats = state.chats
        .map((c) => {
          if (c.chat.id === action.payload.id) {
            c.messages = [
              ...c.messages.filter(
                (m) => !action.payload.messages.map((d) => d.id).includes(m.id)
              ),
              ...action.payload.messages,
            ].sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
          }
          return c;
        })
        .sort(
          (a, b) =>
            new Date(b.chat.lastMessage.createdAt).getTime() -
            new Date(a.chat.lastMessage.createdAt).getTime()
        );
    },
    setLastMessage: (state, action: PayloadAction<Message>) => {
      state.chats = state.chats
        .map((c) => {
          if (action.payload.chat === c.chat.id) {
            c.chat.lastMessage = action.payload;
            c.chat.updatedAt = new Date().toISOString();
            c.messages = [
              ...c.messages.filter((m) => m.id !== action.payload.id),
              action.payload,
            ].sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
          }
          return c;
        })
        .sort(
          (a, b) =>
            new Date(b.chat.lastMessage.createdAt).getTime() -
            new Date(a.chat.lastMessage.createdAt).getTime()
        );
    },
    removeMessage: (state, action: PayloadAction<Message>) => {
      state.chats = state.chats
        .map((c) => {
          if (action.payload.chat === c.chat.id) {
            c.messages = c.messages
              .filter((m) => m.id !== action.payload.id)
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              );
          }
          return c;
        })
        .sort(
          (a, b) =>
            new Date(b.chat.lastMessage.createdAt).getTime() -
            new Date(a.chat.lastMessage.createdAt).getTime()
        );
    },
    readMessage: (state, action: PayloadAction<{ message: Message }>) => {
      state.chats = state.chats.map((c) => {
        if (action.payload.message.chat === c.chat.id) {
          c.messages = c.messages.map((m) => {
            if (m.id === action.payload.message.id) {
              m.readed = true;
            }
            return m;
          });
        }
        return c;
      });
    },
    incPage: (state, action: PayloadAction<string>) => {
      state.chats = state.chats.map((c) => {
        if (c.chat.id === action.payload) {
          c.page += 1;
        }
        return c;
      });
    },
  },
});

export const {
  setChats,
  addChat,
  setLastMessage,
  incPage,
  addMessages,
  removeMessage,
  readMessage,
} = chatsSlice.actions;

export default chatsSlice.reducer;
