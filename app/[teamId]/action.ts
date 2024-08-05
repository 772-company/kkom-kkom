"use Server";

import getGroupInfo from "@/lib/apis/group";
import { GetTeamIdGroupsIdResponse } from "@/lib/apis/type";

export const fetchGroupInfo = async (
  teamId: string,
): Promise<GetTeamIdGroupsIdResponse | null> => {
  try {
    const groupInfo = await getGroupInfo({ teamId });
    return groupInfo;
  } catch (error) {
    console.error("Failed to fetch group Info:", error);
    return null;
  }
};
