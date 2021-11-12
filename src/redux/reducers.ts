import ChatsReducer from "./chats/reducer";
import CurrentProfileReducer from "./currentProfile/reducer";
import GlobalChatReducer from "./globalchat/reducer";
import NotificationsReducer from "./notifications/reducer";
import ProductsReducer from "./products/reducer";
import ServicesReducer from "./services/reducer";
import SettingsReducer from "./settings/reducer";
import UIReducer from "./ui/reducer";
import UserDataReducer from "./userData/reducer";

export const reducers = {
  ui: UIReducer,
  settings: SettingsReducer,
  userData: UserDataReducer,
  currentProfile: CurrentProfileReducer,
  globalChat: GlobalChatReducer,
  products: ProductsReducer,
  services: ServicesReducer,
  chats: ChatsReducer,
  notifications: NotificationsReducer,
};
