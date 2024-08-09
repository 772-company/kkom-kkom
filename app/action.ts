import { myFetch } from "@/lib/apis/myFetch";
import { GetTeamIdUserResponse } from "@/lib/apis/type";

export async function getUser(): Promise<GetTeamIdUserResponse> {
  try {
    const response = await myFetch<GetTeamIdUserResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/user`,
      {
        method: "GET",
        withCredentials: true,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
}
