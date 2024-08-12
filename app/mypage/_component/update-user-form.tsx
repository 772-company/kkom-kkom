"use client";

import { BasicInput } from "@/components/input-field/basic-input";
import { ProfileInput } from "@/components/profile-input/profile-input";
import { updateUserSchema } from "@/schemas/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

interface UpdateUserFormProps {
  image: string | null;
  nickname: string;
  email: string;
}

interface UpdateUserInputValue {
  nickname: string;
  image?: File | string;
}

export default function UpdateUserForm({
  image,
  nickname,
  email,
}: UpdateUserFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<UpdateUserInputValue>({
    mode: "onChange",
    defaultValues: {
      nickname,
      image: image ?? undefined,
    },
    resolver: yupResolver(updateUserSchema),
  });

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
