"use client";

import { GetTeamIdGroupsIdResponse } from "@/lib/apis/type";
import { useEffect, useState } from "react";

import fetchData from "../../lib/apis/group";
import MemberList from "./_components/members";
import TaskLists from "./_components/task-lists";
import Team from "./_components/team";

export default function TeamPage({ params }: { params: { teamId: string } }) {
  const [teamName, setTeamName] = useState("");
  const [taskLists, setTaskLists] = useState<
    GetTeamIdGroupsIdResponse["taskLists"]
  >([]);
  const [members, setMembers] = useState<GetTeamIdGroupsIdResponse["members"]>(
    [],
  );
  useEffect(() => {
    const getTeamInfo = async () => {
      const teamInfo = await fetchData({ teamId: params.teamId });
      if (teamInfo) {
        setTeamName(teamInfo.name);
        setTaskLists(teamInfo.taskLists);
        setMembers(teamInfo.members);
      }
    };
    getTeamInfo();
  }, [params.teamId]);

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
