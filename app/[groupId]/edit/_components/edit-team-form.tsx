"use client";

import Button from "@/components/button/button";
import { BasicInput } from "@/components/input-field/basic-input";
import ProfileInput from "@/components/profile-input/profile-input";
import getGroupInfo, { patchGroupInfo, postGroup } from "@/lib/apis/group";
import { uploadImage } from "@/lib/apis/image";
import { ResponseError } from "@/lib/apis/myFetch/clientFetch";
import { showToast } from "@/lib/show-toast";
import { editTeamSchema } from "@/schemas/team";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface EditTeamFormValue {
  teamProfile?: File | string | undefined;
  teamName?: string;
}

interface EditTeamFormProps {
  groupId: string;
}

const EditTeamForm = ({ groupId }: EditTeamFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isSuccess } = useQuery({
    queryKey: ["groupInfo"],
    queryFn: () => getGroupInfo({ groupId: groupId }),
  });

  const createTeamMutation = useMutation({
    mutationFn: (data: EditTeamFormValue) =>
      patchGroupInfo({ groupId, image: data.teamProfile, name: data.teamName }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["getGroupInfo", groupId] });
      showToast("success", "팀 정보를 수정하였습니다.");
      router.push(`/${response.id}`);
      router.refresh();
    },
    onError: () => {
      showToast("error", "팀 정보 수정에 실패하였습니다.");
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isDirty },
  } = useForm<EditTeamFormValue>({
    mode: "onChange",
    resolver: yupResolver(editTeamSchema),
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { name, image } = data;
      reset({
        teamName: name,
        teamProfile: image ?? undefined,
      });
    }
  }, [data, isSuccess, reset]);

  if (!isSuccess || !data) {
    return null;
  }

  const watchedTeamName = watch("teamName", data.name) || "";

  const onSubmit: SubmitHandler<EditTeamFormValue> = async (formData) => {
    if (formData.teamProfile instanceof File) {
      try {
        const imageToStringResponse = await uploadImage(formData.teamProfile);
        formData.teamProfile = imageToStringResponse.url;
      } catch (error) {
        if (error instanceof ResponseError) {
          showToast("error", <p>{error.message}</p>);
        } else {
          showToast("error", <p>다시 시도해 주세요</p>);
        }
        return;
      }
    }

    createTeamMutation.mutate(formData);
  };

  return (
    <div className="flex flex-col justify-center gap-[24px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[40px]">
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[12px]">
              <h1 className="text-text-primary">팀 프로필</h1>
              <ProfileInput<EditTeamFormValue>
                id="teamProfile"
                type="teamProfile"
                setValue={setValue}
                defaultValue={data?.image ? data.image : undefined}
              />
            </div>
            <BasicInput<EditTeamFormValue>
              id="teamName"
              register={register}
              label="팀 이름"
              placeholder="팀 이름을 입력해 주세요."
            />
          </div>
          <Button
            btnSize="large"
            btnStyle="solid"
            disabled={
              !isDirty ||
              !watchedTeamName.trim() ||
              createTeamMutation.isPending
            }
          >
            {createTeamMutation.isPending ? "수정 중..." : "수정하기"}
          </Button>
        </div>
      </form>

      <p className="text-center text-text-primary">
        팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
      </p>
    </div>
  );
};

export default EditTeamForm;
