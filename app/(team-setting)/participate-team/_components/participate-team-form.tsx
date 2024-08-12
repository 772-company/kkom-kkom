"use client";

import Button from "@/components/button/button";
import { postGroupInvitation } from "@/lib/apis/group";
import { showToast } from "@/lib/show-toast";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface ParticipateTeamFormProps {
  email: string;
}

const ParticipateTeamForm = ({ email }: ParticipateTeamFormProps) => {
  const router = useRouter();
  const [teamLink, setTeamLink] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTeamLink(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
      await postGroupInvitation({
        userEmail: email,
        token: teamLink,
      });
      showToast("success", "팀 참여에 성공하였습니다.");
      router.push("/");
      router.refresh();
    } catch (error) {
      showToast(
        "error",
        error instanceof Error ? error.message : "팀 참여에 실패하였습니다.",
      );
    }
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
        <Button
          btnSize="large"
          btnStyle="solid"
          disabled={!teamLink.trim()}
          onClick={handleButtonClick}
        >
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
