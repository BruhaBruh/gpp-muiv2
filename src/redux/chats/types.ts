import { Chat, Message } from "../../graphql/graphql";

export interface ChatsState {
  chats: { chat: Chat; messages: Message[]; page: number }[];
}
