"use client";

import Button from "@/components/button/button";
import PasswordInput from "@/components/input-field/password-input";
import { ResponseError } from "@/lib/apis/myFetch/clientFetch";
import { PatchTeamIdUserResetPasswordResponse } from "@/lib/apis/type";
import { resetPassword } from "@/lib/apis/user";
import { showToast } from "@/lib/show-toast";
import { resetPasswordSchema } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export interface ResetPasswordInputValue {
  passwordConfirmation: string;
  password: string;
}

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordInputValue>({
    resolver: yupResolver(resetPasswordSchema),
    mode: "onChange",
  });

  // NOTE - 이메일로 전송된 링크가 아닌 /reset-password로 접근하는 경우
  if (!token) {
    router.push("/login");
    return;
  }

  const onSubmit: SubmitHandler<ResetPasswordInputValue> = async (data) => {
    try {
      const response = (await resetPassword({
        ...data,
        token,
      })) as PatchTeamIdUserResetPasswordResponse;
      showToast("success", <p>비밀번호가 변경되었습니다.</p>);
      router.push("/login");
    } catch (error) {
      if (error instanceof ResponseError) {
        const response = await error.response?.json();
        // NOTE - 토큰 요휴시간(1시간)이 지난 경우
        showToast("error", <p>{response}</p>);
        router.push("/login");
      }
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
