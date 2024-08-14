import { myFetch } from "../myFetch";
import { GetTaskListResponse } from "./type";

const URL = process.env.NEXT_PUBLIC_KKOM_KKOM_URL;

export const getTaskList = async (
  groupId: string,
  taskListId: number,
): Promise<GetTaskListResponse> => {
  try {
    const response = await myFetch<GetTaskListResponse>(
      `${URL}/groups/${groupId}/task-lists/${taskListId}`,
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

export const patchTaskList = async (
  groupId: string,
  taskListId: number,
  data: { name: string },
) => {
  try {
    const response = await myFetch(
      `${URL}/groups${groupId}/task-lists/${taskListId}`,
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

export const deleteTaskList = async (groupId: string, taskListId: number) => {
  try {
    const response = await myFetch(
      `${URL}/groups${groupId}/task-lists/${taskListId}`,
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

export const postTaskList = async (groupId: string, data: { name: string }) => {
  try {
    const response = await myFetch(`${URL}/groups${groupId}/task-lists`, {
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

export const pathChangeTaskListIndex = async (
  groupId: string,
  taskListId: number,
  data: { displayIndex: number },
) => {
  try {
    const response = await myFetch(
      `${URL}/groups${groupId}/tasl-lists/${taskListId}/order`,
      {
        method: "PATCH",
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
