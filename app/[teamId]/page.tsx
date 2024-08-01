"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import fetchData from "./_components/fetch-data";
import Team from "./_components/team";

export default function TeamPage() {
  const params = useParams();
  const { teamId } = params as { teamId: string };
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    const getTeamInfo = async () => {
      const teamInfo = await fetchData({ teamId });
      setTeamName(teamInfo.name);
    };
    getTeamInfo();
  }, [teamId]);

  return (
    <div className="flex h-full flex-col justify-center gap-[20px] bg-background-primary">
      <Team teamName={teamName} />
    </div>
  );
}
