"use client";

import Button from "@/components/button/button";
import { BasicInput } from "@/components/input-field/basic-input";
import { ProfileInput } from "@/components/profile-input/profile-input";
import { postGroup } from "@/lib/apis/group";
import { showToast } from "@/lib/show-toast";
import { addTeamSchema } from "@/schemas/team";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";
import { useForm } from "react-hook-form";

interface AddTeamFormValue {
  teamProfile?: File;
  teamName: string;
}

function AddTeamForm() {
  const { register, handleSubmit, setValue, watch } = useForm<AddTeamFormValue>(
    {
      resolver: yupResolver(addTeamSchema),
    },
  );
  const watchedTeamName = watch("teamName") || "";
  const router = useRouter();

  const createTeamMutation = useMutation({
    mutationFn: (data: AddTeamFormValue) =>
      postGroup({ image: data.teamProfile, name: data.teamName }),
    onSuccess: (response) => {
      showToast("success", "팀을 생성하였습니다.");
      router.push(`/${response.id}`);
      router.refresh();
    },
    onError: () => {
      showToast("error", "팀 생성에 실패하였습니다.");
    },
  });

  const onSubmit = (data: AddTeamFormValue) => {
    createTeamMutation.mutate(data);
  };

  return (
    <div className="flex flex-col justify-center gap-[24px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[40px]">
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[12px]">
              <h1 className="text-text-primary">팀 프로필</h1>
              <ProfileInput<AddTeamFormValue>
                id="teamProfile"
                type="teamProfile"
                setValue={setValue}
              />
            </div>

            <BasicInput<AddTeamFormValue>
              id="teamName"
              register={register}
              label="팀 이름"
              placeholder="팀 이름을 입력해 주세요."
            />
          </div>
          <Button
            btnSize="large"
            btnStyle="solid"
            disabled={!watchedTeamName.trim() || createTeamMutation.isPending}
          >
            {createTeamMutation.isPending ? "생성 중..." : "생성하기"}
          </Button>
        </div>
      </form>

      <p className="text-center text-text-primary">
        팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
      </p>
    </div>
  );
}

export default AddTeamForm;
