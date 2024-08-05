"use client";

import Button from "@/components/button/button";
import PasswordInput from "@/components/input-field/password-input";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { resetPasswordSchema } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import ModalSendEmail from "./modal-send-email";

export interface ResetPasswordInputValue {
  passwordConfirmation: string;
  password: string;
}

export default function ResetPasswordForm() {
  const modalSendEmailOverlay = useCustomOverlay(({ close }) => (
    <ModalSendEmail close={close} />
  ));
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordInputValue>({
    resolver: yupResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ResetPasswordInputValue> = async (data) => {
    console.log(data);
  };

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    <form>
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
        type="button"
        onClick={modalSendEmailOverlay.open}
      >
        재설정
      </Button>
    </form>
  );
}
