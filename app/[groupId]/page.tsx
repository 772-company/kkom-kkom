import getGroupInfo from "@/lib/apis/group";
import { getCookies } from "next-client-cookies/server";

import MemberList from "./_components/member-list";
import TaskLists from "./_components/task-lists";
import Team from "./_components/team";

export default async function TeamPage({
  params,
}: {
  params: { groupId: string };
}) {
  const cookies = getCookies();
  const accessToken = cookies.get("accessToken") ?? "";
  const groupInfo = await getGroupInfo({
    groupId: params.groupId,
    cookies: accessToken,
  });

  if (!groupInfo) {
    return <p className="text-white">데이터 없음</p>;
  }

  const { name: teamName, taskLists, members } = groupInfo;
  console.log(groupInfo);

  return (
    <div className="flex flex-col justify-center gap-[24px] pt-[24px]">
      <Team teamName={teamName} />
      <div className="flex flex-col gap-[64px]">
        <TaskLists taskLists={taskLists} />
        <MemberList members={members} />
      </div>
    </div>
  );
}
