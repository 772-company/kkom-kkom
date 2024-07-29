"use client";

import Button from "@/components/button";
import { BasicInput } from "@/components/input-field/basic-input";
import PasswordInput from "@/components/input-field/password-input";
import Google from "@/public/icons/google.svg";
import KakaoTalk from "@/public/icons/kakao-talk.svg";
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
    <div className="w-full px-4 pt-6 md:pt-[100px] xl:pt-[140px]">
      <div className="mx-auto min-w-[343px] max-w-[460px]">
        <main>
          <h2 className="mx-auto mb-6 text-center text-2xl font-medium text-text-primary md:mb-[80px] xl:text-[40px]">
            로그인
          </h2>
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
        </main>
        {/* TODO - 간편 로그인 */}
        <section className="mt-6">
          <div className="mb-[25px] flex items-center justify-center gap-3">
            <p className="text-sm font-medium text-text-primary">
              아직 계정이 없으신가요 ?
            </p>
            <Link
              href="/signin"
              className="text-sm font-medium text-brand-primary underline"
            >
              가입하기
            </Link>
          </div>
          <div>
            <p className="flex basis-[100%] items-center text-base font-medium text-white before:mr-6 before:h-[1px] before:grow before:bg-border-primary before:bg-opacity-10 before:text-[0px] before:content-[''] after:ml-6 after:h-[1px] after:grow after:bg-border-primary after:bg-opacity-10 after:text-[0px] after:content-['']">
              OR
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-base font-medium text-white">간편 로그인하기</p>
            <div className="flex gap-4">
              <button className="flex size-[42px] items-center justify-center rounded-full bg-[#F5E14B]">
                <KakaoTalk width={26} height={24} />
              </button>
              <button className="flex size-[42px] items-center justify-center rounded-full bg-[#F9FAFB]">
                <Google width={26} height={24} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
