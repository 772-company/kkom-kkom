import { myFetch } from "../myFetch";

const URL = process.env.NEXT_PUBLIC_KKOM_KKOM_URL;
const postComment = async (taskId: number, data: { content: string }) => {
  try {
    await myFetch(`${URL}/tasks/${taskId}/comments`, {
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
