import { string } from "yup";

import { myFetch } from "../myFetch";
import { ResponseError } from "../myFetch/clientFetch";
import { PatchTeamIdGroupsGroupIdTaskListsIdResponse } from "../type";
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

interface PatchTaskListNameProps {
  groupId: string;
  taskListId: number;
  name: string;
}

//NOTE - 할 일 목록 명 수정
export async function patchTaskListName({
  groupId,
  taskListId,
  name,
}: PatchTaskListNameProps) {
  try {
    const response = await myFetch<PatchTeamIdGroupsGroupIdTaskListsIdResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/groups/${groupId}/task-lists/${taskListId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
        withCredentials: true,
      },
    );
    return response;
  } catch (error) {
    if (error instanceof ResponseError && error.response) {
      const response: { message: string } = await error.response?.json();
      if (response) {
        throw new Error(response.message);
      }
    } else {
      throw error;
    }
  }
}

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

interface DeleteTaskListProps {
  groupId: string;
  taskListId: number;
}

//NOTE - 할 일 목록 삭제
export async function deleteTaskList({
  groupId,
  taskListId,
}: DeleteTaskListProps) {
  try {
    const response = await myFetch<PatchTeamIdGroupsGroupIdTaskListsIdResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/groups/${groupId}/task-lists/${taskListId}`,
      {
        method: "DELETE",
        withCredentials: true,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
}

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
