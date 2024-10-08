import uploadImage from "../image";
import { ResponseError } from "../myFetch/clientFetch";
import instance from "../myFetch/instance";
import {
  DeleteGroupsIdMemberMemberUserIdResponse,
  GetGroupsIdInvitationResponse,
  GetGroupsIdResponse,
  PatchGroupsIdResponse,
  PostGroupsResponse,
} from "../type";

interface GetGroupInfoProps {
  groupId: string;
}

// NOTE - 그룹에 대한 정보
export async function getGroupInfo({ groupId }: GetGroupInfoProps) {
  const response = await instance<GetGroupsIdResponse>(`/groups/${groupId}`, {
    method: "GET",
    cache: "no-store",
    withCredentials: true,
  });
  return response;
}

interface GetGroupInvitationProps {
  groupId: string;
}

// NOTE - 그룹 초대 링크
export async function getGroupInvitation({ groupId }: GetGroupInvitationProps) {
  const response = await instance<GetGroupsIdInvitationResponse>(
    `/groups/${groupId}/invitation`,
    {
      method: "GET",
      withCredentials: true,
    },
  );
  return response;
}

interface PatchGroupNameProps {
  groupId: string;
  image?: File | string;
  name?: string;
}

// NOTE - 그룹 정보 수정
export async function patchGroupInfo({
  groupId,
  image,
  name,
}: PatchGroupNameProps) {
  let url;

  if (image instanceof File) {
    const imageResponse = await uploadImage(image);
    url = imageResponse.url;
  } else url = image;

  const response = await instance<PatchGroupsIdResponse>(`/groups/${groupId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image: url, name }),
    withCredentials: true,
  });
  return response;
}

interface DeleteGroupProps {
  groupId: string;
}

// NOTE - 그룹 삭제
export async function deleteGroup({ groupId }: DeleteGroupProps) {
  const response = await instance<PatchGroupsIdResponse>(`/groups/${groupId}`, {
    method: "DELETE",
    withCredentials: true,
  });
  return response;
}

interface PostGroupInvitationProps {
  userEmail: string;
  token: string;
}

// NOTE - 그룹 참여
export async function postGroupInvitation({
  userEmail,
  token,
}: PostGroupInvitationProps) {
  try {
    const response = await instance<GetGroupsIdInvitationResponse>(
      "/groups/accept-invitation",
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
    return null;
  }
}

interface DeleteTeamMemberProps {
  groupId: string;
  memberUserId: number;
}

// NOTE - 그룹 멤버 삭제
export async function deleteTeamMember({
  groupId,
  memberUserId,
}: DeleteTeamMemberProps) {
  try {
    const response = await instance<DeleteGroupsIdMemberMemberUserIdResponse>(
      `/groups/${groupId}/member/${memberUserId}`,
      {
        method: "DELETE",
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

interface PostGroupProps {
  image?: File;
  name: string;
}

// NOTE - 그룹 생성
export async function postGroup({ image, name }: PostGroupProps) {
  let url;

  if (image) {
    const imageResponse = await uploadImage(image);
    url = imageResponse.url;
  }

  const response = await instance<PostGroupsResponse>("/groups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    body: JSON.stringify({ image: url, name }),
  });
  return response;
}
