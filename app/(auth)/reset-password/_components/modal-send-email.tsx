import { BasicInput } from "@/components/input-field/basic-input";
import Modal from "@/components/modal/modal";
import { sendEmail } from "@/lib/apis/user";
import { showToast } from "@/lib/show-toast";
import { sendEmailSchema } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

interface ModalSendEmailProps {
  close: () => void;
}

export interface SendEmailInputValue {
  email: string;
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

  const handleClick: SubmitHandler<SendEmailInputValue> = async (data) => {
    console.log(data);
    const response = await sendEmail(data);
    if (typeof response === "string") {
      if (response.includes("이메일")) {
        showToast("warning", <p>{response}</p>);
      }
    } else {
      showToast("success", <p>{response.message}</p>);
      close();
    }
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
            confirmBtnDisabled={!isValid}
          />
        </form>
      </div>
    </Modal>
  );
}
