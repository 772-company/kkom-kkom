import { GetTeamIdGroupsIdResponse } from "../type";

interface GetGroupInfoProps {
  teamId: string;
}

export async function getGroupInfo({
  teamId,
}: GetGroupInfoProps): Promise<GetTeamIdGroupsIdResponse> {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInRlYW1JZCI6IjYtNyIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzIyNTgzMzU4LCJleHAiOjE3MjI1ODY5NTgsImlzcyI6InNwLWNvd29ya2VycyJ9.n_HWS9MXVabCejm83HyRkBXdE71AOHQc_K9PteGr9Io";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/groups/${teamId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 추가
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      if (response.status === 401) {
        alert("해당 팀에 권한이 없습니다.");
      }
      throw new Error("다시 시도해 주세요.");
    }
    const result: GetTeamIdGroupsIdResponse = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw new Error("팀 정보를 받아오는 데에 실패하였습니다.");
  }
}

export default getGroupInfo;