import { SubmitHandler, useForm } from "react-hook-form";

import { useModal } from ".";

interface ModalTwoButtonProps {
  title: string;
  description: string;
  placeholder: string;
  handleConfirm: (value: string) => void;
  buttonDescription: string;
}

/**
 * 버튼을 두 개 갖고 input이 하나 있는 모달 컴포넌트입니다.
 *
 * @author 이승현
 * @param title 모달의 제목
 * @param description 모달의 설명
 * @param placeholder input의 placeholder
 * @param handleConfirm 확인 버튼을 눌렀을 때 실행할 함수
 * @param buttonDescription 버튼의 설명
 * @returns
 * @example
 * ```tsx
 * <Modal button={<button>버튼</button>}>
 *  <ModalTwoButton
 *   buttonDescription="링크 보내기"
 *  description="비밀번호 재설정 링크를 보내드립니다."
 * handleConfirm={(value) => {
 * console.log(value);
 * }}
 * placeholder="이메일을 입력하세요."
 * title="비밀번호 재설정"
 * />
 * </Modal>
 * ```
 */
export function ModalTwoButton({
  title,
  description,
  placeholder,
  handleConfirm,
  buttonDescription,
}: ModalTwoButtonProps) {
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
      <header className="h-12 px-6 pt-4"></header>
      <section className="mx-12 text-center md:mx-[52px]">
        <h2 className="mb-2 text-base font-medium text-text-primary">
          {title}
        </h2>
        <h3 className="mb-4 break-keep text-sm font-medium text-text-secondary">
          {description}
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="text-left">
          <input
            placeholder={placeholder}
            className="block h-11 w-full min-w-[280px] rounded-xl border border-text-default bg-background-secondary px-4 py-[13.5px] text-[14px] font-medium text-text-primary placeholder-text-default"
            {...register("content", { required: true })}
          />
          {errors.content && (
            <aside className="text-center text-xs text-status-danger">
              필수 입력 사항입니다.
            </aside>
          )}
          <section className="mb-8 mt-6 flex w-full gap-2">
            <button
              type="button"
              className="h-12 flex-1 bg-white"
              onClick={handleClose}
            >
              닫기
            </button>
            <button className="h-12 flex-1 bg-green-50">
              {buttonDescription}
            </button>
          </section>
        </form>
      </section>
    </section>
  );
}
