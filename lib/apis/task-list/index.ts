import { myFetch } from "../myFetch";
import { GetTaskListResponse } from "./type";

const URL = process.env.NEXT_PUBLIC_KKOM_KKOM_URL;

export const getTaskList = async (
  groupId: number,
  id: number,
): Promise<GetTaskListResponse> => {
  try {
    const response = await myFetch<GetTaskListResponse>(
      `${URL}/groups/${groupId}/task-lists/${id}`,
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

// const patchTaskList = async (groupId: number, id: number, data: any) => {
//   try {
//     const response = await fetch(`${URL}/groups${groupId}/tasl-lists/${id}`, {
//       method: "PATCH",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// const deleteTaskList = async (groupId: number, id: number) => {
//   try {
//     const response = await fetch(`${URL}/groups${groupId}/tasl-lists/${id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// const postTaskList = async (groupId: number, data: any) => {
//   try {
//     const response = await fetch(`${URL}/groups${groupId}/tasl-lists`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// const pathChangeTaskListIndex = async (
//   groupId: number,
//   id: number,
//   data: any,
// ) => {
//   try {
//     const response = await fetch(
//       `${URL}/groups${groupId}/tasl-lists/${id}/order`,
//       {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       },
//     );
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
