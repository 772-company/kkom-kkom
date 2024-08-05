"use client";

import Button from "@/components/button/button";
import PasswordInput from "@/components/input-field/password-input";
import { resetPassword } from "@/lib/apis/user";
import { showToast } from "@/lib/show-toast";
import { resetPasswordSchema } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export interface ResetPasswordInputValue {
  passwordConfirmation: string;
  password: string;
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordInputValue>({
    resolver: yupResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ResetPasswordInputValue> = async (data) => {
    if (token) {
      const response = await resetPassword({ ...data, token });
      if (typeof response === "string") {
        if (response.includes("토큰")) {
          showToast("error", <p>{response}</p>);
          router.push("/login");
        }
      } else {
        showToast("success", <p>비밀번호가 변경되었습니다.</p>);
        router.push("/login");
      }
    } else {
      // NOTE - 메일에 첨부된 링크가 아닌 강제로 들어온 경우
      router.push("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <PasswordInput<ResetPasswordInputValue>
          id="password"
          placeholder="비밀번호를 입력해 주세요"
          label="새 비밀번호"
          error={errors.password?.message}
          register={register}
        />
        <PasswordInput<ResetPasswordInputValue>
          id="passwordConfirmation"
          placeholder="새 비밀번호를 다시 한 번 입력해 주세요"
          label="비밀번호 확인"
          error={errors.passwordConfirmation?.message}
          register={register}
        />
      </div>
      <Button
        btnSize="large"
        btnStyle="solid"
        className="mt-10 w-full"
        disabled={!isValid}
      >
        재설정
      </Button>
    </form>
  );
}
