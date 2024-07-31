"use client";

import Button from "@/components/button/button";
import { BasicInput } from "@/components/input-field/basic-input";
import PasswordInput from "@/components/input-field/password-input";
import { login } from "@/lib/apis/auth";
import { gerUserGroups } from "@/lib/apis/user";
import { loginSchema } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export interface LoginInputValue {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginInputValue>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginInputValue> = async (data) => {
    console.log(data);
    const response = await login(data);

    if (typeof response === "string") {
      console.log(response);
      if (response.slice(0, 4) === "존재하지") {
        setError("email", { type: "manual", message: response });
      } else if (response.slice(0, 4) === "비밀번호") {
        setError("password", { type: "manual", message: response });
      }
    } else {
      // NOTE - 로그인 성공
      console.log("로그인 성공", response);
      setCookie("accessToken", response.accessToken, { maxAge: 60 * 60 });

      const getUserGroupsResponse = await gerUserGroups();
      // NOTE - 그룹 없는 경우
      if (getUserGroupsResponse.length === 0) {
        router.push("/addteam");
      } else {
        // NOTE - 그룹이 존재하는 경우 첫 번째 그룹의 id로 이동
        router.push(`/${getUserGroupsResponse[0].id}`);
      }
    }
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
      <Button
        btnSize="large"
        btnStyle="solid"
        className="mt-10 w-full"
        disabled={!isValid}
      >
        로그인
      </Button>
    </form>
  );
}
