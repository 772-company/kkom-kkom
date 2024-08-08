import { myFetch } from "../myFetch";
import { GetTeamIdGroupsIdResponse } from "../type";

interface GetGroupInfoProps {
  groupId: string;
}

export async function getGroupInfo({
  groupId,
}: GetGroupInfoProps): Promise<GetTeamIdGroupsIdResponse> {
  try {
    const response = await myFetch<GetTeamIdGroupsIdResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/groups/${groupId}`,
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
    throw new Error("팀 정보를 받아오는 데에 실패하였습니다.");
  }
}

export default getGroupInfo;
