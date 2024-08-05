"use client";

import Button from "@/components/button/button";
import { BasicInput } from "@/components/input-field/basic-input";
import PasswordInput from "@/components/input-field/password-input";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { login } from "@/lib/apis/auth";
import { loginSchema } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import ModalSendEmail from "../../reset-password/_components/modal-send-email";

export interface LoginInputValue {
  email: string;
  password: string;
}

export default function LoginForm() {
  const modalSendEmailOverlay = useCustomOverlay(({ close }) => (
    <ModalSendEmail close={close} />
  ));
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
    const response = await login(data);

    if (typeof response === "string") {
      if (response.includes("존재하지")) {
        setError("email", { type: "manual", message: response });
      } else if (response.includes("비밀번호")) {
        setError("password", { type: "manual", message: response });
      }
    } else {
      // NOTE - 로그인 성공
      setCookie("accessToken", response.accessToken, { maxAge: 60 * 60 });
      setCookie("refreshToken", response.refreshToken, {
        maxAge: 60 * 60 * 24 * 7,
      });

      // NOTE - 로그인 후 랜딩으로 리다이렉트를 위해 push 헤더 업데이트를 위해 refresh
      router.push("/");
      router.refresh();
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
      <button
        type="button"
        className="ml-auto mt-3 flex text-sm font-medium text-brand-primary underline"
        onClick={modalSendEmailOverlay.open}
      >
        비밀번호를 잊으셨나요?
      </button>
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
