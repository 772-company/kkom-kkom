import { SubmitHandler, useForm } from "react-hook-form";

import { useModal } from ".";

interface ModalDetailedTwoButtonProps {
  title: string;
  label1: string;
  label2: string;
  placeholder1: string;
  placeholder2: string;
  handleConfirm: (value1: string, value2: string) => void;
  buttonDescription: string;
}

interface ModalDetailedFormType {
  content1: string;
  content2: string;
}

/**
 * 버튼을 두개 갖고 input이 두 개 있는 모달 컴포넌트입니다.
 *
 * @author 이승현
 * @param title 모달의 제목
 * @param label1 첫 번째 input의 label
 * @param label2 두 번째 input의 label
 * @param placeholder1 첫 번째 input의 placeholder
 * @param placeholder2 두 번째 input의 placeholder
 * @param handleConfirm 확인 버튼을 눌렀을 때 실행할 함수
 * @param buttonDescription 버튼의 설명
 * @returns {React.ReactElement}
 * @example
 * ```tsx
<Modal button={<button>modalDetailedTwoButton 열기</button>}>
        <ModalDetailedTwoButton
          title="비밀번호 변경하기"
          label1="새 비밀번호"
          label2="새 비밀번호 확인"
          placeholder1="새 비밀번호를 입력해주세요."
          placeholder2="새 비밀번호를 다시 입력해주세요."
          handleConfirm={(value1: string, value2: string) => {
            console.log(value1, value2);
          }}
          buttonDescription="변경하기"
        />
      </Modal>
 * ```
 */
export function ModalDetailedTwoButton({
  title,
  label1,
  label2,
  placeholder1,
  placeholder2,
  handleConfirm,
  buttonDescription,
}: ModalDetailedTwoButtonProps) {
  const { handleClose } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ModalDetailedFormType>();

  const onSubmit: SubmitHandler<ModalDetailedFormType> = (data) => {
    handleConfirm(data.content1, data.content2);
    handleClose();
  };

  return (
    <section>
      <header className="h-12 px-6 pt-4"></header>
      <section className="mx-12 text-center md:mx-[52px]">
        <h2 className="mb-4 text-base font-medium text-text-primary">
          {title}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="text-left">
          <label htmlFor="content1" className="mt-4 block text-text-primary">
            {label1}
          </label>
          <input
            placeholder={placeholder1}
            className="mt-2 h-11 w-full min-w-[280px] rounded-xl border border-text-default bg-background-secondary px-4 py-[13.5px] text-[14px] font-medium text-text-primary placeholder-text-default"
            {...register("content1", { required: true })}
          />
          {errors.content1 && (
            <aside className="text-center text-xs text-status-danger">
              필수 입력 사항입니다.
            </aside>
          )}
          <label
            htmlFor="content2"
            className="mb-2 mt-4 block text-text-primary"
          >
            {label2}
          </label>
          <input
            placeholder={placeholder2}
            className="mt-2 block w-full min-w-[280px] resize-none rounded-xl border border-text-default bg-background-secondary px-4 py-[13.5px] text-[14px] font-medium text-text-primary placeholder-text-default"
            {...register("content2", { required: true })}
          />
          {errors.content2 && (
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
