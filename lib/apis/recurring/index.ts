import { myFetch } from "../myFetch";

const URL = process.env.NEXT_PUBLIC_KKOM_KKOM_URL;

export const postRecurring = async (
  groupId: string,
  taskListId: number,
  data: {
    name: string;
    description: string;
    startDate: Date;
    frequencyType: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
    monthDay: number;
  },
) => {
  try {
    const response = await myFetch(
      `${URL}/groups/${groupId}/task-lists/${taskListId}/recurring`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        withCredentials: true,
      },
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
