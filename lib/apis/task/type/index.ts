export type GetTasksResponse = {
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

export interface GetTaskResponse {
  doneBy: {
    user: {
      image: string;
      nickname: string;
      id: number;
    };
  };
  writer: {
    image: string | null;
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
}
