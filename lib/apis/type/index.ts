// Type: TypeScript file
// Desc: Type definition for API response
// Path: lib/apis/type/index.ts

export type GetTeamIdUserResponse = {
  groups: {
    role: string;
    userImage: string;
    userEmail: string;
    userName: string;
    groupId: number;
    userId: number;
  }[];
  teamId: string;
  image: string | null;
  nickname: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  id: number;
};

export type PatchTeamIdUserResponse = {
  message: string;
};

export type DeleteTeamIdUserResponse = {};

export type GetTeamIdUserHistoryResponse = {
  tasksDone: {
    userId: number;
    recurringId: number;
    frequency: string;
    date: string;
    doneAt: string;
    description: string;
    name: string;
    updatedAt: string;
    id: number;
  }[];
}[];

export type PostTeamIdUserSendResetPasswordEmailResponse = {
  message: string;
};

export type PatchTeamIdUserResetPasswordResponse = {
  message: string;
};

export type PatchTeamIdUserPasswordResponse = {
  message: string;
};

export type GetTeamIdGroupsGroupIdTaskListsIdResponse = {
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

export type PatchTeamIdGroupsGroupIdTaskListsIdResponse = {
  groupId: number;
  displayIndex: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
};

export type DeleteTeamIdGroupsGroupIdTaskListsIdResponse = {};

export type PostTeamIdGroupsGroupIdTaskListsResponse = {
  groupId: number;
  displayIndex: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
};

export type PatchTeamIdGroupsGroupIdTaskListsIdOrderResponse = {};

export type PostTeamIdGroupsGroupIdTaskListsTaskListIdTasksResponse = {
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

export type GetTeamIdGroupsGroupIdTaskListsTaskListIdTasksResponse = {
  recurringId: number;
  frequency: string;
  userId: number;
  date: string;
  doneAt: string;
  updatedAt: string;
  name: string;
  id: number;
}[];

export type PatchTeamIdGroupsGroupIdTaskListsTaskListIdTasksTaskIdResponse = {
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

export type DeleteTeamIdGroupsGroupIdTaskListsTaskListIdTasksTaskIdResponse =
  {};

export type DeleteTeamIdGroupsGroupIdTaskListsTaskListIdTasksTaskIdAllResponse =
  {};

export type PostTeamIdOauthApps = {
  createdAt: string;
  updatedAt: string;
  appSecret: string;
  appKey: string;
  provider: string;
  teamId: string;
  id: number;
};

export type PostTeamIdImagesUploadResponse = {
  url: string;
};

export type GetTeamIdGroupsIdResponse = {
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
    tasks: {
      id: number;
      name: string;
      date: string;
      doneAt: string | null;
      updatedAt: string;
      userId: number | null;
      recurringId: number;
      deletedAt: string | null;
      frequency: string;
    }[];
  }[];
};

export type PatchTeamIdGroupsIdResponse = {
  updatedAt: string;
  createdAt: string;
  image: string | null;
  name: string;
  id: number;
};

export type DeleteTeamIdGroupsIdResponse = {};

export type PostTeamIdGroupsResponse = {
  updatedAt: string;
  createdAt: string;
  image: string | null;
  name: string;
  id: number;
};

export type GetTeamIdGroupsIdMemberMemberUserIdResponse = {
  role: string;
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
};

// TODO: Fix the type 기획서가 제대로 정의되지 않았습니다.
export type GetTeamIdGroupsIdInvitationResponse = {
  token: string;
};

export type PostTeamIdGroupsAcceptInvitationResponse = {
  userId: number;
  token: string;
};

export type PostTeamIdGroupsIdMemberResponse = {};

export type GetTeamIdGroupsIdTasksResponse = {
  recurringId: number;
  frequency: string;
  userId: number;
  date: string;
  doneAt: string;
  updatedAt: string;
  name: string;
  id: number;
}[];

export type GetTeamIdTasksTaskIdCommentsResponse = {
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

export type PostTeamIdTasksTaskIdCommentsResponse = {
  userId: number;
  taskId: number;
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
};

export type PatchTeamIdTasksTaskIdCommentsCommentIdResponse = {
  content: string;
};

export type DeleteTeamIdTasksTaskIdCommentsCommentIdResponse = {};

export type PostTeamIdAuthSignupResponse = {
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

export type PostTeamIdAuthSigninResponse = {
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

export type PostTeamIdAuthRefreshTokenResponse = {
  accessToken: string;
};

export type PostTeamIdAuthSignInProviderResponse = {
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
