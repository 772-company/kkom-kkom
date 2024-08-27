import PasswordInput from "@/components/input-field/password-input";
import Modal from "@/components/modal/modal";
import { modalResetPassword } from "@/lib/apis/user";
import { showToast } from "@/lib/show-toast";
import { resetPasswordSchema } from "@/schemas/auth";
import { ResetPasswordInputValue } from "@/type/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ModalResetPasswordProps {
  close: () => void;
}
export default function ModalResetPassword({ close }: ModalResetPasswordProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordInputValue>({
    resolver: yupResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: (data: ResetPasswordInputValue) => modalResetPassword(data),
    onMutate: () => {
      showToast("loading", "비밀번호 변경 중입니다.", {
        toastId: "updatePassword",
      });
    },
    onSuccess: () => {
      toast.update("updatePassword", {
        render: "비밀번호가 변경되었습니다.",
        type: "success",
        isLoading: false,
        hideProgressBar: false,
        autoClose: 1000,
      });
      close();
    },
    onError: (response) => {
      toast.update("updatePassword", {
        render: response.message,
        type: "error",
        isLoading: false,
        hideProgressBar: false,
        autoClose: 1000,
      });
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordInputValue> = async (data) => {
    mutation.mutate(data);
  };

  return (
    <Modal close={close} closeOnFocusOut className="p-[36px]">
      <Modal.Title>비밀번호 변경하기</Modal.Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 mt-4 flex flex-col gap-4">
          <PasswordInput<ResetPasswordInputValue>
            id="password"
            placeholder="새 비밀번호를 입력해 주세요"
            label="새 비밀번호"
            error={errors.password?.message}
            register={register}
            isModal
          />
          <PasswordInput<ResetPasswordInputValue>
            id="passwordConfirmation"
            placeholder="새 비밀번호를 다시 한 번 입력해 주세요"
            label="새 비밀번호 확인"
            error={errors.passwordConfirmation?.message}
            register={register}
            isModal
          />
        </div>
        <Modal.TwoButtonSection
          closeBtnStyle="outlined"
          confirmBtnStyle="solid"
          buttonDescription="변경하기"
          close={close}
          disabled={!isValid || mutation.isPending}
        />
      </form>
    </Modal>
  );
}
