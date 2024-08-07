export type getTasksResponse = [
  {
    displayIndex: number;
    commentCount: number;
    deletedAt: string;
    recurringId: number;
    frequency: string;
    userId: number;
    date: string;
    doneAt: string;
    updatedAt: string;
    name: string;
    id: number;
  },
];

export interface getTaskResponse {
  comments: [
    {
      user: {
        image: string;
        nickname: string;
        id: number;
      };
      userId: number;
      taskId: number;
      updatedAt: string;
      createdAt: string;
      content: string;
      id: number;
    },
  ];
  recurring: {
    groupId: number;
    taskListId: number;
    monthDay: number;
    weekDays: [number];
    frequencyType: string;
    startDate: string;
    updatedAt: string;
    createdAt: string;
    description: string;
    name: string;
    id: number;
  };
  user: {
    image: string;
    nickname: string;
    id: number;
  };
  displayIndex: number;
  userId: number;
  deletedAt: string;
  frequency: string;
  description: string;
  name: string;
  recurringId: number;
  doneAt: string;
  date: string;
  updatedAt: string;
  id: number;
}
