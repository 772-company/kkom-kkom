"use client";

import Button from "@/components/button/button";
import { ChangeEvent, useState } from "react";

const ParticipateTeamForm = () => {
  const [teamLink, setTeamLink] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTeamLink(e.target.value);
  };

  return (
    <div className="flex w-full flex-col gap-[40px]">
      <div className="flex flex-col gap-[12px]">
        <p className="text-[16px] font-[500]">팀 링크</p>
        <input
          className="w-full rounded-xl border border-border-primary border-opacity-10 bg-background-secondary px-4 py-[13.5px] text-base font-normal placeholder:text-sm placeholder:font-normal placeholder:text-text-default focus:border-2 focus:outline-none"
          placeholder="팀 링크를 입력해주세요."
          value={teamLink}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <Button btnSize="large" btnStyle="solid" disabled={!teamLink.trim()}>
          참여하기
        </Button>
        <p className="text-center text-[16px] font-[400]">
          공유받은 팀 링크를 입력해 참여할 수 있어요.
        </p>
      </div>
    </div>
  );
};

export default ParticipateTeamForm;
