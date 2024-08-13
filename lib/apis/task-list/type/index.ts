export interface GetTaskListResponse {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: {
    doneBy: {
      user: {
        image: string;
        nickname: string;
        id: number;
      };
    };
    writer: {
      image: string;
      nickname: string;
      id: number;
    };
    displayIndex: number;
    commentCount: number;
    deletedAt: string;
    recurringId: number;
    frequency: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
    updatedAt: string;
    doneAt: string;
    date: string;
    description: string;
    name: string;
    id: number;
  }[];
}
