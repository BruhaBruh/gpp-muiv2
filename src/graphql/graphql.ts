import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  HEXColor: any;
  MediaLink: any;
  ObjectID: any;
};

/** Донат выпадающий с кейса */
export type CaseItem = {
  __typename?: 'CaseItem';
  /** Кол-во товара (например кол-во монет) */
  amount?: Maybe<Scalars['Int']>;
  /** Тип доната (смотреть ./src/donate/items.ts) */
  type: Scalars['Int'];
};

/** Категория товара */
export type Category = {
  __typename?: 'Category';
  /** Цвет категории в hex формате #FFFFFF | #000000FF */
  color: Scalars['HEXColor'];
  /** id категории */
  id: Scalars['ObjectID'];
  /** Название категории */
  name: Scalars['String'];
};

/** Чат */
export type Chat = {
  __typename?: 'Chat';
  /** Аватар чата (при типе чата CHAT) */
  avatar: Scalars['MediaLink'];
  /** Дата создания чата */
  createdAt: Scalars['Date'];
  /** id чата */
  id: Scalars['ObjectID'];
  /** Последнее сообщение чата */
  lastMessage: Message;
  /** Название чата (при типе чата CHAT) */
  name: Scalars['String'];
  /** Создатель чата (при типе чата CHAT) */
  owner?: Maybe<Scalars['ObjectID']>;
  /** Участники чата */
  profiles: Array<Profile>;
  /** Тип чата */
  type: ChatType;
  /** Дата обновления чата */
  updatedAt: Scalars['Date'];
};

/** Тип чата */
export enum ChatType {
  Chat = 'CHAT',
  Dialog = 'DIALOG',
  Product = 'PRODUCT'
}

/** Поля для создать категории */
export type CreateCategoryInput = {
  /** Цвет категории в hex формате #FFFFFF | #000000FF */
  color: Scalars['HEXColor'];
  /** Название категории */
  name: Scalars['String'];
};

/** Поля ввода для создания чата */
export type CreateChatInput = {
  /** Тип чата */
  type: ChatType;
  /** Профиль с которым нужно создать чат */
  withProfile: Scalars['ObjectID'];
};

/** Поля ввода для создания сообщения глобального чата */
export type CreateGlobalChatMessageInput = {
  /** Сообщение */
  message: Scalars['String'];
  /** Сервер */
  server: Scalars['ObjectID'];
};

/** Поля ввода для создания иконок */
export type CreateIconInput = {
  /** Категория */
  category: Scalars['ObjectID'];
  /** Изображение */
  image: Scalars['MediaLink'];
  /** Название */
  name: Scalars['String'];
};

/** Поля ввода создания товара */
export type CreateProductInput = {
  /** Количество */
  amount: Scalars['Int'];
  /** Цена */
  cost: Scalars['Int'];
  /** Описание */
  description: Scalars['String'];
  /** Иконка */
  icon: Scalars['ObjectID'];
  /** Подсвечен? */
  isHighlighted: Scalars['Boolean'];
  /** Сервер */
  server: Scalars['ObjectID'];
};

/** Поля ввода создания товара */
export type CreateServiceInput = {
  /** Цена */
  cost: Scalars['Int'];
  /** Описание */
  description: Scalars['String'];
  /** Иконка */
  icon: Scalars['ObjectID'];
  /** Подсвечен? */
  isHighlighted: Scalars['Boolean'];
  /** Сервер */
  server: Scalars['ObjectID'];
};

/** Поля для редактирования категории */
export type EditCategoryInput = {
  /** Цвет категории в hex формате #FFFFFF | #000000FF */
  color?: Maybe<Scalars['HEXColor']>;
  /** Название категории */
  name?: Maybe<Scalars['String']>;
};

/** Поля ввода для редактирования чата */
export type EditChatInput = {
  /** Массив ObjectID профилей, которых нужно добавить в чат */
  addToChat?: Maybe<Array<Scalars['ObjectID']>>;
  /** Аватар */
  avatar?: Maybe<Scalars['MediaLink']>;
  /** Название чата */
  name?: Maybe<Scalars['String']>;
  /** Массив ObjectID профилей, которых нужно удалить из чата */
  removeFromChat?: Maybe<Array<Scalars['ObjectID']>>;
};

/** Поля ввода для редактирования иконок */
export type EditIconInput = {
  /** Категория */
  category?: Maybe<Scalars['ObjectID']>;
  /** Изображение */
  image?: Maybe<Scalars['MediaLink']>;
  /** Название */
  name?: Maybe<Scalars['String']>;
};

/** Поля ввода для редактирования сообщения */
export type EditMessageInput = {
  /** Сообщение */
  message: Scalars['String'];
};

/** Поля ввода редактироваения товара */
export type EditProductInput = {
  /** Количество */
  amount?: Maybe<Scalars['Int']>;
  /** Цена */
  cost?: Maybe<Scalars['Int']>;
  /** Описание */
  description?: Maybe<Scalars['String']>;
  /** Подсвечен? */
  isHighlighted?: Maybe<Scalars['Boolean']>;
};

/** Поля для редактирования профиля */
export type EditProfileInput = {
  /** Ссылка на Аватарку 256x256 */
  avatar?: Maybe<Scalars['MediaLink']>;
  /** Ссылка на баннер 722x185 */
  banner?: Maybe<Scalars['MediaLink']>;
  /** Описание */
  description?: Maybe<Scalars['String']>;
  /** Пол */
  sex?: Maybe<Sex>;
  showPhone?: Maybe<Scalars['Boolean']>;
  /** Статус */
  status?: Maybe<Scalars['String']>;
};

/** Поля ввода редактироваения товара */
export type EditServiceInput = {
  /** Цена */
  cost?: Maybe<Scalars['Int']>;
  /** Описание */
  description?: Maybe<Scalars['String']>;
  /** Подсвечен? */
  isHighlighted?: Maybe<Scalars['Boolean']>;
};

/** Поля для редактирования пользователя */
export type EditUserInput = {
  /** Забанен? При True USER_SET_BAN, иначе USER_REMOVE_BAN */
  banned?: Maybe<Scalars['Boolean']>;
  /** Баланс. При USER_MODIFY_MONEY */
  money?: Maybe<Scalars['Float']>;
  /** Права для выдачи, сначала срабатывает удаление. При USER_MODIFY_PERMISSIONS */
  permissionsToAdd?: Maybe<Array<Permissions>>;
  /** Права для удаления, срабатывает первым, потом выдача. При USER_MODIFY_PERMISSIONS */
  permissionsToRemove?: Maybe<Array<Permissions>>;
};

/** Сообщение глобального чата */
export type GlobalChatMessage = {
  __typename?: 'GlobalChatMessage';
  /** Дата создания */
  createdAt: Scalars['Date'];
  /** id сообщения */
  id: Scalars['ID'];
  /** Сообщение */
  message: Scalars['String'];
  /** Создатель */
  owner: Profile;
  /** Сервер */
  server: Scalars['ObjectID'];
};

/** Удаленное сообщение */
export type GlobalChatRemove = {
  __typename?: 'GlobalChatRemove';
  /** id сообщения */
  id: Scalars['ID'];
  /** Сервер */
  server: Scalars['ObjectID'];
};

/** Иконка */
export type Icon = {
  __typename?: 'Icon';
  /** Категория */
  category: Category;
  /** id иконки */
  id: Scalars['ObjectID'];
  /** Изображение */
  image: Scalars['MediaLink'];
  /** Название иконки */
  name: Scalars['String'];
};

/** Результат поиска иконок */
export type IconSearchResult = {
  __typename?: 'IconSearchResult';
  /** Есть еще */
  hasMore: Scalars['Boolean'];
  /** Массив иконок */
  result: Array<Icon>;
};

/** Сообщение */
export type Message = {
  __typename?: 'Message';
  /** ID чата */
  chat: Scalars['ObjectID'];
  /** Дата создания */
  createdAt: Scalars['Date'];
  /** Редактирован? */
  edited: Scalars['Boolean'];
  /** ID сообщения */
  id: Scalars['ObjectID'];
  /** Сообщение */
  message: Scalars['String'];
  /** ID создателя */
  owner?: Maybe<Profile>;
  /** ID пользователей прочитавших сообщение */
  readed: Scalars['Boolean'];
  /** ID пересланного сообщения */
  reply?: Maybe<Scalars['ObjectID']>;
  /** Тип сообщения */
  type: MessageType;
  /** Дата обновления */
  updatedAt: Scalars['Date'];
};

/** Результат поиска сообщений */
export type MessageSearchResult = {
  __typename?: 'MessageSearchResult';
  /** Есть еще? */
  hasMore: Scalars['Boolean'];
  /** Результат, Массим сообщений */
  result: Array<Message>;
};

/** Тип сообщения */
export enum MessageType {
  System = 'SYSTEM',
  User = 'USER'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Добавить в чс */
  addToBlacklist: Profile;
  /** Добавить просмотр в профиль */
  addView: Scalars['Boolean'];
  /** Купить донат */
  buy: Scalars['Boolean'];
  /** Купить трефы */
  buyTref: Scalars['Boolean'];
  /** Создать категорию */
  createCategory: Category;
  /** Создание чата */
  createChat: Chat;
  /** Создание глобального сообщения */
  createGlobalChatMessage: GlobalChatMessage;
  /** Создание иконки, право доступа ICON_MODIFY */
  createIcon: Icon;
  /** Создание товара */
  createProduct: Product;
  createReport: ReportChat;
  /** Создание Сервиса */
  createService: Product;
  /** Редактировать категорию */
  editCategory: Category;
  /** Редактирование чата */
  editChat: Chat;
  /** Редактирование иконки, право доступа ICON_MODIFY */
  editIcon: Icon;
  /** Редактирование сообщения */
  editMessage: Message;
  /** Редактирование товаров */
  editProduct: Product;
  /** Редактировать профиль по id */
  editProfile: Profile;
  /** Редактирование Сервисов */
  editService: Product;
  /** Редактирование профиля */
  editUser?: Maybe<User>;
  /** Перестать быть подписчиком профиля под id */
  endSubscribe: Profile;
  /** Скрыть чат */
  hideChat: Chat;
  /** Выход из чата */
  leaveChat: Scalars['Boolean'];
  /** Открыть кейс */
  openCase: CaseItem;
  /** Прочитать сообщение */
  readMessage: Message;
  /** Удаление чата */
  removeChat: Chat;
  /** Удалить из друзей профиль с id */
  removeFriend: Profile;
  /** Удалить из чс */
  removeFromBlacklist: Profile;
  /** Удаление глобального сообщения, только с правом доступа GLOBALCHAT_REMOVE */
  removeGlobalChatMessage: GlobalChatRemove;
  /** Удаление сообщения */
  removeMessage: Message;
  /** Удаление товара */
  removeProduct: Product;
  removeReport: ReportChat;
  /** Удаление Сервиса */
  removeService: Product;
  /** Выбор/Создание профиля по id сервера */
  selectProfile: Profile;
  /** Отправка сообещиня */
  sendMessage: Message;
  sendReportMessage: ReportMessage;
  /** Установить рейтинг профилю с id */
  setRating: Profile;
  /** Стать подписчиком профиля под id */
  startSubscribe: Profile;
  /** Обновить онлайн */
  updateLastOnline: Profile;
};


export type MutationAddToBlacklistArgs = {
  id: Scalars['ObjectID'];
};


export type MutationAddViewArgs = {
  profile: Scalars['ObjectID'];
};


export type MutationBuyArgs = {
  itemType: Scalars['Int'];
  server: Scalars['ObjectID'];
};


export type MutationBuyTrefArgs = {
  amount: Scalars['Int'];
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateChatArgs = {
  input: CreateChatInput;
};


export type MutationCreateGlobalChatMessageArgs = {
  input: CreateGlobalChatMessageInput;
};


export type MutationCreateIconArgs = {
  input: CreateIconInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateReportArgs = {
  input: ReportCreateInput;
};


export type MutationCreateServiceArgs = {
  input: CreateServiceInput;
};


export type MutationEditCategoryArgs = {
  id: Scalars['ObjectID'];
  input: EditCategoryInput;
};


export type MutationEditChatArgs = {
  id: Scalars['ObjectID'];
  input: EditChatInput;
};


export type MutationEditIconArgs = {
  id: Scalars['ObjectID'];
  input: EditIconInput;
};


export type MutationEditMessageArgs = {
  id: Scalars['ObjectID'];
  input: EditMessageInput;
};


export type MutationEditProductArgs = {
  id: Scalars['ObjectID'];
  input: EditProductInput;
};


export type MutationEditProfileArgs = {
  id: Scalars['ObjectID'];
  input: EditProfileInput;
};


export type MutationEditServiceArgs = {
  id: Scalars['ObjectID'];
  input: EditServiceInput;
};


export type MutationEditUserArgs = {
  id: Scalars['ObjectID'];
  input: EditUserInput;
};


export type MutationEndSubscribeArgs = {
  id: Scalars['ObjectID'];
};


export type MutationHideChatArgs = {
  id: Scalars['ObjectID'];
  isHide: Scalars['Boolean'];
};


export type MutationLeaveChatArgs = {
  chat: Scalars['ObjectID'];
};


export type MutationOpenCaseArgs = {
  caseType: Scalars['Int'];
  server: Scalars['ObjectID'];
};


export type MutationReadMessageArgs = {
  id: Scalars['ObjectID'];
};


export type MutationRemoveChatArgs = {
  id: Scalars['ObjectID'];
};


export type MutationRemoveFriendArgs = {
  id: Scalars['ObjectID'];
};


export type MutationRemoveFromBlacklistArgs = {
  id: Scalars['ObjectID'];
};


export type MutationRemoveGlobalChatMessageArgs = {
  input: RemoveGlobalChatMessageInput;
};


export type MutationRemoveMessageArgs = {
  id: Scalars['ObjectID'];
};


export type MutationRemoveProductArgs = {
  id: Scalars['ObjectID'];
};


export type MutationRemoveReportArgs = {
  id: Scalars['ObjectID'];
};


export type MutationRemoveServiceArgs = {
  id: Scalars['ObjectID'];
};


export type MutationSelectProfileArgs = {
  server: Scalars['ObjectID'];
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};


export type MutationSendReportMessageArgs = {
  id: Scalars['ObjectID'];
  input: ReportMessageInput;
};


export type MutationSetRatingArgs = {
  id: Scalars['ObjectID'];
  input: SetRatingInput;
};


export type MutationStartSubscribeArgs = {
  id: Scalars['ObjectID'];
};


export type MutationUpdateLastOnlineArgs = {
  id: Scalars['ObjectID'];
};

export type News = {
  __typename?: 'News';
  createdAt: Scalars['Date'];
  id: Scalars['ObjectID'];
  tags: Array<NewsTag>;
  text: Scalars['String'];
  title: Scalars['String'];
};

export type NewsResult = {
  __typename?: 'NewsResult';
  hasMore: Scalars['Boolean'];
  result: Array<News>;
};

export type NewsTag = {
  __typename?: 'NewsTag';
  color: Scalars['HEXColor'];
  id: Scalars['ObjectID'];
  label: Scalars['String'];
};

/** Права пользователя */
export enum Permissions {
  /** Все права */
  All = 'ALL',
  /** Право на редактирование категорий */
  CategoryModify = 'CATEGORY_MODIFY',
  /** Право на удаление чужих сообщений в глобальном чате */
  GlobalchatRemove = 'GLOBALCHAT_REMOVE',
  /** Право на редактирование иконок */
  IconModify = 'ICON_MODIFY',
  /** Право на Подписку Lite */
  LiteSubscription = 'LITE_SUBSCRIPTION',
  /** Право на Подписку Premium */
  PremiumSubscription = 'PREMIUM_SUBSCRIPTION',
  /** Право на удаление чужих товаров */
  ProductRemove = 'PRODUCT_REMOVE',
  /** Право на редактирование сервера */
  ServerModify = 'SERVER_MODIFY',
  /** Право на редактирование баланса */
  UserModifyMoney = 'USER_MODIFY_MONEY',
  /** Право на редактирование прав */
  UserModifyPermissions = 'USER_MODIFY_PERMISSIONS',
  /** Создание новостей */
  UserNewsModify = 'USER_NEWS_MODIFY',
  /** Защита от блокировки */
  UserPreventBan = 'USER_PREVENT_BAN',
  /** Право на возможность разбана пользователей */
  UserRemoveBan = 'USER_REMOVE_BAN',
  /** Просмотр репортов */
  UserReport = 'USER_REPORT',
  /** Право на возможность бана пользователей */
  UserSetBan = 'USER_SET_BAN'
}

/** Товар */
export type Product = {
  __typename?: 'Product';
  /** Количество */
  amount?: Maybe<Scalars['Int']>;
  /** Цена */
  cost: Scalars['Int'];
  /** Дата создания */
  createdAt: Scalars['Date'];
  /** Описание */
  description: Scalars['String'];
  /** Иконка */
  icon: Icon;
  /** id товара */
  id: Scalars['ObjectID'];
  /** Подсвечен? */
  isHighlighted: Scalars['Boolean'];
  /** Создатель */
  owner: Profile;
  /** Сервер */
  server: Scalars['ObjectID'];
};

/** Результат поиска товаров */
export type ProductSearchResult = {
  __typename?: 'ProductSearchResult';
  /** Есть еще? */
  hasMore: Scalars['Boolean'];
  /** Массив товаров */
  result: Array<Product>;
};

/** Тип сортировки */
export enum ProductSort {
  /** Цена по возрастанию */
  CostAsc = 'COST_ASC',
  /** Цена по убыванию */
  CostDesc = 'COST_DESC',
  /** Дата создания по возрастанию */
  DateAsc = 'DATE_ASC',
  /** Дата создания по убыванию */
  DateDesc = 'DATE_DESC',
  /** По умолчанию, сначала подсвеченные, сначала новые */
  Default = 'DEFAULT'
}

/** Профиль */
export type Profile = {
  __typename?: 'Profile';
  /** Ссылка на аватарку. Imgur или Postimg. Прямая ссылка! */
  avatar: Scalars['MediaLink'];
  /** Ссылка на баннер. Imgur или Postimg. Прямая ссылка! */
  banner: Scalars['MediaLink'];
  /** Черный список */
  blacklist: Array<Profile>;
  /** Создан */
  createdAt: Scalars['Date'];
  /** Описание */
  description: Scalars['String'];
  /** Discord ID */
  discord: Scalars['ID'];
  /** discriminator */
  discriminator: Scalars['String'];
  /** Друзья */
  friends: Array<Profile>;
  /** ObjectID профиля */
  id: Scalars['ObjectID'];
  /** Последний онлайн */
  lastOnline: Scalars['Date'];
  /** Уровень PayDay */
  level: Scalars['Int'];
  /** Ник на дискорд сервере */
  nickname: Scalars['String'];
  /** Телефон */
  phone?: Maybe<Scalars['Int']>;
  /** Рейтинги */
  ratings: Scalars['Int'];
  /** Роль */
  role?: Maybe<Scalars['String']>;
  /** Роли в дискорде */
  roles: Array<Role>;
  /** Сервер minecraft */
  server: Scalars['ObjectID'];
  /** Пол */
  sex: Sex;
  /** показывать номер телефона? */
  showPhone: Scalars['Boolean'];
  /** Продано товаров */
  soldProducts: Scalars['Int'];
  /** Статус */
  status: Scalars['String'];
  /** Подписчики */
  subscribers: Array<Profile>;
  /** Обновлен */
  updatedAt: Scalars['Date'];
  /** ObjectID пользователя */
  user: User;
  /** Просмотров профиля */
  views: Scalars['Int'];
  /** Профессия */
  work?: Maybe<Scalars['String']>;
};

export type ProfileSearchResult = {
  __typename?: 'ProfileSearchResult';
  hasMore: Scalars['Boolean'];
  result: Array<Profile>;
};

export type ProfileStatus = {
  __typename?: 'ProfileStatus';
  /** Он в чс? */
  heInBlacklist: Scalars['Boolean'];
  /** Он подписчик? */
  heIsSubscriber: Scalars['Boolean'];
  /** Вы в чс? */
  inBlacklist: Scalars['Boolean'];
  /** Вы друзья? */
  isFriend: Scalars['Boolean'];
  /** Вы подписчик? */
  isSubscriber: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  /** Все категории */
  categories: Array<Category>;
  /** Категория по его id */
  category?: Maybe<Category>;
  /** Чат по id */
  chat?: Maybe<Chat>;
  /** Все чаты профиля */
  chats: Array<Chat>;
  /** Профили чата */
  getChatProfiles: Array<Profile>;
  /** Последнее сообщение чата */
  getLastMessage: Message;
  /** Статус между профилем по id и отправителем */
  getMyStatus: ProfileStatus;
  /** Узнать количество треф */
  getTref: Scalars['Int'];
  globalChatMessages: Array<GlobalChatMessage>;
  /** Все скрытые чаты */
  hidedChats: Array<Chat>;
  /** Иконка по id */
  icon?: Maybe<Icon>;
  /** Поиск иконок */
  icons: IconSearchResult;
  /** Сообщения чата */
  messages: MessageSearchResult;
  myReports: Array<ReportChat>;
  news: NewsResult;
  newsByID: News;
  /** Товар по id */
  product?: Maybe<Product>;
  /** Товары */
  products: ProductSearchResult;
  /** Профиль по id */
  profile?: Maybe<Profile>;
  /** Все профили */
  profiles: ProfileSearchResult;
  report: ReportChat;
  reportMessages: Array<ReportMessage>;
  reports: Array<ReportChat>;
  /** Сервер по id */
  server?: Maybe<Server>;
  /** Сервера */
  servers: Array<Server>;
  /** Сервис по id */
  service?: Maybe<Product>;
  /** Сервисы */
  services: ProductSearchResult;
  /** Статус пользователя по отношению к дискорд серверу */
  status: UserStatus;
  /** Пользователь по id */
  user?: Maybe<User>;
  /** Все пользователи */
  users: UserSearchResult;
};


export type QueryCategoryArgs = {
  id: Scalars['ObjectID'];
};


export type QueryChatArgs = {
  id: Scalars['ObjectID'];
};


export type QueryChatsArgs = {
  server: Scalars['ObjectID'];
};


export type QueryGetChatProfilesArgs = {
  chat: Scalars['ObjectID'];
};


export type QueryGetLastMessageArgs = {
  chat: Scalars['ObjectID'];
};


export type QueryGetMyStatusArgs = {
  id: Scalars['ObjectID'];
};


export type QueryHidedChatsArgs = {
  server: Scalars['ObjectID'];
};


export type QueryIconArgs = {
  id: Scalars['ObjectID'];
};


export type QueryIconsArgs = {
  category?: Maybe<Scalars['ObjectID']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryMessagesArgs = {
  chat: Scalars['ObjectID'];
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
};


export type QueryMyReportsArgs = {
  profile: Scalars['ObjectID'];
};


export type QueryNewsArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryNewsByIdArgs = {
  id: Scalars['ObjectID'];
};


export type QueryProductArgs = {
  id: Scalars['ObjectID'];
};


export type QueryProductsArgs = {
  category?: Maybe<Scalars['ObjectID']>;
  icon?: Maybe<Scalars['ObjectID']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
  server: Scalars['ObjectID'];
  sort?: Maybe<ProductSort>;
};


export type QueryProfileArgs = {
  id: Scalars['ObjectID'];
};


export type QueryProfilesArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  role?: Maybe<Scalars['ID']>;
  search?: Maybe<Scalars['String']>;
  server: Scalars['ObjectID'];
};


export type QueryReportArgs = {
  id: Scalars['ObjectID'];
};


export type QueryReportMessagesArgs = {
  id: Scalars['ObjectID'];
};


export type QueryServerArgs = {
  id: Scalars['ObjectID'];
};


export type QueryServiceArgs = {
  id: Scalars['ObjectID'];
};


export type QueryServicesArgs = {
  icon?: Maybe<Scalars['ObjectID']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
  server: Scalars['ObjectID'];
  sort?: Maybe<ProductSort>;
};


export type QueryStatusArgs = {
  server: Scalars['ObjectID'];
};


export type QueryUserArgs = {
  id: Scalars['ObjectID'];
};


export type QueryUsersArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

/** Рейтинг */
export type Rating = {
  __typename?: 'Rating';
  /** Положительный? Иначе отрицательный */
  positive: Scalars['Boolean'];
  /** От кого, ObjectID пользователя */
  user: Scalars['ObjectID'];
};

/** Поля ввода для удаления сообщения */
export type RemoveGlobalChatMessageInput = {
  /** id сообщения */
  id: Scalars['ID'];
  /** Сервер */
  server: Scalars['ObjectID'];
};

export type ReportChat = {
  __typename?: 'ReportChat';
  createdAt: Scalars['Date'];
  id: Scalars['ObjectID'];
  owner: Profile;
  server: Scalars['ObjectID'];
  type: ReportType;
};

export type ReportCreateInput = {
  message: Scalars['String'];
  server: Scalars['ObjectID'];
  type: ReportType;
};

export type ReportMessage = {
  __typename?: 'ReportMessage';
  createdAt: Scalars['Date'];
  id: Scalars['ObjectID'];
  message: Scalars['String'];
  owner: Profile;
  report: Scalars['ObjectID'];
  type: ReportMessageType;
};

export type ReportMessageInput = {
  message: Scalars['String'];
};

export enum ReportMessageType {
  Admin = 'ADMIN',
  User = 'USER'
}

export enum ReportType {
  Bug = 'BUG',
  Feature = 'FEATURE',
  Report = 'REPORT'
}

/** Роль на дискорд сервере */
export type Role = {
  __typename?: 'Role';
  /** Цвет роли */
  color: Scalars['HEXColor'];
  /** Выделена? */
  hoist: Scalars['Boolean'];
  /** id роли */
  id: Scalars['ID'];
  /** Название роли */
  name: Scalars['String'];
  /** Позиция роли */
  position: Scalars['Int'];
};

/** Поля ввода для отправки сообщения */
export type SendMessageInput = {
  /** ObjectID чата */
  chat: Scalars['ObjectID'];
  /** Сообщения */
  message: Scalars['String'];
  /** id пересланного сообщения */
  reply?: Maybe<Scalars['ObjectID']>;
};

/** Сервер */
export type Server = {
  __typename?: 'Server';
  /** ID заблокированных к показу ролей */
  blacklistRoles: Array<Scalars['ID']>;
  /** ID подтвержденной роли */
  confirmedRole: Scalars['ID'];
  /** Дата создания */
  createdAt: Scalars['Date'];
  /** ID дискорд сервера */
  discord: Scalars['ID'];
  /** Иконка дискорд сервера */
  icon: Scalars['String'];
  /** ObjectID */
  id: Scalars['ObjectID'];
  /** Lite Подписка */
  liteRole: Scalars['ID'];
  /** Название */
  name: Scalars['String'];
  /** Premium Подписка */
  premiumRole: Scalars['ID'];
  /** Роли на дискорд сервере */
  roles: Array<Role>;
  /** Дата обновления */
  updatedAt: Scalars['Date'];
};

/** Поля для установки рейтинга профилю */
export type SetRatingInput = {
  /** Положительный? Если нейтральный, то null */
  positive?: Maybe<Scalars['Boolean']>;
};

/** Пол */
export enum Sex {
  /** Женщина */
  Female = 'FEMALE',
  /** Мужчина */
  Male = 'MALE',
  /** Не указан */
  Undefined = 'UNDEFINED'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Удаленное сообщение */
  deletedMessage: Message;
  /** Отредактированное сообщение */
  editedMessage: Message;
  /** Новое глобальное сообщение */
  globalChatMessageCreated: GlobalChatMessage;
  /** Удаленное глобальное сообщение */
  globalChatMessageRemoved: GlobalChatRemove;
  newChat: Chat;
  /** Новое сообщение */
  newMessage: Message;
  newReportMessage: ReportMessage;
};


export type SubscriptionDeletedMessageArgs = {
  profile: Scalars['ObjectID'];
};


export type SubscriptionEditedMessageArgs = {
  profile: Scalars['ObjectID'];
};


export type SubscriptionNewChatArgs = {
  profile: Scalars['ObjectID'];
};


export type SubscriptionNewMessageArgs = {
  profile: Scalars['ObjectID'];
};


export type SubscriptionNewReportMessageArgs = {
  id: Scalars['ObjectID'];
};

/** Пользователь. Создается при входе через дискорд */
export type User = {
  __typename?: 'User';
  /** Забанен? */
  banned: Scalars['Boolean'];
  /** Дата создания */
  createdAt: Scalars['Date'];
  /** Discord ID */
  discord: Scalars['ID'];
  /** Дата окончания подписки */
  endSubscriptionAt?: Maybe<Scalars['Date']>;
  /** ObjectID */
  id: Scalars['ObjectID'];
  /** Баланс */
  money: Scalars['Float'];
  /** Права пользователя */
  permissions: Array<Permissions>;
  /** Дата редактирования */
  updatedAt: Scalars['Date'];
};

export type UserSearchResult = {
  __typename?: 'UserSearchResult';
  hasMore: Scalars['Boolean'];
  result: Array<User>;
};

/** Статус пользователя по отношению к дискорд серверу */
export type UserStatus = {
  __typename?: 'UserStatus';
  /** Подтвержен */
  isValidated: Scalars['Boolean'];
  /** На сервере */
  onServer: Scalars['Boolean'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CaseItem: ResolverTypeWrapper<CaseItem>;
  Category: ResolverTypeWrapper<Category>;
  Chat: ResolverTypeWrapper<Chat>;
  ChatType: ChatType;
  CreateCategoryInput: CreateCategoryInput;
  CreateChatInput: CreateChatInput;
  CreateGlobalChatMessageInput: CreateGlobalChatMessageInput;
  CreateIconInput: CreateIconInput;
  CreateProductInput: CreateProductInput;
  CreateServiceInput: CreateServiceInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  EditCategoryInput: EditCategoryInput;
  EditChatInput: EditChatInput;
  EditIconInput: EditIconInput;
  EditMessageInput: EditMessageInput;
  EditProductInput: EditProductInput;
  EditProfileInput: EditProfileInput;
  EditServiceInput: EditServiceInput;
  EditUserInput: EditUserInput;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GlobalChatMessage: ResolverTypeWrapper<GlobalChatMessage>;
  GlobalChatRemove: ResolverTypeWrapper<GlobalChatRemove>;
  HEXColor: ResolverTypeWrapper<Scalars['HEXColor']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Icon: ResolverTypeWrapper<Icon>;
  IconSearchResult: ResolverTypeWrapper<IconSearchResult>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  MediaLink: ResolverTypeWrapper<Scalars['MediaLink']>;
  Message: ResolverTypeWrapper<Message>;
  MessageSearchResult: ResolverTypeWrapper<MessageSearchResult>;
  MessageType: MessageType;
  Mutation: ResolverTypeWrapper<{}>;
  News: ResolverTypeWrapper<News>;
  NewsResult: ResolverTypeWrapper<NewsResult>;
  NewsTag: ResolverTypeWrapper<NewsTag>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']>;
  Permissions: Permissions;
  Product: ResolverTypeWrapper<Product>;
  ProductSearchResult: ResolverTypeWrapper<ProductSearchResult>;
  ProductSort: ProductSort;
  Profile: ResolverTypeWrapper<Profile>;
  ProfileSearchResult: ResolverTypeWrapper<ProfileSearchResult>;
  ProfileStatus: ResolverTypeWrapper<ProfileStatus>;
  Query: ResolverTypeWrapper<{}>;
  Rating: ResolverTypeWrapper<Rating>;
  RemoveGlobalChatMessageInput: RemoveGlobalChatMessageInput;
  ReportChat: ResolverTypeWrapper<ReportChat>;
  ReportCreateInput: ReportCreateInput;
  ReportMessage: ResolverTypeWrapper<ReportMessage>;
  ReportMessageInput: ReportMessageInput;
  ReportMessageType: ReportMessageType;
  ReportType: ReportType;
  Role: ResolverTypeWrapper<Role>;
  SendMessageInput: SendMessageInput;
  Server: ResolverTypeWrapper<Server>;
  SetRatingInput: SetRatingInput;
  Sex: Sex;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  UserSearchResult: ResolverTypeWrapper<UserSearchResult>;
  UserStatus: ResolverTypeWrapper<UserStatus>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CaseItem: CaseItem;
  Category: Category;
  Chat: Chat;
  CreateCategoryInput: CreateCategoryInput;
  CreateChatInput: CreateChatInput;
  CreateGlobalChatMessageInput: CreateGlobalChatMessageInput;
  CreateIconInput: CreateIconInput;
  CreateProductInput: CreateProductInput;
  CreateServiceInput: CreateServiceInput;
  Date: Scalars['Date'];
  EditCategoryInput: EditCategoryInput;
  EditChatInput: EditChatInput;
  EditIconInput: EditIconInput;
  EditMessageInput: EditMessageInput;
  EditProductInput: EditProductInput;
  EditProfileInput: EditProfileInput;
  EditServiceInput: EditServiceInput;
  EditUserInput: EditUserInput;
  Float: Scalars['Float'];
  GlobalChatMessage: GlobalChatMessage;
  GlobalChatRemove: GlobalChatRemove;
  HEXColor: Scalars['HEXColor'];
  ID: Scalars['ID'];
  Icon: Icon;
  IconSearchResult: IconSearchResult;
  Int: Scalars['Int'];
  MediaLink: Scalars['MediaLink'];
  Message: Message;
  MessageSearchResult: MessageSearchResult;
  Mutation: {};
  News: News;
  NewsResult: NewsResult;
  NewsTag: NewsTag;
  ObjectID: Scalars['ObjectID'];
  Product: Product;
  ProductSearchResult: ProductSearchResult;
  Profile: Profile;
  ProfileSearchResult: ProfileSearchResult;
  ProfileStatus: ProfileStatus;
  Query: {};
  Rating: Rating;
  RemoveGlobalChatMessageInput: RemoveGlobalChatMessageInput;
  ReportChat: ReportChat;
  ReportCreateInput: ReportCreateInput;
  ReportMessage: ReportMessage;
  ReportMessageInput: ReportMessageInput;
  Role: Role;
  SendMessageInput: SendMessageInput;
  Server: Server;
  SetRatingInput: SetRatingInput;
  String: Scalars['String'];
  Subscription: {};
  User: User;
  UserSearchResult: UserSearchResult;
  UserStatus: UserStatus;
};

export type CaseItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['CaseItem'] = ResolversParentTypes['CaseItem']> = {
  amount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  color?: Resolver<ResolversTypes['HEXColor'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']> = {
  avatar?: Resolver<ResolversTypes['MediaLink'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  lastMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  profiles?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ChatType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GlobalChatMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['GlobalChatMessage'] = ResolversParentTypes['GlobalChatMessage']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  server?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GlobalChatRemoveResolvers<ContextType = any, ParentType extends ResolversParentTypes['GlobalChatRemove'] = ResolversParentTypes['GlobalChatRemove']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  server?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface HexColorScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HEXColor'], any> {
  name: 'HEXColor';
}

export type IconResolvers<ContextType = any, ParentType extends ResolversParentTypes['Icon'] = ResolversParentTypes['Icon']> = {
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['MediaLink'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IconSearchResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['IconSearchResult'] = ResolversParentTypes['IconSearchResult']> = {
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  result?: Resolver<Array<ResolversTypes['Icon']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface MediaLinkScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MediaLink'], any> {
  name: 'MediaLink';
}

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  chat?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  edited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  readed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  reply?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MessageType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageSearchResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageSearchResult'] = ResolversParentTypes['MessageSearchResult']> = {
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  result?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addToBlacklist?: Resolver<ResolversTypes['Profile'], ParentType, ContextType, RequireFields<MutationAddToBlacklistArgs, 'id'>>;
  addView?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAddViewArgs, 'profile'>>;
  buy?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationBuyArgs, 'itemType' | 'server'>>;
  buyTref?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationBuyTrefArgs, 'amount'>>;
  createCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'input'>>;
  createChat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType, RequireFields<MutationCreateChatArgs, 'input'>>;
  createGlobalChatMessage?: Resolver<ResolversTypes['GlobalChatMessage'], ParentType, ContextType, RequireFields<MutationCreateGlobalChatMessageArgs, 'input'>>;
  createIcon?: Resolver<ResolversTypes['Icon'], ParentType, ContextType, RequireFields<MutationCreateIconArgs, 'input'>>;
  createProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'input'>>;
  createReport?: Resolver<ResolversTypes['ReportChat'], ParentType, ContextType, RequireFields<MutationCreateReportArgs, 'input'>>;
  createService?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationCreateServiceArgs, 'input'>>;
  editCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationEditCategoryArgs, 'id' | 'input'>>;
  editChat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType, RequireFields<MutationEditChatArgs, 'id' | 'input'>>;
  editIcon?: Resolver<ResolversTypes['Icon'], ParentType, ContextType, RequireFields<MutationEditIconArgs, 'id' | 'input'>>;
  editMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationEditMessageArgs, 'id' | 'input'>>;
  editProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationEditProductArgs, 'id' | 'input'>>;
  editProfile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType, RequireFields<MutationEditProfileArgs, 'id' | 'input'>>;
  editService?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationEditServiceArgs, 'id' | 'input'>>;
  editUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationEditUserArgs, 'id' | 'input'>>;
  endSubscribe?: Resolver<ResolversTypes['Profile'], ParentType, ContextType, RequireFields<MutationEndSubscribeArgs, 'id'>>;
  hideChat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType, RequireFields<MutationHideChatArgs, 'id' | 'isHide'>>;
  leaveChat?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationLeaveChatArgs, 'chat'>>;
  openCase?: Resolver<ResolversTypes['CaseItem'], ParentType, ContextType, RequireFields<MutationOpenCaseArgs, 'caseType' | 'server'>>;
  readMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationReadMessageArgs, 'id'>>;
  removeChat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType, RequireFields<MutationRemoveChatArgs, 'id'>>;
  removeFriend?: Resolver<ResolversTypes['Profile'], ParentType, ContextType, RequireFields<MutationRemoveFriendArgs, 'id'>>;
  removeFromBlacklist?: Resolver<ResolversTypes['Profile'], ParentType, ContextType, RequireFields<MutationRemoveFromBlacklistArgs, 'id'>>;
  removeGlobalChatMessage?: Resolver<ResolversTypes['GlobalChatRemove'], ParentType, ContextType, RequireFields<MutationRemoveGlobalChatMessageArgs, 'input'>>;
  removeMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationRemoveMessageArgs, 'id'>>;
  removeProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationRemoveProductArgs, 'id'>>;
  removeReport?: Resolver<ResolversTypes['ReportChat'], ParentType, ContextType, RequireFields<MutationRemoveReportArgs, 'id'>>;
  removeService?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationRemoveServiceArgs, 'id'>>;
  selectProfile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType, RequireFields<MutationSelectProfileArgs, 'server'>>;
  sendMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'input'>>;
  sendReportMessage?: Resolver<ResolversTypes['ReportMessage'], ParentType, ContextType, RequireFields<MutationSendReportMessageArgs, 'id' | 'input'>>;
  setRating?: Resolver<ResolversTypes['Profile'], ParentType, ContextType, RequireFields<MutationSetRatingArgs, 'id' | 'input'>>;
  startSubscribe?: Resolver<ResolversTypes['Profile'], ParentType, ContextType, RequireFields<MutationStartSubscribeArgs, 'id'>>;
  updateLastOnline?: Resolver<ResolversTypes['Profile'], ParentType, ContextType, RequireFields<MutationUpdateLastOnlineArgs, 'id'>>;
};

export type NewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['News'] = ResolversParentTypes['News']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['NewsTag']>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NewsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['NewsResult'] = ResolversParentTypes['NewsResult']> = {
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  result?: Resolver<Array<ResolversTypes['News']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NewsTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['NewsTag'] = ResolversParentTypes['NewsTag']> = {
  color?: Resolver<ResolversTypes['HEXColor'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  amount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  cost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['Icon'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  isHighlighted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  server?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductSearchResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductSearchResult'] = ResolversParentTypes['ProductSearchResult']> = {
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  result?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = {
  avatar?: Resolver<ResolversTypes['MediaLink'], ParentType, ContextType>;
  banner?: Resolver<ResolversTypes['MediaLink'], ParentType, ContextType>;
  blacklist?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  discord?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  discriminator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  friends?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  lastOnline?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ratings?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['Role']>, ParentType, ContextType>;
  server?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  sex?: Resolver<ResolversTypes['Sex'], ParentType, ContextType>;
  showPhone?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  soldProducts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subscribers?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  views?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  work?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileSearchResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileSearchResult'] = ResolversParentTypes['ProfileSearchResult']> = {
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  result?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileStatus'] = ResolversParentTypes['ProfileStatus']> = {
  heInBlacklist?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  heIsSubscriber?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  inBlacklist?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isFriend?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isSubscriber?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryCategoryArgs, 'id'>>;
  chat?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<QueryChatArgs, 'id'>>;
  chats?: Resolver<Array<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<QueryChatsArgs, 'server'>>;
  getChatProfiles?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QueryGetChatProfilesArgs, 'chat'>>;
  getLastMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<QueryGetLastMessageArgs, 'chat'>>;
  getMyStatus?: Resolver<ResolversTypes['ProfileStatus'], ParentType, ContextType, RequireFields<QueryGetMyStatusArgs, 'id'>>;
  getTref?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  globalChatMessages?: Resolver<Array<ResolversTypes['GlobalChatMessage']>, ParentType, ContextType>;
  hidedChats?: Resolver<Array<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<QueryHidedChatsArgs, 'server'>>;
  icon?: Resolver<Maybe<ResolversTypes['Icon']>, ParentType, ContextType, RequireFields<QueryIconArgs, 'id'>>;
  icons?: Resolver<ResolversTypes['IconSearchResult'], ParentType, ContextType, RequireFields<QueryIconsArgs, never>>;
  messages?: Resolver<ResolversTypes['MessageSearchResult'], ParentType, ContextType, RequireFields<QueryMessagesArgs, 'chat'>>;
  myReports?: Resolver<Array<ResolversTypes['ReportChat']>, ParentType, ContextType, RequireFields<QueryMyReportsArgs, 'profile'>>;
  news?: Resolver<ResolversTypes['NewsResult'], ParentType, ContextType, RequireFields<QueryNewsArgs, never>>;
  newsByID?: Resolver<ResolversTypes['News'], ParentType, ContextType, RequireFields<QueryNewsByIdArgs, 'id'>>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductArgs, 'id'>>;
  products?: Resolver<ResolversTypes['ProductSearchResult'], ParentType, ContextType, RequireFields<QueryProductsArgs, 'server'>>;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QueryProfileArgs, 'id'>>;
  profiles?: Resolver<ResolversTypes['ProfileSearchResult'], ParentType, ContextType, RequireFields<QueryProfilesArgs, 'server'>>;
  report?: Resolver<ResolversTypes['ReportChat'], ParentType, ContextType, RequireFields<QueryReportArgs, 'id'>>;
  reportMessages?: Resolver<Array<ResolversTypes['ReportMessage']>, ParentType, ContextType, RequireFields<QueryReportMessagesArgs, 'id'>>;
  reports?: Resolver<Array<ResolversTypes['ReportChat']>, ParentType, ContextType>;
  server?: Resolver<Maybe<ResolversTypes['Server']>, ParentType, ContextType, RequireFields<QueryServerArgs, 'id'>>;
  servers?: Resolver<Array<ResolversTypes['Server']>, ParentType, ContextType>;
  service?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryServiceArgs, 'id'>>;
  services?: Resolver<ResolversTypes['ProductSearchResult'], ParentType, ContextType, RequireFields<QueryServicesArgs, 'server'>>;
  status?: Resolver<ResolversTypes['UserStatus'], ParentType, ContextType, RequireFields<QueryStatusArgs, 'server'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<ResolversTypes['UserSearchResult'], ParentType, ContextType, RequireFields<QueryUsersArgs, never>>;
};

export type RatingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Rating'] = ResolversParentTypes['Rating']> = {
  positive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReportChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReportChat'] = ResolversParentTypes['ReportChat']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  server?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ReportType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReportMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReportMessage'] = ResolversParentTypes['ReportMessage']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  report?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ReportMessageType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  color?: Resolver<ResolversTypes['HEXColor'], ParentType, ContextType>;
  hoist?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ServerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Server'] = ResolversParentTypes['Server']> = {
  blacklistRoles?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  confirmedRole?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  discord?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  liteRole?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  premiumRole?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['Role']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  deletedMessage?: SubscriptionResolver<ResolversTypes['Message'], "deletedMessage", ParentType, ContextType, RequireFields<SubscriptionDeletedMessageArgs, 'profile'>>;
  editedMessage?: SubscriptionResolver<ResolversTypes['Message'], "editedMessage", ParentType, ContextType, RequireFields<SubscriptionEditedMessageArgs, 'profile'>>;
  globalChatMessageCreated?: SubscriptionResolver<ResolversTypes['GlobalChatMessage'], "globalChatMessageCreated", ParentType, ContextType>;
  globalChatMessageRemoved?: SubscriptionResolver<ResolversTypes['GlobalChatRemove'], "globalChatMessageRemoved", ParentType, ContextType>;
  newChat?: SubscriptionResolver<ResolversTypes['Chat'], "newChat", ParentType, ContextType, RequireFields<SubscriptionNewChatArgs, 'profile'>>;
  newMessage?: SubscriptionResolver<ResolversTypes['Message'], "newMessage", ParentType, ContextType, RequireFields<SubscriptionNewMessageArgs, 'profile'>>;
  newReportMessage?: SubscriptionResolver<ResolversTypes['ReportMessage'], "newReportMessage", ParentType, ContextType, RequireFields<SubscriptionNewReportMessageArgs, 'id'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  banned?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  discord?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  endSubscriptionAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  money?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  permissions?: Resolver<Array<ResolversTypes['Permissions']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSearchResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSearchResult'] = ResolversParentTypes['UserSearchResult']> = {
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  result?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserStatus'] = ResolversParentTypes['UserStatus']> = {
  isValidated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  onServer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CaseItem?: CaseItemResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Chat?: ChatResolvers<ContextType>;
  Date?: GraphQLScalarType;
  GlobalChatMessage?: GlobalChatMessageResolvers<ContextType>;
  GlobalChatRemove?: GlobalChatRemoveResolvers<ContextType>;
  HEXColor?: GraphQLScalarType;
  Icon?: IconResolvers<ContextType>;
  IconSearchResult?: IconSearchResultResolvers<ContextType>;
  MediaLink?: GraphQLScalarType;
  Message?: MessageResolvers<ContextType>;
  MessageSearchResult?: MessageSearchResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  News?: NewsResolvers<ContextType>;
  NewsResult?: NewsResultResolvers<ContextType>;
  NewsTag?: NewsTagResolvers<ContextType>;
  ObjectID?: GraphQLScalarType;
  Product?: ProductResolvers<ContextType>;
  ProductSearchResult?: ProductSearchResultResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  ProfileSearchResult?: ProfileSearchResultResolvers<ContextType>;
  ProfileStatus?: ProfileStatusResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Rating?: RatingResolvers<ContextType>;
  ReportChat?: ReportChatResolvers<ContextType>;
  ReportMessage?: ReportMessageResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  Server?: ServerResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserSearchResult?: UserSearchResultResolvers<ContextType>;
  UserStatus?: UserStatusResolvers<ContextType>;
};

