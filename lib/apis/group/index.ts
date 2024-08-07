import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

import { GetTeamIdGroupsIdResponse } from "../type";

interface GetGroupInfoProps {
  groupId: string;
}

export async function getGroupInfo({
  groupId,
}: GetGroupInfoProps): Promise<GetTeamIdGroupsIdResponse> {
  const accessToken = getCookie("accessToken", { cookies });
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/groups/${groupId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );
    if (!response.ok) {
      if (response.status === 401) {
        alert("해당 팀에 권한이 없습니다.");
      } else if (response.status === 404) {
        alert("존재하지 않는 팀입니다.");
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
