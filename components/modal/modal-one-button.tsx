import CloseButton from "@/app/public/icons/x.svg";
import { SubmitHandler, useForm } from "react-hook-form";

import { useModal } from ".";

interface ModalOneButtonProps {
  title: string;
  placeholder: string;
  handleConfirm: (value: string) => void;
  buttonDescription: string;
}

/**
 * 버튼을 하나 갖고 input이 하나 있는 모달 컴포넌트입니다.
 *
 * @author 이승현
 * @param title 모달의 제목
 * @param placeholder input의 placeholder
 * @param handleConfirm 확인 버튼을 눌렀을 때 실행할 함수
 * @param buttonDescription 버튼의 설명
 * @returns {React.ReactElement}
 * @example
 * ```tsx
 * <Modal button={<button>버튼</button>}>
 *   <ModalOneButton
 *     title="그룹 이름 변경"
 *     placeholder="그룹 이름을 입력해주세요."
 *     handleConfirm={(value) => console.log(value)}
 *     buttonDescription="변경하기"
 *   />
 * </Modal>
 * ```
 */
export function ModalOneButton({
  title,
  placeholder,
  handleConfirm,
  buttonDescription,
}: ModalOneButtonProps) {
  const { handleClose } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ content: string }>();

  const onSubmit: SubmitHandler<{ content: string }> = (data) => {
    handleConfirm(data.content);
    handleClose();
  };

  return (
    <section>
      <header className="flex h-12 items-center justify-end px-6 pt-4">
        <button onClick={handleClose}>
          <CloseButton
            className="rounded-xl hover:scale-105"
            width={24}
            height={24}
          />
        </button>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-12 text-center md:mx-[52px]"
      >
        <h2 className="mb-4 text-base font-medium text-text-primary">
          {title}
        </h2>
        <input
          placeholder={placeholder}
          className="h-11 w-full min-w-[280px] rounded-xl border border-text-default bg-background-secondary px-4 py-[13.5px] text-[14px] font-medium text-text-primary placeholder-text-default"
          {...register("content", { required: true })}
        />
        {errors.content && (
          <aside className="text-xs text-status-danger">
            필수 입력 사항입니다.
          </aside>
        )}
        <button className="mb-8 mt-6 h-12 w-[280px]">
          {buttonDescription}
        </button>
      </form>
    </section>
  );
}
