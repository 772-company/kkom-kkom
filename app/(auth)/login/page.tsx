"use client";

import { BasicInput } from "@/components/input-field/basic-input";
import PasswordInput from "@/components/input-field/password-input";
import { loginSchema } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

export default function LoginPage() {
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
    <div className="w-full pt-6 md:pt-[100px] xl:pt-[140px]">
      <main className="">
        <h2 className="text-2xl font-medium text-text-primary xl:text-[40px]">
          로그인
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
        </form>
      </main>
      {/* TODO - 간편 로그인 */}
      <section>
        <p>아직 계정이 없으신가요 ?</p>
        <Link href="/signin">가입하기</Link>
      </section>
    </div>
  );
}
