import { getGroupInfo } from "@/lib/apis/group/index";
import { getUser } from "@/lib/apis/user";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import MemberList from "./_components/member-list";
import TaskLists from "./_components/task-lists";
import TaskReport from "./_components/task-report";
import TeamName from "./_components/team-name";

export default async function TeamPage({
  params,
}: {
  params: { groupId: string };
}) {
  const { groupId } = params;

  const queryClient = new QueryClient();

  const [groupInfo, userInfo] = await Promise.all([
    getGroupInfo({ groupId }),
    getUser(),
  ]);

  await queryClient.prefetchQuery({
    queryKey: ["groupInfo", groupId],
    queryFn: () => groupInfo,
  });

  const adminMemberName = groupInfo.members.find(
    (member) => member.role === "ADMIN",
  )?.userName;

  const isAdmin = adminMemberName === userInfo.nickname;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col justify-center gap-[24px] py-[24px]">
        <TeamName groupId={params.groupId} isAdmin={isAdmin} />
        <div className="flex flex-col gap-[64px]">
          <TaskLists groupId={params.groupId} isAdmin={isAdmin} />
          {isAdmin && <TaskReport groupId={params.groupId} />}
          <MemberList groupId={params.groupId} isAdmin={isAdmin} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
