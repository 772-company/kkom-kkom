"use client";

import { GetTeamIdGroupsIdResponse } from "@/lib/apis/type";
import { useEffect, useState } from "react";

import fetchData from "../../lib/apis/group";
import TaskLists from "./_components/task-lists";
import Team from "./_components/team";


export default function TeamPage({ params }: { params: { teamId: string } }) {
  const [teamName, setTeamName] = useState("");
  const [taskLists, setTaskLists] = useState<
    GetTeamIdGroupsIdResponse["taskLists"]
  >([]);

  useEffect(() => {
    const getTeamInfo = async () => {
      const teamInfo = await fetchData({ teamId: params.teamId });
      setTeamName(teamInfo.name);
      if (teamInfo && teamInfo.taskLists) {
        setTaskLists(teamInfo.taskLists);
      }
    };
    getTeamInfo();
  }, [params.teamId]);

  return (
    <div className="flex flex-col justify-center gap-[20px] pt-[100px]">
      <Team teamName={teamName} />
      <TaskLists taskLists={taskLists} />
    </div>
  );
}
