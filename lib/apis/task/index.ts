import { myFetch } from "../myFetch";
import { GetTaskResponse, GetTasksResponse } from "./type";

const URL = process.env.NEXT_PUBLIC_KKOM_KKOM_URL;

export const postTask = async (
  groupId: string,
  taskListId: number,
  data: {
    name: string;
    description: string;
    startDate?: string;
    frequencyType: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
    monthDay?: number;
    weekDays?: number[];
  },
) => {
  try {
    await myFetch(`${URL}/groups/${groupId}/task-lists/${taskListId}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTasks = async (
  groupId: string,
  taskListId: number | undefined,
  date?: Date,
): Promise<GetTasksResponse> => {
  try {
    const response = await myFetch<GetTasksResponse>(
      `${URL}/groups/${groupId}/task-lists/${taskListId}/tasks?date=${date}`,
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

export const getTask = async (
  groupId: string,
  taskListId: number | undefined,
  taskId: number | undefined,
): Promise<GetTaskResponse> => {
  try {
    const response = await myFetch<GetTaskResponse>(
      `${URL}/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
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

export const patchTaskOrder = async (
  groupId: string,
  taskListId: number,
  taskId: number,
  data: { displayIndex: number },
) => {
  try {
    await myFetch(
      `${URL}/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/order`,
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

export const deleteTask = async (
  groupId: string,
  taskListId: number,
  taskId: number,
) => {
  try {
    await myFetch(
      `${URL}/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
      {
        method: "DELETE",

        withCredentials: true,
      },
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const patchTask = async (
  groupId: string,
  taskListId: number | undefined,
  taskId: number,
  data: { name?: string; description?: string; done?: boolean },
) => {
  try {
    await myFetch(
      `${URL}/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
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
export const deleteTaskRecurring = async (
  groupId: string,
  taskListId: number,
  taskId: number,
  recurringId: number,
) => {
  try {
    await myFetch(
      `${URL}/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/recurring/${recurringId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
