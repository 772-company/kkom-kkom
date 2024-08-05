import getGroupInfo from "@/lib/apis/group";
import { GetTeamIdGroupsIdResponse } from "@/lib/apis/type";

export const fetchGroupInfo = async (
  groupId: string,
): Promise<GetTeamIdGroupsIdResponse | null> => {
  try {
    const groupInfo = await getGroupInfo({ groupId });
    return groupInfo;
  } catch (error) {
    console.error("Failed to fetch group Info:", error);
    return null;
  }
};
