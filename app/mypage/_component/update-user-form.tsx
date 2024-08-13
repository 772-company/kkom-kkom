"use client";

import Button from "@/components/button/button";
import { BasicInput } from "@/components/input-field/basic-input";
import PasswordInput from "@/components/input-field/password-input";
import { ProfileInput } from "@/components/profile-input/profile-input";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { getUser } from "@/lib/apis/user";
import { updateUserSchema } from "@/schemas/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import ModalResetPassword from "./modal-reset-password";

interface UpdateUserInputValue {
  nickname: string;
  image?: File | string;
  password?: string;
  email?: string;
}

export default function UpdateUserForm() {
  const modalResetPasswordOverlay = useCustomOverlay(({ close }) => (
    <ModalResetPassword close={close} />
  ));

  const { data, isSuccess } = useQuery({
    queryKey: ["posts"],
    queryFn: getUser,
  });

  const {
    register,
    handleSubmit,
    setValue,
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

  const { image, email } = data;

  const onSubmit: SubmitHandler<UpdateUserInputValue> = async (data) => {
    console.log(data);
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
        disabled={!isDirty || !isValid}
      >
        수정하기
      </Button>
    </form>
  );
}
