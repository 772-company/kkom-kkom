import getGroupInfo from "@/lib/apis/group";

import MemberList from "./_components/member-list";
import TaskLists from "./_components/task-lists";
import TaskReport from "./_components/task-report";
import TeamName from "./_components/team-name";

export default async function TeamPage({
  params,
}: {
  params: { groupId: string };
}) {
  const groupInfo = await getGroupInfo({
    groupId: params.groupId,
  });

  if (!groupInfo) {
    return <p className="text-white">데이터 없음</p>;
  }

  const { name: teamName, taskLists, members } = groupInfo;
  console.log(groupInfo);

  return (
    <div className="flex flex-col justify-center gap-[24px] pt-[24px]">
      <TeamName teamName={teamName} />
      <div className="flex flex-col gap-[64px]">
        <TaskLists taskLists={taskLists} />
        <TaskReport taskLists={taskLists} />
        <MemberList members={members} />
      </div>
    </div>
  );
}
