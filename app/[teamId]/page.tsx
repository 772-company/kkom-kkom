"use client";

import { useParams } from "next/navigation";

export default function TeamPage() {
  const params = useParams();
  const { teamId } = params;

  return (
    <>
      <h1>{teamId}팀 페이지입니당~</h1>
    </>
  );
}
