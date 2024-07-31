"use client";

import Button from "@/components/button/button";
import { BasicInput } from "@/components/input-field/basic-input";
import PasswordInput from "@/components/input-field/password-input";
import { loginSchema } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

export default function LoginFrom() {
  interface LoginInputValue {
    email: string;
    password: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputValue>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginInputValue> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <BasicInput<LoginInputValue>
          register={register}
          id="email"
          placeholder="이메일을 입력해 주세요"
          type="email"
          label="이메일"
          error={errors.email?.message}
        />
        <PasswordInput<LoginInputValue>
          register={register}
          id="password"
          placeholder="비밀번호를 입력해 주세요"
          label="비밀번호"
          error={errors.password?.message}
        />
      </div>
      <Link
        href="/login"
        className="mt-3 flex justify-end text-sm font-medium text-brand-primary underline"
      >
        비밀번호를 잊으셨나요?
      </Link>
      <Button btnSize="large" btnStyle="solid" className="mt-10 w-full">
        로그인
      </Button>
    </form>
  );
}
