export interface getTaskListResponse {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: {
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
  }[];
}
