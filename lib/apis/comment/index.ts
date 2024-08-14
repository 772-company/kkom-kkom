import { myFetch } from "../myFetch";
import { GetCommentResponse } from "./type";

const URL = process.env.NEXT_PUBLIC_KKOM_KKOM_URL;
export const getComment = async (taskId: number) => {
  try {
    const response = await myFetch<GetCommentResponse>(
      `${URL}/tasks/${taskId}/comments`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postComment = async (
  taskId: number | undefined,
  data: { content: string },
) => {
  try {
    const response = await myFetch(`${URL}/tasks/${taskId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const patchComment = async (
  taskId: number,
  commentId: number,
  data: { content: string },
) => {
  try {
    const response = await myFetch(
      `${URL}/tasks/${taskId}/comments/${commentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify(data),
      },
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteComment = async (taskId: number, commentId: number) => {
  try {
    await myFetch(`${URL}/tasks/${taskId}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
