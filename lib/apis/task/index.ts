import { myConvertDateToYMD } from "@/utils/convert-date";
import { getCookie } from "cookies-next";

import { myFetch } from "../myFetch";
import { GetTaskResponse, GetTasksResponse } from "./type";

const accessToken = getCookie("accessToken");
const URL = process.env.NEXT_PUBLIC_KKOM_KKOM_URL;

const postTask = async (groupId: number, taskListId: number, data: any) => {
  try {
    const response = await fetch(
      `${URL}/groups${groupId}/task-lists/${taskListId}/tasks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTasks = async (
  groupId: string,
  taskListId: number | undefined,
  date: Date,
): Promise<GetTasksResponse> => {
  const convertedDateToYMD = myConvertDateToYMD(date);
  try {
    const response = await myFetch<GetTasksResponse>(
      `${URL}/groups/${groupId}/task-lists/${taskListId}/tasks?date=${convertedDateToYMD}`,
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

const patchTaskOrder = async (
  groupId: number,
  taskListId: number,
  taskId: number,
  data: any,
) => {
  try {
    const response = await fetch(
      `${URL}/groups${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const deleteTask = async (
  groupId: number,
  taskListId: number,
  taskId: number,
) => {
  try {
    const response = await fetch(
      `${URL}/groups${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const patchTask = async (
  groupId: number,
  taskListId: number,
  taskId: number,
  data: any,
) => {
  try {
    const response = await fetch(
      `${URL}/groups${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const dleteTaskRecurring = async (
  groupId: number,
  taskListId: number,
  taskId: number,
  recurringId: number,
) => {
  try {
    const response = await fetch(
      `${URL}/groups${groupId}/task-lists/${taskListId}/tasks/${taskId}/recurring/${recurringId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
