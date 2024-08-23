"use client";

import Button from "@/components/button/button";
import { BasicInput } from "@/components/input-field/basic-input";
import { postGroupInvitation } from "@/lib/apis/group";
import { showToast } from "@/lib/show-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

interface ParticipateTeamFormProps {
  email: string;
}

interface TeamLinkFormValues {
  token: string;
}

function ParticipateTeamForm({ email }: ParticipateTeamFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { register, handleSubmit } = useForm<TeamLinkFormValues>({
    defaultValues: {
      token: searchParams.get("token") || "",
    },
  });

  const onSubmit = async (data: TeamLinkFormValues) => {
    try {
      await postGroupInvitation({
        userEmail: email,
        token: data.token,
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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex w-full flex-col gap-[40px]">
        <div className="flex flex-col gap-[12px]">
          <BasicInput<TeamLinkFormValues>
            id="token"
            register={register}
            label="팀 링크"
            placeholder="팀 링크를 입력해 주세요."
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <Button btnSize="large" btnStyle="solid">
            참여하기
          </Button>
          <p className="text-center text-[16px] font-[400]">
            공유받은 팀 링크를 입력해 참여할 수 있어요.
          </p>
        </div>
      </div>
    </form>
  );
}

export default ParticipateTeamForm;
