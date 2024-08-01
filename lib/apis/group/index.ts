import { GetTeamIdGroupsIdResponse } from "../type";

interface FetchDataProps {
  teamId: string;
}

const fetchData = async ({ teamId }: FetchDataProps) => {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInRlYW1JZCI6IjYtNyIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzIyNDk5NTg2LCJleHAiOjE3MjI1MDMxODYsImlzcyI6InNwLWNvd29ya2VycyJ9.kHENC17oc-chAtBJkUbRwUGMqgb0GwvH6D_XPtViejg";

  try {
    const response = await fetch(
      `https://fe-project-cowokers.vercel.app/6-7/groups/${teamId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 추가
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: GetTeamIdGroupsIdResponse = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export default fetchData;
