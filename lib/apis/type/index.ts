// Type: TypeScript file
// Desc: Type definition for API response
// Path: lib/apis/type/index.ts

export type Group = {
  id: number;
  teamId: string | null;
  name: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Membership = {
  userId: number;
  groupId: number;
  userName: string;
  userEmail: string;
  userImage: string | null;
  role: "ADMIN" | "MEMBER";
  group: Group;
};

export type GetUserResponse = {
  teamId: string;
  image: string | null;
  nickname: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  id: number;
  memberships: Membership[];
};

export type PatchUserResponse = {
  message: string;
};

export type DeleteUserResponse = {};

export type GetUserGroups = {
  id: number;
  teamId: string | null;
  name: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}[];

export type GetUserHistoryResponse = {
  tasksDone: {
    userId: number;
    deletedAt: string;
    recurringId: number;
    frequency: string;
    date: string;
    doneAt: string;
    description: string;
    name: string;
    updatedAt: string;
    id: number;
  }[];
};

export type PostUserSendResetPasswordEmailResponse = {
  message: string;
};

export type PatchUserResetPasswordResponse = {
  message: string;
};

export type PatchUserPasswordResponse = {
  message: string;
};

export type GetGroupsGroupIdTaskListsIdResponse = {
  groupId: number;
  displayIndex: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: {
    recurringId: number;
    frequency: string;
    userId: number;
    date: string;
    doneAt: string;
    updatedAt: string;
    name: string;
    id: number;
  }[];
};

export type PatchGroupsGroupIdTaskListsIdResponse = {
  groupId: number;
  displayIndex: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
};

export type DeleteGroupsGroupIdTaskListsIdResponse = {};

export type PostGroupsGroupIdTaskListsResponse = {
  groupId: number;
  displayIndex: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
};

export type PatchGroupsGroupIdTaskListsIdOrderResponse = {};

export type PostGroupsGroupIdTaskListsTaskListIdTasksResponse = {
  groupId: number;
  taskListId: number;
  monthDay: number;
  weekDays: number[];
  frequencyType: string;
  displayIndex: number;
  updatedAt: string;
  createdAt: string;
  description: string;
  name: string;
  id: number;
};

export type GetGroupsGroupIdTaskListsTaskListIdTasksResponse = {
  recurringId: number;
  frequency: string;
  userId: number;
  date: string;
  doneAt: string;
  updatedAt: string;
  name: string;
  id: number;
}[];

export type PatchGroupsGroupIdTaskListsTaskListIdTasksTaskIdResponse = {
  userId: number;
  recurringId: number;
  frequency: string;
  date: string;
  doneAt: string;
  description: string;
  name: string;
  updatedAt: string;
  id: number;
};

export type DeleteGroupsGroupIdTaskListsTaskListIdTasksTaskIdResponse = {};

export type DeleteGroupsGroupIdTaskListsTaskListIdTasksTaskIdAllResponse = {};

export type PostOauthApps = {
  createdAt: string;
  updatedAt: string;
  appSecret: string;
  appKey: string;
  provider: string;
  teamId: string;
  id: number;
};

export type PostImagesUploadResponse = {
  url: string;
};

export type Tasks = {
  id: number;
  name: string;
  date: string;
  doneAt: string | null;
  updatedAt: string;
  userId: number | null;
  recurringId: number;
  deletedAt: string | null;
  frequency: string;
};

export type GetGroupsIdResponse = {
  updatedAt: string;
  createdAt: string;
  image: string | null;
  name: string;
  id: number;
  members: {
    role: string;
    userImage: string;
    userEmail: string;
    userName: string;
    groupId: number;
    userId: number;
  }[];
  taskLists: {
    groupId: number;
    displayIndex: number;
    updatedAt: string;
    createdAt: string;
    name: string;
    id: number;
    tasks: Tasks[];
  }[];
};

export type PatchGroupsIdResponse = {
  updatedAt: string;
  createdAt: string;
  image: string | null;
  name: string;
  id: number;
};

export type DeleteGroupsIdResponse = {};

export type PostGroupsResponse = {
  updatedAt: string;
  createdAt: string;
  image: string | null;
  name: string;
  id: number;
};

export type GetGroupsIdMemberMemberUserIdResponse = {
  role: string;
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
};

export type DeleteGroupsIdMemberMemberUserIdResponse = {};

export type GetGroupsIdInvitationResponse = string;

export type PostGroupsAcceptInvitationResponse = {
  userId: number;
  token: string;
};

export type PostGroupsIdMemberResponse = {};

export type GetGroupsIdTasksResponse = {
  recurringId: number;
  frequency: string;
  userId: number;
  date: string;
  doneAt: string;
  updatedAt: string;
  name: string;
  id: number;
}[];

export type GetTasksTaskIdCommentsResponse = {
  user: {
    teamId: string;
    image: string | null;
    nickname: string;
    updatedAt: string;
    createdAt: string;
    encryptedPassword: string;
    email: string;
    id: string;
  };
  userId: number;
  taskId: number;
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}[];

export type PostTasksTaskIdCommentsResponse = {
  userId: number;
  taskId: number;
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
};

export type PatchTasksTaskIdCommentsCommentIdResponse = {
  content: string;
};

export type DeleteTasksTaskIdCommentsCommentIdResponse = {};

export type PostAuthSignupResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    updatedAt: string;
    createdAt: string;
    image: string | null;
    teamId: string;
  };
};

export type PostAuthSigninResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    updatedAt: string;
    createdAt: string;
    image: string | null;
    teamId: string;
  };
};

export type PostAuthRefreshTokenResponse = {
  accessToken: string;
};

export type PostAuthSignInProviderResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    updatedAt: string;
    createdAt: string;
    image: string | null;
    teamId: string;
  };
};

export interface GetGoogleTokenResponse {
  access_token: string;
  id_token: string;
  token_type: string;
  expires_in: number;
}

export interface PostArticlesArticleIdCommentsResponse {
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

export interface GetArticlesArticleIdCommentsResponse {
  nextCursor: number | null;
  list: {
    writer: {
      image: string | null;
      nickname: string;
      id: number;
    };
    updatedAt: string;
    createdAt: string;
    content: string;
    id: number;
  }[];
}

export interface PatchCommentsCommentIdResponse {
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

export interface DeleteCommentsCommentIdResponse {
  id: number;
}

export interface PostArticlesResponse {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: {
    nickname: string;
    id: number;
  };
  image: string;
  title: string;
  id: number;
}

export interface GetArticlesResponse {
  totalCount: number;
  list: {
    updatedAt: string;
    createdAt: string;
    likeCount: number;
    commentCount: number;
    writer: {
      nickname: string;
      id: number;
    };
    image: string;
    title: string;
    id: number;
  }[];
}

export interface GetArticlesArticleIdResponse {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: {
    nickname: string;
    id: number;
  };
  image: string;
  title: string;
  id: number;
  isLiked: boolean;
  content: string;
  commentCount: number;
}

export interface PatchArticlesArticleIdResponse {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: {
    nickname: string;
    id: number;
  };
  image: string;
  title: string;
  id: number;
  isLiked: boolean;
  content: string;
}

export interface DeleteArticlesArticleIdResponse {
  id: number;
}

export interface PostArticlesArticleIdLikeResponse {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: {
    nickname: string;
    id: number;
  };
  image: string;
  title: string;
  id: number;
  isLiked: boolean;
  content: string;
}

export interface DeleteArticlesArticleIdLikeResponse {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: {
    nickname: string;
    id: number;
  };
  image: string;
  title: string;
  id: number;
  isLiked: boolean;
  content: string;
}
