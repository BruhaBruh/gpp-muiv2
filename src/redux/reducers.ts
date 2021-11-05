import CurrentProfileReducer from "./currentProfile/reducer";
import GlobalChatReducer from "./globalchat/reducer";
import SettingsReducer from "./settings/reducer";
import UIReducer from "./ui/reducer";
import UserDataReducer from "./userData/reducer";

export const reducers = {
  ui: UIReducer,
  settings: SettingsReducer,
  userData: UserDataReducer,
  currentProfile: CurrentProfileReducer,
  globalChat: GlobalChatReducer,
};
