import { ResponseError } from "../myFetch/clientFetch";
import instance from "../myFetch/instance";
import { PatchGroupsGroupIdTaskListsIdResponse } from "../type";
import { GetTaskListResponse } from "./type";

export const getTaskList = async (
  groupId: string,
  taskListId: number,
): Promise<GetTaskListResponse> => {
  const response = await instance<GetTaskListResponse>(
    `/groups/${groupId}/task-lists/${taskListId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    },
  );

  return response;
};

interface PatchTaskListNameProps {
  groupId: string;
  taskListId: number;
  name: string;
}

// NOTE - 할 일 목록 명 수정
export async function patchTaskListName({
  groupId,
  taskListId,
  name,
}: PatchTaskListNameProps) {
  try {
    const response = await instance<PatchGroupsGroupIdTaskListsIdResponse>(
      `/groups/${groupId}/task-lists/${taskListId}`,
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
    return null;
  }
}

export const patchTaskList = async (
  groupId: string,
  taskListId: number,
  data: { name: string },
) => {
  try {
    await instance(`/groups${groupId}/task-lists/${taskListId}`, {
      method: "PATCH",
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

interface DeleteTaskListProps {
  groupId: string;
  taskListId: number;
}

// NOTE - 할 일 목록 삭제
export async function deleteTaskList({
  groupId,
  taskListId,
}: DeleteTaskListProps) {
  const response = await instance<PatchGroupsGroupIdTaskListsIdResponse>(
    `/groups/${groupId}/task-lists/${taskListId}`,
    {
      method: "DELETE",
      withCredentials: true,
    },
  );
  return response;
}

export const postTaskList = async (groupId: string, data: { name: string }) => {
  try {
    await instance(`/groups/${groupId}/task-lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      body: JSON.stringify(data),
    });
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
};

// NOTE - 할 일 목록 순서 변경
export const patchChangeTaskListIndex = async (
  groupId: string,
  taskListId: number,
  data: { displayIndex: number },
) => {
  try {
    await instance(`/groups/${groupId}/task-lists/${taskListId}/order`, {
      method: "PATCH",
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
