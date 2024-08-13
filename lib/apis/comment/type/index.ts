export interface GetCommentResponse {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  taskId: number;
  userId: number;
  user: {
    id: number;
    nickname: string;
    image: string | null;
  };
}
