import getGroupInfo from "@/lib/apis/group/index";
import { getUser } from "@/lib/apis/user";

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

  const userInfo = await getUser();

  if (!groupInfo) {
    return <p className="text-white">데이터 없음</p>;
  }

  const { name: teamName, taskLists, members } = groupInfo;

  const adminMemberName = members.find(
    (member) => member.role === "ADMIN",
  )?.userName;

  const isAdmin = adminMemberName === userInfo.nickname ? true : false;

  return (
    <div className="flex flex-col justify-center gap-[24px] pt-[24px]">
      <TeamName
        isAdmin={isAdmin}
        teamName={teamName}
        groupId={params.groupId}
      />
      <div className="flex flex-col gap-[64px]">
        <TaskLists isAdmin={isAdmin} taskLists={taskLists} />
        {isAdmin && <TaskReport taskLists={taskLists} />}
        <MemberList
          isAdmin={isAdmin}
          members={members}
          groupId={params.groupId}
        />
      </div>
    </div>
  );
}
