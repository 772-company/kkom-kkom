"use client";

import Button from "@/components/button/button";
import PasswordInput from "@/components/input-field/password-input";
import { ResponseError } from "@/lib/apis/myFetch/clientFetch";
import { PatchTeamIdUserResetPasswordResponse } from "@/lib/apis/type";
import { resetPassword } from "@/lib/apis/user";
import { showToast } from "@/lib/show-toast";
import { resetPasswordSchema } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

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

  const mutation = useMutation({
    mutationFn: (data: ResetPasswordInputValue) =>
      resetPassword({
        ...data,
        token,
      }),
    onMutate: () => {
      showToast("loading", "비밀번호 변경 중입니다.", {
        toastId: "resetPassword",
      });
    },
    onSuccess: () => {
      toast.update("resetPassword", {
        render: "비밀변호가 변경되었습니다.",
        type: "success",
        isLoading: false,
        hideProgressBar: false,
        autoClose: 1000,
      });
      router.push("/login");
    },
    onError: async (error: unknown) => {
      if (error instanceof ResponseError) {
        const response = await error.response?.json();
        // NOTE - 토큰 요휴시간(1시간)이 지난 경우
        showToast("error", <p>{response}</p>);
        router.push("/login");
      } else {
        throw error;
      }
    },
  });

  // NOTE - 이메일로 전송된 링크가 아닌 /reset-password로 접근하는 경우
  if (!token) {
    router.push("/login");
    return;
  }

  const onSubmit: SubmitHandler<ResetPasswordInputValue> = async (data) => {
    mutation.mutate(data);
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
        disabled={!isValid || mutation.isPending}
      >
        재설정
      </Button>
    </form>
  );
}
