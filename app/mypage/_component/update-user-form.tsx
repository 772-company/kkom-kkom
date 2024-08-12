"use client";

import { BasicInput } from "@/components/input-field/basic-input";
import { ProfileInput } from "@/components/profile-input/profile-input";
import { getUser } from "@/lib/apis/user";
import { updateUserSchema } from "@/schemas/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface UpdateUserInputValue {
  nickname: string;
  image?: File | string;
}

export default function UpdateUserForm() {
  const { data, isSuccess } = useQuery({
    queryKey: ["posts"],
    queryFn: getUser,
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
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

  const { image, nickname } = data;

  const onSubmit: SubmitHandler<UpdateUserInputValue> = async (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
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
          label="닉네임"
          error={errors.nickname?.message}
        />
      </div>
      <button>제출</button>
    </form>
  );
}
