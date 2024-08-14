import { myFetch } from "../myFetch";
import { ResponseError } from "../myFetch/clientFetch";
import {
  GetTeamIdGroupsIdInvitationResponse,
  GetTeamIdGroupsIdResponse,
  PatchTeamIdGroupsIdResponse,
} from "../type";

interface GetGroupInfoProps {
  groupId: string;
}

//NOTE - 그룹에 대한 정보
export async function getGroupInfo({ groupId }: GetGroupInfoProps) {
  try {
    const response = await myFetch<GetTeamIdGroupsIdResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/groups/${groupId}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export default getGroupInfo;

interface GetGroupInvitationProps {
  groupId: string;
}

//NOTE - 그룹 초대 링크
export async function getGroupInvitation({ groupId }: GetGroupInvitationProps) {
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

interface PatchGroupNameProps {
  groupId: string;
  image?: string;
  name?: string;
}

//NOTE - 그룹 정보 수정
export async function patchGroupInfo({
  groupId,
  image,
  name,
}: PatchGroupNameProps) {
  try {
    const response = await myFetch<PatchTeamIdGroupsIdResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/groups/${groupId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image, name }),
        withCredentials: true,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
}

interface DeleteGroupProps {
  groupId: string;
}

//NOTE - 그룹 삭제
export async function deleteGroup({ groupId }: DeleteGroupProps) {
  try {
    const response = await myFetch<PatchTeamIdGroupsIdResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/groups/${groupId}`,
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

interface PostGroupInvitationProps {
  userEmail: string;
  token: string;
}

//NOTE - 그룹 참여
export async function postGroupInvitation({
  userEmail,
  token,
}: PostGroupInvitationProps) {
  try {
    const response = await myFetch<GetTeamIdGroupsIdInvitationResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/groups/accept-invitation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify({ userEmail, token }),
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
