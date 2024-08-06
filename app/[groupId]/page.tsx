import getGroupInfo from "@/lib/apis/group";

import MemberList from "./_components/member-list";
import TaskLists from "./_components/task-lists";
import Team from "./_components/team";
import { fetchGroupInfo } from "./fetch-group-info";

export default async function TeamPage({
  params,
}: {
  params: { groupId: string };
}) {
  const GROUP_INFO = await getGroupInfo({ groupId: params.groupId });

  if (!GROUP_INFO) {
    return <p className="text-white">데이터 없음</p>;
  }

  const { name: teamName, taskLists, members } = GROUP_INFO;
  console.log(GROUP_INFO);

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
