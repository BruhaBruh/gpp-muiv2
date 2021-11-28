import CacheReducer from "./cache/reducer";
import SettingsReducer from "./settings/reducer";
import UIReducer from "./ui/reducer";
import UserDataReducer from "./userData/reducer";

export const reducers = {
  ui: UIReducer,
  settings: SettingsReducer,
  userData: UserDataReducer,
  cache: CacheReducer,
};
