import { myFetch } from "../myFetch";
import {
  GetTeamIdGroupsIdInvitationResponse,
  GetTeamIdGroupsIdResponse,
} from "../type";

interface GetGroupInfoProps {
  groupId: string;
}

//NOTE - 그룹에 대한 정보
export async function getGroupInfo({ groupId }: GetGroupInfoProps) {
  try {
    const response = await myFetch<GetTeamIdGroupsIdResponse>(
    const response = await myFetch<GetTeamIdGroupsIdResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/groups/${groupId}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );
    return response;
    return response;
  } catch (error) {
    throw error;
  }
}

export default getGroupInfo;

interface getGroupInvitationProps {
  groupId: string;
}

//NOTE - 그룹 초대 링크
export async function getGroupInvitation({ groupId }: getGroupInvitationProps) {
  try {
    const response = await myFetch<GetTeamIdGroupsIdInvitationResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/groups/${groupId}/invitation`,
      {
        method: "GET",
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
}
