export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Прямая ссылка на медиафайл сервисов postimg/imgur/tenor. Поддерживаются jpeg/jpg/png/gif/webp */
  MediaLink: any;
  /** The `Long` scalar type represents non-fractional signed whole 64-bit numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
};

export enum ApplyPolicy {
  BeforeResolver = "BEFORE_RESOLVER",
  AfterResolver = "AFTER_RESOLVER",
}

export type Query = {
  __typename?: "Query";
  users?: Maybe<UsersConnection>;
  donateItems?: Maybe<DonateItemsConnection>;
  siteOnlineLogs: Array<Online>;
  serverOnlineLogs: Array<Online>;
  top: Array<User>;
  discordRoles: Array<UserDiscordRole>;
  status: UserStatus;
  me: User;
  reports?: Maybe<ReportsConnection>;
  reportMessages?: Maybe<ReportMessagesConnection>;
  notifications: Array<Notification>;
  forums: Array<Forum>;
  threads?: Maybe<ThreadsConnection>;
  posts?: Maybe<PostsConnection>;
};

export type QueryUsersArgs = {
  search?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  where?: Maybe<UserFilterInput>;
  order?: Maybe<Array<UserSortInput>>;
};

export type QueryDonateItemsArgs = {
  first?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  where?: Maybe<DonateitemFilterInput>;
  order?: Maybe<Array<DonateitemSortInput>>;
};

export type QuerySiteOnlineLogsArgs = {
  type: OnlineTypes;
};

export type QueryServerOnlineLogsArgs = {
  type: OnlineTypes;
};

export type QueryTopArgs = {
  type: UserTopEnum;
  order?: Maybe<Array<UserSortInput>>;
};

export type QueryStatusArgs = {
  id: Scalars["Int"];
};

export type QueryReportsArgs = {
  first?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  where?: Maybe<ReportFilterInput>;
  order?: Maybe<Array<ReportSortInput>>;
};

export type QueryReportMessagesArgs = {
  reportId: Scalars["Int"];
  first?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  where?: Maybe<ReportmessageFilterInput>;
  order?: Maybe<Array<ReportmessageSortInput>>;
};

export type QueryForumsArgs = {
  where?: Maybe<ForumFilterInput>;
  order?: Maybe<Array<ForumSortInput>>;
};

export type QueryThreadsArgs = {
  first?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  where?: Maybe<ThreadFilterInput>;
  order?: Maybe<Array<ThreadSortInput>>;
};

export type QueryPostsArgs = {
  first?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  where?: Maybe<PostFilterInput>;
  order?: Maybe<Array<PostSortInput>>;
};

export type Mutation = {
  __typename?: "Mutation";
  test: Scalars["Boolean"];
  sendSystemNotification: Scalars["Boolean"];
  addSocialPoints: User;
  login: Scalars["Boolean"];
  initialUsersAdd: Scalars["Boolean"];
  createForum: Forum;
  editForum: Forum;
  removeForum: Forum;
  createThread: Thread;
  editThread: Thread;
  removeThread: Thread;
  createPost: Post;
  editPost: Post;
  incView: Scalars["Boolean"];
  editUser: User;
  startSubscribe: User;
  endSubscribe: User;
  removeFriend: User;
  setRating: User;
  createReport: Report;
  banReport: User;
  sendReportMessage: Reportmessage;
  setReportIsClosed: Scalars["Boolean"];
  readNotification: Scalars["Boolean"];
  buyDonate: Donateitem;
};

export type MutationSendSystemNotificationArgs = {
  toid?: Maybe<Scalars["Int"]>;
  message: Scalars["String"];
};

export type MutationAddSocialPointsArgs = {
  id: Scalars["Int"];
  socialPoints: Scalars["Int"];
};

export type MutationCreateForumArgs = {
  input: ForumCreateInput;
};

export type MutationEditForumArgs = {
  input: ForumEditInput;
};

export type MutationRemoveForumArgs = {
  id: Scalars["Int"];
};

export type MutationCreateThreadArgs = {
  input: ThreadCreateInput;
};

export type MutationEditThreadArgs = {
  input: ThreadEditInput;
};

export type MutationRemoveThreadArgs = {
  id: Scalars["Int"];
};

export type MutationCreatePostArgs = {
  input: PostCreateInput;
};

export type MutationEditPostArgs = {
  input: PostEditInput;
};

export type MutationIncViewArgs = {
  id: Scalars["Int"];
};

export type MutationEditUserArgs = {
  id: Scalars["Int"];
  input: UserEditInput;
};

export type MutationStartSubscribeArgs = {
  id: Scalars["Int"];
};

export type MutationEndSubscribeArgs = {
  id: Scalars["Int"];
};

export type MutationRemoveFriendArgs = {
  id: Scalars["Int"];
};

export type MutationSetRatingArgs = {
  id: Scalars["Int"];
  positive?: Maybe<Scalars["Boolean"]>;
};

export type MutationCreateReportArgs = {
  input: ReportCreateInput;
};

export type MutationBanReportArgs = {
  id: Scalars["Int"];
  isBanned: Scalars["Boolean"];
};

export type MutationSendReportMessageArgs = {
  input: ReportSendMessageInput;
};

export type MutationSetReportIsClosedArgs = {
  reportId: Scalars["Int"];
  isClosed: Scalars["Boolean"];
};

export type MutationReadNotificationArgs = {
  id: Scalars["Int"];
  type: Scalars["String"];
};

export type MutationBuyDonateArgs = {
  id: Scalars["Int"];
  amount?: Maybe<Scalars["Int"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  newReportMessage: Reportmessage;
  newNotification: Notification;
};

export type SubscriptionNewReportMessageArgs = {
  id: Scalars["Int"];
};

export type UserFilterInput = {
  and?: Maybe<Array<UserFilterInput>>;
  or?: Maybe<Array<UserFilterInput>>;
  userId?: Maybe<ComparableInt32OperationFilterInput>;
  discordId?: Maybe<ComparableInt64OperationFilterInput>;
  money?: Maybe<ComparableInt32OperationFilterInput>;
  isBanned?: Maybe<BooleanOperationFilterInput>;
  avatar?: Maybe<StringOperationFilterInput>;
  banner?: Maybe<StringOperationFilterInput>;
  status?: Maybe<StringOperationFilterInput>;
  description?: Maybe<StringOperationFilterInput>;
  views?: Maybe<ComparableInt32OperationFilterInput>;
  sex?: Maybe<ComparableInt32OperationFilterInput>;
  settings?: Maybe<ComparableInt64OperationFilterInput>;
  userRole?: Maybe<UserRoleEnumOperationFilterInput>;
  lastOnline?: Maybe<ComparableDateTimeOperationFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  updatedAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  permissions?: Maybe<ComparableInt64OperationFilterInput>;
  subscriptionEndAt?: Maybe<ComparableNullableOfDateTimeOperationFilterInput>;
  banreportEndAt?: Maybe<ComparableNullableOfDateTimeOperationFilterInput>;
  socialPoints?: Maybe<ComparableInt32OperationFilterInput>;
  billnotifications?: Maybe<ListFilterInputTypeOfBillnotificationFilterInput>;
  bills?: Maybe<ListFilterInputTypeOfBillFilterInput>;
  donatelogs?: Maybe<ListFilterInputTypeOfDonatelogFilterInput>;
  friendFriendNavigations?: Maybe<ListFilterInputTypeOfFriendFilterInput>;
  friendUsers?: Maybe<ListFilterInputTypeOfFriendFilterInput>;
  friendnotifications?: Maybe<ListFilterInputTypeOfFriendnotificationFilterInput>;
  posts?: Maybe<ListFilterInputTypeOfPostFilterInput>;
  ratingFroms?: Maybe<ListFilterInputTypeOfRatingFilterInput>;
  ratingTos?: Maybe<ListFilterInputTypeOfRatingFilterInput>;
  reportmessages?: Maybe<ListFilterInputTypeOfReportmessageFilterInput>;
  reportOwners?: Maybe<ListFilterInputTypeOfReportFilterInput>;
  reportTos?: Maybe<ListFilterInputTypeOfReportFilterInput>;
  subscriberSubscriberNavigations?: Maybe<ListFilterInputTypeOfSubscriberFilterInput>;
  subscriberUsers?: Maybe<ListFilterInputTypeOfSubscriberFilterInput>;
  subscribernotifications?: Maybe<ListFilterInputTypeOfSubscribernotificationFilterInput>;
  systemnotifications?: Maybe<ListFilterInputTypeOfSystemnotificationFilterInput>;
  nickname?: Maybe<StringOperationFilterInput>;
  tag?: Maybe<StringOperationFilterInput>;
  work?: Maybe<StringOperationFilterInput>;
  role?: Maybe<StringOperationFilterInput>;
  level?: Maybe<ComparableInt32OperationFilterInput>;
  phone?: Maybe<ComparableNullableOfInt32OperationFilterInput>;
  trefs?: Maybe<ComparableNullableOfInt32OperationFilterInput>;
  totalFriends?: Maybe<ComparableNullableOfInt32OperationFilterInput>;
  totalSubscribers?: Maybe<ComparableNullableOfInt32OperationFilterInput>;
  rating?: Maybe<UserRatingFilterInput>;
  discordRoles?: Maybe<ListFilterInputTypeOfUserDiscordRoleFilterInput>;
};

export type UserSortInput = {
  userId?: Maybe<SortEnumType>;
  discordId?: Maybe<SortEnumType>;
  money?: Maybe<SortEnumType>;
  isBanned?: Maybe<SortEnumType>;
  avatar?: Maybe<SortEnumType>;
  banner?: Maybe<SortEnumType>;
  status?: Maybe<SortEnumType>;
  description?: Maybe<SortEnumType>;
  views?: Maybe<SortEnumType>;
  sex?: Maybe<SortEnumType>;
  settings?: Maybe<SortEnumType>;
  userRole?: Maybe<SortEnumType>;
  lastOnline?: Maybe<SortEnumType>;
  createdAt?: Maybe<SortEnumType>;
  updatedAt?: Maybe<SortEnumType>;
  permissions?: Maybe<SortEnumType>;
  subscriptionEndAt?: Maybe<SortEnumType>;
  banreportEndAt?: Maybe<SortEnumType>;
  socialPoints?: Maybe<SortEnumType>;
  nickname?: Maybe<SortEnumType>;
  tag?: Maybe<SortEnumType>;
  work?: Maybe<SortEnumType>;
  role?: Maybe<SortEnumType>;
  level?: Maybe<SortEnumType>;
  phone?: Maybe<SortEnumType>;
  trefs?: Maybe<SortEnumType>;
  totalFriends?: Maybe<SortEnumType>;
  totalSubscribers?: Maybe<SortEnumType>;
  rating?: Maybe<UserRatingSortInput>;
};

export type DonateitemFilterInput = {
  and?: Maybe<Array<DonateitemFilterInput>>;
  or?: Maybe<Array<DonateitemFilterInput>>;
  donateitemId?: Maybe<ComparableInt32OperationFilterInput>;
  name?: Maybe<StringOperationFilterInput>;
  icon?: Maybe<ComparableNullableOfInt32OperationFilterInput>;
  cost?: Maybe<ComparableInt32OperationFilterInput>;
  amount?: Maybe<ComparableInt32OperationFilterInput>;
  isShow?: Maybe<BooleanOperationFilterInput>;
  type?: Maybe<ComparableInt32OperationFilterInput>;
  description?: Maybe<StringOperationFilterInput>;
  donatelogBoughtItems?: Maybe<ListFilterInputTypeOfDonatelogFilterInput>;
  donatelogLootItems?: Maybe<ListFilterInputTypeOfDonatelogFilterInput>;
  loottableCases?: Maybe<ListFilterInputTypeOfLoottableFilterInput>;
  loottableItems?: Maybe<ListFilterInputTypeOfLoottableFilterInput>;
};

export type DonateitemSortInput = {
  donateitemId?: Maybe<SortEnumType>;
  name?: Maybe<SortEnumType>;
  icon?: Maybe<SortEnumType>;
  cost?: Maybe<SortEnumType>;
  amount?: Maybe<SortEnumType>;
  isShow?: Maybe<SortEnumType>;
  type?: Maybe<SortEnumType>;
  description?: Maybe<SortEnumType>;
};

export type ReportFilterInput = {
  and?: Maybe<Array<ReportFilterInput>>;
  or?: Maybe<Array<ReportFilterInput>>;
  reportId?: Maybe<ComparableInt32OperationFilterInput>;
  type?: Maybe<ReportTypeOperationFilterInput>;
  subtype?: Maybe<ReportSubTypeOperationFilterInput>;
  ownerId?: Maybe<ComparableInt32OperationFilterInput>;
  toId?: Maybe<ComparableNullableOfInt32OperationFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  isClosed?: Maybe<BooleanOperationFilterInput>;
  lastMessage?: Maybe<ReportmessageFilterInput>;
  owner?: Maybe<UserFilterInput>;
  to?: Maybe<UserFilterInput>;
  reportmessages?: Maybe<ListFilterInputTypeOfReportmessageFilterInput>;
};

export type ReportSortInput = {
  reportId?: Maybe<SortEnumType>;
  type?: Maybe<SortEnumType>;
  subtype?: Maybe<SortEnumType>;
  ownerId?: Maybe<SortEnumType>;
  toId?: Maybe<SortEnumType>;
  createdAt?: Maybe<SortEnumType>;
  isClosed?: Maybe<SortEnumType>;
  lastMessage?: Maybe<ReportmessageSortInput>;
  owner?: Maybe<UserSortInput>;
  to?: Maybe<UserSortInput>;
};

export type ReportmessageFilterInput = {
  and?: Maybe<Array<ReportmessageFilterInput>>;
  or?: Maybe<Array<ReportmessageFilterInput>>;
  reportmessageId?: Maybe<ComparableInt32OperationFilterInput>;
  reportId?: Maybe<ComparableInt32OperationFilterInput>;
  ownerId?: Maybe<ComparableInt32OperationFilterInput>;
  message?: Maybe<StringOperationFilterInput>;
  replymessageId?: Maybe<ComparableNullableOfInt32OperationFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  owner?: Maybe<UserFilterInput>;
  replymessage?: Maybe<ReportmessageFilterInput>;
  report?: Maybe<ReportFilterInput>;
  inverseReplymessage?: Maybe<ListFilterInputTypeOfReportmessageFilterInput>;
};

export type ReportmessageSortInput = {
  reportmessageId?: Maybe<SortEnumType>;
  reportId?: Maybe<SortEnumType>;
  ownerId?: Maybe<SortEnumType>;
  message?: Maybe<SortEnumType>;
  replymessageId?: Maybe<SortEnumType>;
  createdAt?: Maybe<SortEnumType>;
  owner?: Maybe<UserSortInput>;
  replymessage?: Maybe<ReportmessageSortInput>;
  report?: Maybe<ReportSortInput>;
};

export type ForumFilterInput = {
  and?: Maybe<Array<ForumFilterInput>>;
  or?: Maybe<Array<ForumFilterInput>>;
  forumId?: Maybe<ComparableInt32OperationFilterInput>;
  parentForumId?: Maybe<ComparableNullableOfInt32OperationFilterInput>;
  name?: Maybe<StringOperationFilterInput>;
  link?: Maybe<StringOperationFilterInput>;
  isOpen?: Maybe<BooleanOperationFilterInput>;
  parentForum?: Maybe<ForumFilterInput>;
  inverseParentForum?: Maybe<ListFilterInputTypeOfForumFilterInput>;
  threads?: Maybe<ListFilterInputTypeOfThreadFilterInput>;
};

export type ForumSortInput = {
  forumId?: Maybe<SortEnumType>;
  parentForumId?: Maybe<SortEnumType>;
  name?: Maybe<SortEnumType>;
  link?: Maybe<SortEnumType>;
  isOpen?: Maybe<SortEnumType>;
  parentForum?: Maybe<ForumSortInput>;
};

export type ThreadFilterInput = {
  and?: Maybe<Array<ThreadFilterInput>>;
  or?: Maybe<Array<ThreadFilterInput>>;
  threadId?: Maybe<ComparableInt32OperationFilterInput>;
  forumId?: Maybe<ComparableInt32OperationFilterInput>;
  name?: Maybe<StringOperationFilterInput>;
  isPinned?: Maybe<BooleanOperationFilterInput>;
  canChat?: Maybe<BooleanOperationFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  forum?: Maybe<ForumFilterInput>;
  posts?: Maybe<ListFilterInputTypeOfPostFilterInput>;
  firstPost?: Maybe<PostFilterInput>;
  lastPost?: Maybe<PostFilterInput>;
};

export type ThreadSortInput = {
  threadId?: Maybe<SortEnumType>;
  forumId?: Maybe<SortEnumType>;
  name?: Maybe<SortEnumType>;
  isPinned?: Maybe<SortEnumType>;
  canChat?: Maybe<SortEnumType>;
  createdAt?: Maybe<SortEnumType>;
  forum?: Maybe<ForumSortInput>;
  firstPost?: Maybe<PostSortInput>;
  lastPost?: Maybe<PostSortInput>;
};

export type PostFilterInput = {
  and?: Maybe<Array<PostFilterInput>>;
  or?: Maybe<Array<PostFilterInput>>;
  postId?: Maybe<ComparableInt32OperationFilterInput>;
  threadId?: Maybe<ComparableInt32OperationFilterInput>;
  ownerId?: Maybe<ComparableInt32OperationFilterInput>;
  message?: Maybe<StringOperationFilterInput>;
  replyId?: Maybe<ComparableNullableOfInt32OperationFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  updatedAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  owner?: Maybe<UserFilterInput>;
  reply?: Maybe<PostFilterInput>;
  thread?: Maybe<ThreadFilterInput>;
  inverseReply?: Maybe<ListFilterInputTypeOfPostFilterInput>;
};

export type PostSortInput = {
  postId?: Maybe<SortEnumType>;
  threadId?: Maybe<SortEnumType>;
  ownerId?: Maybe<SortEnumType>;
  message?: Maybe<SortEnumType>;
  replyId?: Maybe<SortEnumType>;
  createdAt?: Maybe<SortEnumType>;
  updatedAt?: Maybe<SortEnumType>;
  owner?: Maybe<UserSortInput>;
  reply?: Maybe<PostSortInput>;
  thread?: Maybe<ThreadSortInput>;
};

/** A connection to a list of items. */
export type UsersConnection = {
  __typename?: "UsersConnection";
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<UsersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<User>>;
  totalCount: Scalars["Int"];
};

/** A connection to a list of items. */
export type DonateItemsConnection = {
  __typename?: "DonateItemsConnection";
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<DonateItemsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Donateitem>>;
  totalCount: Scalars["Int"];
};

/** A connection to a list of items. */
export type ReportsConnection = {
  __typename?: "ReportsConnection";
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<ReportsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Report>>;
  totalCount: Scalars["Int"];
};

/** A connection to a list of items. */
export type ReportMessagesConnection = {
  __typename?: "ReportMessagesConnection";
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<ReportMessagesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Reportmessage>>;
  totalCount: Scalars["Int"];
};

/** A connection to a list of items. */
export type ThreadsConnection = {
  __typename?: "ThreadsConnection";
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<ThreadsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Thread>>;
  totalCount: Scalars["Int"];
};

/** A connection to a list of items. */
export type PostsConnection = {
  __typename?: "PostsConnection";
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<PostsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Post>>;
  totalCount: Scalars["Int"];
};

export type ComparableInt32OperationFilterInput = {
  eq?: Maybe<Scalars["Int"]>;
  neq?: Maybe<Scalars["Int"]>;
  in?: Maybe<Array<Scalars["Int"]>>;
  nin?: Maybe<Array<Scalars["Int"]>>;
  gt?: Maybe<Scalars["Int"]>;
  ngt?: Maybe<Scalars["Int"]>;
  gte?: Maybe<Scalars["Int"]>;
  ngte?: Maybe<Scalars["Int"]>;
  lt?: Maybe<Scalars["Int"]>;
  nlt?: Maybe<Scalars["Int"]>;
  lte?: Maybe<Scalars["Int"]>;
  nlte?: Maybe<Scalars["Int"]>;
};

export type ComparableInt64OperationFilterInput = {
  eq?: Maybe<Scalars["Long"]>;
  neq?: Maybe<Scalars["Long"]>;
  in?: Maybe<Array<Scalars["Long"]>>;
  nin?: Maybe<Array<Scalars["Long"]>>;
  gt?: Maybe<Scalars["Long"]>;
  ngt?: Maybe<Scalars["Long"]>;
  gte?: Maybe<Scalars["Long"]>;
  ngte?: Maybe<Scalars["Long"]>;
  lt?: Maybe<Scalars["Long"]>;
  nlt?: Maybe<Scalars["Long"]>;
  lte?: Maybe<Scalars["Long"]>;
  nlte?: Maybe<Scalars["Long"]>;
};

export type BooleanOperationFilterInput = {
  eq?: Maybe<Scalars["Boolean"]>;
  neq?: Maybe<Scalars["Boolean"]>;
};

export type StringOperationFilterInput = {
  and?: Maybe<Array<StringOperationFilterInput>>;
  or?: Maybe<Array<StringOperationFilterInput>>;
  eq?: Maybe<Scalars["String"]>;
  neq?: Maybe<Scalars["String"]>;
  contains?: Maybe<Scalars["String"]>;
  ncontains?: Maybe<Scalars["String"]>;
  in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  nin?: Maybe<Array<Maybe<Scalars["String"]>>>;
  startsWith?: Maybe<Scalars["String"]>;
  nstartsWith?: Maybe<Scalars["String"]>;
  endsWith?: Maybe<Scalars["String"]>;
  nendsWith?: Maybe<Scalars["String"]>;
};

export type UserRoleEnumOperationFilterInput = {
  eq?: Maybe<UserRoleEnum>;
  neq?: Maybe<UserRoleEnum>;
  in?: Maybe<Array<UserRoleEnum>>;
  nin?: Maybe<Array<UserRoleEnum>>;
};

export type ComparableDateTimeOperationFilterInput = {
  eq?: Maybe<Scalars["DateTime"]>;
  neq?: Maybe<Scalars["DateTime"]>;
  in?: Maybe<Array<Scalars["DateTime"]>>;
  nin?: Maybe<Array<Scalars["DateTime"]>>;
  gt?: Maybe<Scalars["DateTime"]>;
  ngt?: Maybe<Scalars["DateTime"]>;
  gte?: Maybe<Scalars["DateTime"]>;
  ngte?: Maybe<Scalars["DateTime"]>;
  lt?: Maybe<Scalars["DateTime"]>;
  nlt?: Maybe<Scalars["DateTime"]>;
  lte?: Maybe<Scalars["DateTime"]>;
  nlte?: Maybe<Scalars["DateTime"]>;
};

export type ComparableNullableOfDateTimeOperationFilterInput = {
  eq?: Maybe<Scalars["DateTime"]>;
  neq?: Maybe<Scalars["DateTime"]>;
  in?: Maybe<Array<Maybe<Scalars["DateTime"]>>>;
  nin?: Maybe<Array<Maybe<Scalars["DateTime"]>>>;
  gt?: Maybe<Scalars["DateTime"]>;
  ngt?: Maybe<Scalars["DateTime"]>;
  gte?: Maybe<Scalars["DateTime"]>;
  ngte?: Maybe<Scalars["DateTime"]>;
  lt?: Maybe<Scalars["DateTime"]>;
  nlt?: Maybe<Scalars["DateTime"]>;
  lte?: Maybe<Scalars["DateTime"]>;
  nlte?: Maybe<Scalars["DateTime"]>;
};

export type ListFilterInputTypeOfBillnotificationFilterInput = {
  all?: Maybe<BillnotificationFilterInput>;
  none?: Maybe<BillnotificationFilterInput>;
  some?: Maybe<BillnotificationFilterInput>;
  any?: Maybe<Scalars["Boolean"]>;
};

export type ListFilterInputTypeOfBillFilterInput = {
  all?: Maybe<BillFilterInput>;
  none?: Maybe<BillFilterInput>;
  some?: Maybe<BillFilterInput>;
  any?: Maybe<Scalars["Boolean"]>;
};

export type ListFilterInputTypeOfDonatelogFilterInput = {
  all?: Maybe<DonatelogFilterInput>;
  none?: Maybe<DonatelogFilterInput>;
  some?: Maybe<DonatelogFilterInput>;
  any?: Maybe<Scalars["Boolean"]>;
};

export type ListFilterInputTypeOfFriendFilterInput = {
  all?: Maybe<FriendFilterInput>;
  none?: Maybe<FriendFilterInput>;
  some?: Maybe<FriendFilterInput>;
  any?: Maybe<Scalars["Boolean"]>;
};

export type ListFilterInputTypeOfFriendnotificationFilterInput = {
  all?: Maybe<FriendnotificationFilterInput>;
  none?: Maybe<FriendnotificationFilterInput>;
  some?: Maybe<FriendnotificationFilterInput>;
  any?: Maybe<Scalars["Boolean"]>;
};

export type ListFilterInputTypeOfPostFilterInput = {
  all?: Maybe<PostFilterInput>;
  none?: Maybe<PostFilterInput>;
  some?: Maybe<PostFilterInput>;
  any?: Maybe<Scalars["Boolean"]>;
};

export type ListFilterInputTypeOfRatingFilterInput = {
  all?: Maybe<RatingFilterInput>;
  none?: Maybe<RatingFilterInput>;
  some?: Maybe<RatingFilterInput>;
  any?: Maybe<Scalars["Boolean"]>;
};

export type ListFilterInputTypeOfReportmessageFilterInput = {
  all?: Maybe<ReportmessageFilterInput>;
  none?: Maybe<ReportmessageFilterInput>;
  some?: Maybe<ReportmessageFilterInput>;
  any?: Maybe<Scalars["Boolean"]>;
};

export type ListFilterInputTypeOfReportFilterInput = {
  all?: Maybe<ReportFilterInput>;
  none?: Maybe<ReportFilterInput>;
  some?: Maybe<ReportFilterInput>;
  any?: Maybe<Scalars["Boolean"]>;
};

export type ListFilterInputTypeOfSubscriberFilterInput = {
  all?: Maybe<SubscriberFilterInput>;
  none?: Maybe<SubscriberFilterInput>;
  some?: Maybe<SubscriberFilterInput>;
  any?: Maybe<Scalars["Boolean"]>;
};

export type ListFilterInputTypeOfSubscribernotificationFilterInput = {
  all?: Maybe<SubscribernotificationFilterInput>;
  none?: Maybe<SubscribernotificationFilterInput>;
  some?: Maybe<SubscribernotificationFilterInput>;
  any?: Maybe<Scalars["Boolean"]>;
};

export type ListFilterInputTypeOfSystemnotificationFilterInput = {
  all?: Maybe<SystemnotificationFilterInput>;
  none?: Maybe<SystemnotificationFilterInput>;
  some?: Maybe<SystemnotificationFilterInput>;
  any?: Maybe<Scalars["Boolean"]>;
};

export type ComparableNullableOfInt32OperationFilterInput = {
  eq?: Maybe<Scalars["Int"]>;
  neq?: Maybe<Scalars["Int"]>;
  in?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  nin?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  gt?: Maybe<Scalars["Int"]>;
  ngt?: Maybe<Scalars["Int"]>;
  gte?: Maybe<Scalars["Int"]>;
  ngte?: Maybe<Scalars["Int"]>;
  lt?: Maybe<Scalars["Int"]>;
  nlt?: Maybe<Scalars["Int"]>;
  lte?: Maybe<Scalars["Int"]>;
  nlte?: Maybe<Scalars["Int"]>;
};

export type UserRatingFilterInput = {
  and?: Maybe<Array<UserRatingFilterInput>>;
  or?: Maybe<Array<UserRatingFilterInput>>;
  total?: Maybe<ComparableInt32OperationFilterInput>;
  result?: Maybe<ComparableInt32OperationFilterInput>;
  positive?: Maybe<ComparableInt32OperationFilterInput>;
  negative?: Maybe<ComparableInt32OperationFilterInput>;
  your?: Maybe<ComparableInt32OperationFilterInput>;
};

export type ListFilterInputTypeOfUserDiscordRoleFilterInput = {
  all?: Maybe<UserDiscordRoleFilterInput>;
  none?: Maybe<UserDiscordRoleFilterInput>;
  some?: Maybe<UserDiscordRoleFilterInput>;
  any?: Maybe<Scalars["Boolean"]>;
};

export enum SortEnumType {
  Asc = "ASC",
  Desc = "DESC",
}

export type UserRatingSortInput = {
  total?: Maybe<SortEnumType>;
  result?: Maybe<SortEnumType>;
  positive?: Maybe<SortEnumType>;
  negative?: Maybe<SortEnumType>;
  your?: Maybe<SortEnumType>;
};

export type ListFilterInputTypeOfLoottableFilterInput = {
  all?: Maybe<LoottableFilterInput>;
  none?: Maybe<LoottableFilterInput>;
  some?: Maybe<LoottableFilterInput>;
  any?: Maybe<Scalars["Boolean"]>;
};

export type ReportTypeOperationFilterInput = {
  eq?: Maybe<ReportType>;
  neq?: Maybe<ReportType>;
  in?: Maybe<Array<ReportType>>;
  nin?: Maybe<Array<ReportType>>;
};

export type ReportSubTypeOperationFilterInput = {
  eq?: Maybe<ReportSubType>;
  neq?: Maybe<ReportSubType>;
  in?: Maybe<Array<ReportSubType>>;
  nin?: Maybe<Array<ReportSubType>>;
};

export type ListFilterInputTypeOfForumFilterInput = {
  all?: Maybe<ForumFilterInput>;
  none?: Maybe<ForumFilterInput>;
  some?: Maybe<ForumFilterInput>;
  any?: Maybe<Scalars["Boolean"]>;
};

export type ListFilterInputTypeOfThreadFilterInput = {
  all?: Maybe<ThreadFilterInput>;
  none?: Maybe<ThreadFilterInput>;
  some?: Maybe<ThreadFilterInput>;
  any?: Maybe<Scalars["Boolean"]>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: "PageInfo";
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars["Boolean"];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars["Boolean"];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars["String"]>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  work?: Maybe<Scalars["String"]>;
  role?: Maybe<Scalars["String"]>;
  level: Scalars["Int"];
  phone?: Maybe<Scalars["Int"]>;
  discordRoles: Array<UserDiscordRole>;
  totalFriends: Scalars["Int"];
  totalSubscribers: Scalars["Int"];
  bills: Array<Bill>;
  ratingTos: Array<Rating>;
  rating: UserRating;
  nickname: Scalars["String"];
  tag: Scalars["String"];
  avatar: Scalars["String"];
  userId: Scalars["Int"];
  discordId: Scalars["Long"];
  money: Scalars["Int"];
  isBanned: Scalars["Boolean"];
  banner?: Maybe<Scalars["MediaLink"]>;
  status: Scalars["String"];
  description: Scalars["String"];
  views: Scalars["Int"];
  sex: Scalars["Int"];
  settings: Scalars["Long"];
  userRole: UserRoleEnum;
  lastOnline: Scalars["DateTime"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  permissions: Scalars["Long"];
  subscriptionEndAt?: Maybe<Scalars["DateTime"]>;
  banreportEndAt?: Maybe<Scalars["DateTime"]>;
  socialPoints: Scalars["Int"];
  billnotifications: Array<Billnotification>;
  donatelogs: Array<Donatelog>;
  friendFriendNavigations: Array<Friend>;
  friendUsers: Array<Friend>;
  friendnotifications: Array<Friendnotification>;
  posts: Array<Post>;
  ratingFroms: Array<Rating>;
  reportmessages: Array<Reportmessage>;
  reportOwners: Array<Report>;
  reportTos: Array<Report>;
  subscriberSubscriberNavigations: Array<Subscriber>;
  subscriberUsers: Array<Subscriber>;
  subscribernotifications: Array<Subscribernotification>;
  systemnotifications: Array<Systemnotification>;
  trefs?: Maybe<Scalars["Int"]>;
};

/** An edge in a connection. */
export type UsersEdge = {
  __typename?: "UsersEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["String"];
  /** The item at the end of the edge. */
  node: User;
};

export type Donateitem = {
  __typename?: "Donateitem";
  donateitemId: Scalars["Int"];
  name: Scalars["String"];
  icon?: Maybe<Scalars["Int"]>;
  cost: Scalars["Int"];
  amount: Scalars["Int"];
  isShow: Scalars["Boolean"];
  type: Scalars["Int"];
  description: Scalars["String"];
  donatelogBoughtItems: Array<Donatelog>;
  donatelogLootItems: Array<Donatelog>;
  loottableCases: Array<Loottable>;
  loottableItems: Array<Loottable>;
};

/** An edge in a connection. */
export type DonateItemsEdge = {
  __typename?: "DonateItemsEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["String"];
  /** The item at the end of the edge. */
  node: Donateitem;
};

export type Report = {
  __typename?: "Report";
  lastMessage?: Maybe<Reportmessage>;
  reportId: Scalars["Int"];
  type: ReportType;
  subtype: ReportSubType;
  ownerId: Scalars["Int"];
  toId?: Maybe<Scalars["Int"]>;
  createdAt: Scalars["DateTime"];
  isClosed: Scalars["Boolean"];
  owner: User;
  to?: Maybe<User>;
  reportmessages: Array<Reportmessage>;
};

/** An edge in a connection. */
export type ReportsEdge = {
  __typename?: "ReportsEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["String"];
  /** The item at the end of the edge. */
  node: Report;
};

export type Reportmessage = {
  __typename?: "Reportmessage";
  owner: User;
  replymessage?: Maybe<Reportmessage>;
  reportmessageId: Scalars["Int"];
  reportId: Scalars["Int"];
  ownerId: Scalars["Int"];
  message: Scalars["String"];
  replymessageId?: Maybe<Scalars["Int"]>;
  createdAt: Scalars["DateTime"];
  report: Report;
  inverseReplymessage: Array<Reportmessage>;
};

/** An edge in a connection. */
export type ReportMessagesEdge = {
  __typename?: "ReportMessagesEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["String"];
  /** The item at the end of the edge. */
  node: Reportmessage;
};

export type Thread = {
  __typename?: "Thread";
  firstPost?: Maybe<Post>;
  lastPost?: Maybe<Post>;
  threadId: Scalars["Int"];
  forumId: Scalars["Int"];
  name: Scalars["String"];
  isPinned: Scalars["Boolean"];
  canChat?: Maybe<Scalars["Boolean"]>;
  createdAt: Scalars["DateTime"];
  forum: Forum;
  posts: Array<Post>;
};

/** An edge in a connection. */
export type ThreadsEdge = {
  __typename?: "ThreadsEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["String"];
  /** The item at the end of the edge. */
  node: Thread;
};

export type Post = {
  __typename?: "Post";
  owner?: Maybe<User>;
  reply?: Maybe<Post>;
  postId: Scalars["Int"];
  threadId: Scalars["Int"];
  ownerId: Scalars["Int"];
  message: Scalars["String"];
  replyId?: Maybe<Scalars["Int"]>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  thread: Thread;
  inverseReply: Array<Post>;
};

/** An edge in a connection. */
export type PostsEdge = {
  __typename?: "PostsEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["String"];
  /** The item at the end of the edge. */
  node: Post;
};

export type BillnotificationFilterInput = {
  and?: Maybe<Array<BillnotificationFilterInput>>;
  or?: Maybe<Array<BillnotificationFilterInput>>;
  billnotificationId?: Maybe<ComparableInt32OperationFilterInput>;
  toId?: Maybe<ComparableInt32OperationFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  billId?: Maybe<ComparableInt32OperationFilterInput>;
  bill?: Maybe<BillFilterInput>;
  to?: Maybe<UserFilterInput>;
};

export type BillFilterInput = {
  and?: Maybe<Array<BillFilterInput>>;
  or?: Maybe<Array<BillFilterInput>>;
  billId?: Maybe<ComparableInt32OperationFilterInput>;
  amount?: Maybe<ComparableInt32OperationFilterInput>;
  status?: Maybe<StringOperationFilterInput>;
  userId?: Maybe<ComparableInt32OperationFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  completedAt?: Maybe<ComparableNullableOfDateTimeOperationFilterInput>;
  user?: Maybe<UserFilterInput>;
  billnotifications?: Maybe<ListFilterInputTypeOfBillnotificationFilterInput>;
};

export type DonatelogFilterInput = {
  and?: Maybe<Array<DonatelogFilterInput>>;
  or?: Maybe<Array<DonatelogFilterInput>>;
  donatelogId?: Maybe<ComparableInt32OperationFilterInput>;
  boughtItemId?: Maybe<ComparableInt32OperationFilterInput>;
  lootItemId?: Maybe<ComparableNullableOfInt32OperationFilterInput>;
  userId?: Maybe<ComparableInt32OperationFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  amount?: Maybe<ComparableInt32OperationFilterInput>;
  boughtItem?: Maybe<DonateitemFilterInput>;
  lootItem?: Maybe<DonateitemFilterInput>;
  user?: Maybe<UserFilterInput>;
};

export type FriendFilterInput = {
  and?: Maybe<Array<FriendFilterInput>>;
  or?: Maybe<Array<FriendFilterInput>>;
  friendsId?: Maybe<ComparableInt32OperationFilterInput>;
  userId?: Maybe<ComparableInt32OperationFilterInput>;
  friendId?: Maybe<ComparableInt32OperationFilterInput>;
  friendNavigation?: Maybe<UserFilterInput>;
  user?: Maybe<UserFilterInput>;
  friendnotifications?: Maybe<ListFilterInputTypeOfFriendnotificationFilterInput>;
};

export type FriendnotificationFilterInput = {
  and?: Maybe<Array<FriendnotificationFilterInput>>;
  or?: Maybe<Array<FriendnotificationFilterInput>>;
  friendnotificationId?: Maybe<ComparableInt32OperationFilterInput>;
  toId?: Maybe<ComparableInt32OperationFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  friendRsId?: Maybe<ComparableInt32OperationFilterInput>;
  friendRs?: Maybe<FriendFilterInput>;
  to?: Maybe<UserFilterInput>;
};

export type RatingFilterInput = {
  and?: Maybe<Array<RatingFilterInput>>;
  or?: Maybe<Array<RatingFilterInput>>;
  ratingId?: Maybe<ComparableInt32OperationFilterInput>;
  fromId?: Maybe<ComparableInt32OperationFilterInput>;
  toId?: Maybe<ComparableInt32OperationFilterInput>;
  positive?: Maybe<BooleanOperationFilterInput>;
  from?: Maybe<UserFilterInput>;
  to?: Maybe<UserFilterInput>;
};

export type SubscriberFilterInput = {
  and?: Maybe<Array<SubscriberFilterInput>>;
  or?: Maybe<Array<SubscriberFilterInput>>;
  subscribersId?: Maybe<ComparableInt32OperationFilterInput>;
  userId?: Maybe<ComparableInt32OperationFilterInput>;
  subscriberId?: Maybe<ComparableInt32OperationFilterInput>;
  subscriberNavigation?: Maybe<UserFilterInput>;
  user?: Maybe<UserFilterInput>;
  subscribernotifications?: Maybe<ListFilterInputTypeOfSubscribernotificationFilterInput>;
};

export type SubscribernotificationFilterInput = {
  and?: Maybe<Array<SubscribernotificationFilterInput>>;
  or?: Maybe<Array<SubscribernotificationFilterInput>>;
  subscribernotificationId?: Maybe<ComparableInt32OperationFilterInput>;
  toId?: Maybe<ComparableInt32OperationFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  subscriberRsId?: Maybe<ComparableInt32OperationFilterInput>;
  subscriberRs?: Maybe<SubscriberFilterInput>;
  to?: Maybe<UserFilterInput>;
};

export type SystemnotificationFilterInput = {
  and?: Maybe<Array<SystemnotificationFilterInput>>;
  or?: Maybe<Array<SystemnotificationFilterInput>>;
  systemnotificationId?: Maybe<ComparableInt32OperationFilterInput>;
  toId?: Maybe<ComparableInt32OperationFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  message?: Maybe<StringOperationFilterInput>;
  to?: Maybe<UserFilterInput>;
};

export type UserDiscordRoleFilterInput = {
  and?: Maybe<Array<UserDiscordRoleFilterInput>>;
  or?: Maybe<Array<UserDiscordRoleFilterInput>>;
  id?: Maybe<ComparableInt64OperationFilterInput>;
  name?: Maybe<StringOperationFilterInput>;
  position?: Maybe<ComparableInt32OperationFilterInput>;
  color?: Maybe<StringOperationFilterInput>;
  hoist?: Maybe<BooleanOperationFilterInput>;
};

export type LoottableFilterInput = {
  and?: Maybe<Array<LoottableFilterInput>>;
  or?: Maybe<Array<LoottableFilterInput>>;
  loottableId?: Maybe<ComparableInt32OperationFilterInput>;
  caseId?: Maybe<ComparableInt32OperationFilterInput>;
  itemId?: Maybe<ComparableInt32OperationFilterInput>;
  weight?: Maybe<ComparableInt32OperationFilterInput>;
  case?: Maybe<DonateitemFilterInput>;
  item?: Maybe<DonateitemFilterInput>;
};

export type Bill = {
  __typename?: "Bill";
  billId: Scalars["Int"];
  amount: Scalars["Int"];
  status: Scalars["String"];
  userId: Scalars["Int"];
  createdAt: Scalars["DateTime"];
  completedAt?: Maybe<Scalars["DateTime"]>;
  user: User;
  billnotifications: Array<Billnotification>;
};

export enum OnlineTypes {
  Hour = "HOUR",
  Day = "DAY",
  Week = "WEEK",
  Month = "MONTH",
}

export type Online = {
  __typename?: "Online";
  max: Scalars["Int"];
  min: Scalars["Int"];
  avg: Scalars["Int"];
  time: Scalars["DateTime"];
};

export enum UserTopEnum {
  Views = "VIEWS",
  Rating = "RATING",
  Friends = "FRIENDS",
  Subscribers = "SUBSCRIBERS",
  Years = "YEARS",
  RatingN = "RATING_N",
  SocialPoints = "SOCIAL_POINTS",
  SocialPointsN = "SOCIAL_POINTS_N",
}

export type UserDiscordRole = {
  __typename?: "UserDiscordRole";
  id: Scalars["Long"];
  name: Scalars["String"];
  position: Scalars["Int"];
  color: Scalars["String"];
  hoist: Scalars["Boolean"];
};

export type UserStatus = {
  __typename?: "UserStatus";
  isFriends: Scalars["Boolean"];
  heIsSubscriber: Scalars["Boolean"];
  youIsSubscriber: Scalars["Boolean"];
};

export type Notification =
  | Billnotification
  | Friendnotification
  | Subscribernotification
  | Systemnotification;

export type Forum = {
  __typename?: "Forum";
  forumId: Scalars["Int"];
  parentForumId?: Maybe<Scalars["Int"]>;
  name: Scalars["String"];
  link?: Maybe<Scalars["String"]>;
  isOpen: Scalars["Boolean"];
  parentForum?: Maybe<Forum>;
  inverseParentForum: Array<Forum>;
  threads: Array<Thread>;
};

export type ForumCreateInput = {
  name: Scalars["String"];
  parentForumId: Scalars["Int"];
  link?: Maybe<Scalars["String"]>;
  isOpen: Scalars["Boolean"];
};

export type ForumEditInput = {
  id: Scalars["Int"];
  name?: Maybe<Scalars["String"]>;
  parentForumId?: Maybe<Scalars["Int"]>;
  link?: Maybe<Scalars["String"]>;
};

export enum UserRoleEnum {
  None = "NONE",
  SiteDeveloper = "SITE_DEVELOPER",
  Admin = "ADMIN",
  Moderator = "MODERATOR",
  JrModerator = "JR_MODERATOR",
}

export type ThreadCreateInput = {
  name: Scalars["String"];
  forumId: Scalars["Int"];
  isPinned: Scalars["Boolean"];
  canChat: Scalars["Boolean"];
  message: Scalars["String"];
};

export type ThreadEditInput = {
  id: Scalars["Int"];
  name?: Maybe<Scalars["String"]>;
  isPinned?: Maybe<Scalars["Boolean"]>;
  canChat?: Maybe<Scalars["Boolean"]>;
};

export type PostCreateInput = {
  threadId: Scalars["Int"];
  message: Scalars["String"];
  replyId?: Maybe<Scalars["Int"]>;
};

export type PostEditInput = {
  id: Scalars["Int"];
  message: Scalars["String"];
};

export type UserEditInput = {
  isBanned?: Maybe<Scalars["Boolean"]>;
  status?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  sex?: Maybe<Scalars["Int"]>;
  avatar?: Maybe<Scalars["MediaLink"]>;
  banner?: Maybe<Scalars["MediaLink"]>;
  isShowPhone?: Maybe<Scalars["Boolean"]>;
  isNotifyOnReport?: Maybe<Scalars["Boolean"]>;
  isNotifyOnReportMessage?: Maybe<Scalars["Boolean"]>;
  isNotifyOnNewSubscriber?: Maybe<Scalars["Boolean"]>;
  isNotifyOnNewFriend?: Maybe<Scalars["Boolean"]>;
  role?: Maybe<UserRoleEnum>;
  permissions?: Maybe<Scalars["Long"]>;
};

export enum ReportType {
  Report = "REPORT",
  Bug = "BUG",
  Feature = "FEATURE",
}

export type ReportCreateInput = {
  type: ReportType;
  subtype: ReportSubType;
  message: Scalars["String"];
  reportTo?: Maybe<Scalars["Int"]>;
};

export type ReportSendMessageInput = {
  reportId: Scalars["Int"];
  message: Scalars["String"];
  replyMessageId?: Maybe<Scalars["Int"]>;
};

export enum ReportSubType {
  Admin = "ADMIN",
  User = "USER",
  Server = "SERVER",
  Site = "SITE",
}

export type Rating = {
  __typename?: "Rating";
  from: User;
  ratingId: Scalars["Int"];
  fromId: Scalars["Int"];
  toId: Scalars["Int"];
  positive: Scalars["Boolean"];
  to: User;
};

export type UserRating = {
  __typename?: "UserRating";
  total: Scalars["Int"];
  result: Scalars["Int"];
  positive: Scalars["Int"];
  negative: Scalars["Int"];
  your: Scalars["Int"];
};

export type Billnotification = {
  __typename?: "Billnotification";
  bill: Bill;
  billnotificationId: Scalars["Int"];
  toId: Scalars["Int"];
  createdAt: Scalars["DateTime"];
  billId: Scalars["Int"];
  to: User;
};

export type Donatelog = {
  __typename?: "Donatelog";
  donatelogId: Scalars["Int"];
  boughtItemId: Scalars["Int"];
  lootItemId?: Maybe<Scalars["Int"]>;
  userId: Scalars["Int"];
  createdAt: Scalars["DateTime"];
  amount: Scalars["Int"];
  boughtItem: Donateitem;
  lootItem?: Maybe<Donateitem>;
  user: User;
};

export type Friend = {
  __typename?: "Friend";
  friendNavigation: User;
  friendsId: Scalars["Int"];
  userId: Scalars["Int"];
  friendId: Scalars["Int"];
  user: User;
  friendnotifications: Array<Friendnotification>;
};

export type Friendnotification = {
  __typename?: "Friendnotification";
  friendRs: Friend;
  friendnotificationId: Scalars["Int"];
  toId: Scalars["Int"];
  createdAt: Scalars["DateTime"];
  friendRsId: Scalars["Int"];
  to: User;
};

export type Subscriber = {
  __typename?: "Subscriber";
  subscriberNavigation: User;
  subscribersId: Scalars["Int"];
  userId: Scalars["Int"];
  subscriberId: Scalars["Int"];
  user: User;
  subscribernotifications: Array<Subscribernotification>;
};

export type Subscribernotification = {
  __typename?: "Subscribernotification";
  subscriberRs: Subscriber;
  subscribernotificationId: Scalars["Int"];
  toId: Scalars["Int"];
  createdAt: Scalars["DateTime"];
  subscriberRsId: Scalars["Int"];
  to: User;
};

export type Systemnotification = {
  __typename?: "Systemnotification";
  systemnotificationId: Scalars["Int"];
  toId: Scalars["Int"];
  createdAt: Scalars["DateTime"];
  message: Scalars["String"];
  to: User;
};

export type Loottable = {
  __typename?: "Loottable";
  loottableId: Scalars["Int"];
  caseId: Scalars["Int"];
  itemId: Scalars["Int"];
  weight: Scalars["Int"];
  case: Donateitem;
  item: Donateitem;
};
