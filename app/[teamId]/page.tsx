import MemberList from "./_components/member-list";
import TaskLists from "./_components/task-lists";
import Team from "./_components/team";
import { fetchGroupInfo } from "./action";

export default async function TeamPage({
  params,
}: {
  params: { teamId: string };
}) {
  const GROUP_INFO = await fetchGroupInfo(params.teamId);

  if (!GROUP_INFO) {
    return <p className="text-white">팀 정보가 존재하지 않습니다 ??</p>;
  }

  const { name: teamName, taskLists, members } = GROUP_INFO;

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
