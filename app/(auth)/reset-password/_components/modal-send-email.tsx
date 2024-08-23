import { BasicInput } from "@/components/input-field/basic-input";
import Modal from "@/components/modal/modal";
import { ResponseError } from "@/lib/apis/myFetch/clientFetch";
import { PostTeamIdUserSendResetPasswordEmailResponse } from "@/lib/apis/type";
import { sendEmail } from "@/lib/apis/user";
import { showToast } from "@/lib/show-toast";
import { sendEmailSchema } from "@/schemas/auth";
import { SendEmailInputValue } from "@/type/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ModalSendEmailProps {
  close: () => void;
}

export default function ModalSendEmail({ close }: ModalSendEmailProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<SendEmailInputValue>({
    resolver: yupResolver(sendEmailSchema),
    mode: "onChange",
  });
  const mutation = useMutation({
    mutationFn: async (data: SendEmailInputValue) => {
      const response = (await sendEmail(
        data,
      )) as PostTeamIdUserSendResetPasswordEmailResponse;
      return response;
    },
    onMutate: () => {
      showToast("loading", "비밀번호 변경 이메일 전송 중입니다.", {
        toastId: "sendEmail",
      });
    },
    onSuccess: (response: PostTeamIdUserSendResetPasswordEmailResponse) => {
      toast.update("sendEmail", {
        render: response.message,
        type: "success",
        isLoading: false,
        hideProgressBar: false,
        autoClose: 1000,
      });
      close();
    },
    onError: (error: unknown) => {
      if (error instanceof ResponseError) {
        setError("email", { type: "manual" });
        showToast("error", <p>존재하지 않는 이메일입니다.</p>);
      } else {
        throw error;
      }
    },
  });

  const handleClick: SubmitHandler<SendEmailInputValue> = async (data) => {
    mutation.mutate(data);
  };
  return (
    <Modal close={close} closeOnFocusOut>
      <div className="my-6">
        <Modal.Title className="mb-2">비밀번호 재설정</Modal.Title>
        <Modal.Description className="mb-4">
          비밀번호 재설정 링크를 보내드립니다.
        </Modal.Description>
        <form onSubmit={handleSubmit(handleClick)}>
          <BasicInput<SendEmailInputValue>
            register={register}
            id="email"
            placeholder="이메일을 입력해 주세요"
            type="email"
            error={errors.email?.message}
          />
          <Modal.TwoButtonSection
            closeBtnStyle="outlined"
            confirmBtnStyle="solid"
            buttonDescription="링크 보내기"
            close={close}
            className="mt-6"
            disabled={!isValid || mutation.isPending}
          />
        </form>
      </div>
    </Modal>
  );
}
