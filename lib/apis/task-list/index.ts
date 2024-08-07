import { getCookie } from "cookies-next";

import { getTaskListResponse } from "./type";

const accessToken = getCookie("accessToken");
const URL = process.env.NEXT_PUBLIC_KKOM_KKOM_URL;

const getTaskList = async (
  groupId: number,
  id: number,
  date?: Date,
): Promise<getTaskListResponse> => {
  try {
    const response = await fetch(`${URL}/groups${groupId}/${id}?date=${date}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: getTaskListResponse = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const patchTaskList = async (groupId: number, id: number, data: any) => {
  try {
    const response = await fetch(`${URL}/groups${groupId}/tasl-lists/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteTaskList = async (groupId: number, id: number) => {
  try {
    const response = await fetch(`${URL}/groups${groupId}/tasl-lists/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const postTaskList = async (groupId: number, data: any) => {
  try {
    const response = await fetch(`${URL}/groups${groupId}/tasl-lists`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const pathChangeTaskListIndex = async (
  groupId: number,
  id: number,
  data: any,
) => {
  try {
    const response = await fetch(
      `${URL}/groups${groupId}/tasl-lists/${id}/order`,
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
