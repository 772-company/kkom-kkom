"use client";

import Button from "@/components/button/button";
import { BasicInput } from "@/components/input-field/basic-input";
import PasswordInput from "@/components/input-field/password-input";
import { ProfileInput } from "@/components/profile-input/profile-input";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { uploadImage } from "@/lib/apis/image";
import { ResponseError } from "@/lib/apis/myFetch/clientFetch";
import { getUser, updateAccount } from "@/lib/apis/user";
import { showToast } from "@/lib/show-toast";
import { updateUserSchema } from "@/schemas/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import ModalResetPassword from "./modal-reset-password";

export interface UpdateUserInputValue {
  nickname?: string;
  image?: File | string;
  password?: string;
  email?: string;
}

export default function UpdateUserForm() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const modalResetPasswordOverlay = useCustomOverlay(({ close }) => (
    <ModalResetPassword close={close} />
  ));

  const { data, isSuccess } = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateUserInputValue) => updateAccount(data),
    onMutate: () => {
      showToast("loading", "계정 정보를 수정 중입니다.", {
        toastId: "updateUserInfo",
      });
      setIsLoading(true);
    },
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({ queryKey: ["getUser"] });
        toast.update("updateUserInfo", {
          render: "정보가 변경되었습니다.",
          type: "success",
          isLoading: false,
          hideProgressBar: false,
          autoClose: 1000,
        });
      } finally {
        setIsLoading(false);
      }
    },
    onError: async (error) => {
      if (error instanceof ResponseError) {
        const response = (await error.response?.json()) as { message: string };
        showToast("error", <p>{response.message}</p>);
        return;
      } else {
        showToast("error", <p>다시 시도해 주세요</p>);
      }
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<UpdateUserInputValue>({
    mode: "onChange",
    resolver: yupResolver(updateUserSchema),
  });

  // NOTE - 초기값 설정
  useEffect(() => {
    if (isSuccess && data) {
      const { nickname, image } = data;
      reset({
        nickname,
        image: image ?? undefined,
      });
    }
  }, [data, isSuccess, reset]);

  if (!isSuccess || !data) {
    return null;
  }

  const { image, email, nickname } = data;
  const watchedNickname = watch("nickname", nickname) || "";

  const onSubmit: SubmitHandler<UpdateUserInputValue> = async (data) => {
    // NOTE - 닉네임 변경하지 않는 경우 data에 포함 X
    if (data.nickname === nickname) {
      delete data.nickname;
    }

    // NOTE - image가 파일인 경우 url로 변환
    if (data.image instanceof File) {
      try {
        const imageToStringResponse = await uploadImage(data.image);
        data.image = imageToStringResponse.url;
      } catch (error) {
        if (error instanceof ResponseError) {
          showToast("error", <p>{error.message}</p>);
          return;
        } else {
          showToast("error", <p>다시 시도해 주세요</p>);
          return;
        }
      }
    }
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-[24px] flex flex-col gap-[24px]">
        <ProfileInput<UpdateUserInputValue>
          id="image"
          type="myProfile"
          setValue={setValue}
          error={errors.image?.message}
          defaultValue={image ?? undefined}
        />
        <BasicInput<UpdateUserInputValue>
          register={register}
          id="nickname"
          placeholder="닉네임을 입력해 주세요"
          label="이름"
          error={errors.nickname?.message}
        />
        <BasicInput<UpdateUserInputValue>
          register={register}
          id="email"
          disabled
          label="이메일"
          value={email}
        />
        <PasswordInput<UpdateUserInputValue>
          register={register}
          id="password"
          label="비밀번호"
          disabled
          value={123456789}
          onOpenModal={modalResetPasswordOverlay.open}
        />
      </div>
      <Button
        btnSize="x-small"
        btnStyle="solid"
        className="absolute right-0 top-0 ml-auto flex w-[80px]"
        disabled={
          !isDirty ||
          !isValid ||
          watchedNickname.trim() === "" ||
          mutation.isPending ||
          isLoading
        }
      >
        수정하기
      </Button>
    </form>
  );
}
