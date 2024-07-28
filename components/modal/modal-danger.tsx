import { useModal } from ".";

interface ModalDangerProps {
  title: string;
  handleConfirm: () => void;
  buttonDescription: string;
}

/**
 * 위험한 작업을 수행할 때 사용하는 모달 컴포넌트입니다.
 * 
 * @author 이승현
 * @param title 모달의 제목
 * @param handleConfirm 확인 버튼을 눌렀을 때 실행할 함수
 * @param buttonDescription 버튼의 설명
 * @returns
 * @example
 * ```tsx
 * <Modal button={<button>modalDanger 열기</button>}>
        <ModalDanger
          title="로그아웃 하시겠어요?"
          handleConfirm={() => console.log("삭제")}
          buttonDescription="삭제하기"
        />
      </Modal>
 * ```
 */
export function ModalDanger({
  title,
  handleConfirm,
  buttonDescription,
}: ModalDangerProps) {
  const { handleClose } = useModal();
  return (
    <>
      <header className="h-12 px-6 pt-4"></header>
      <div className="mx-12 text-center md:mx-[52px]">
        <h2 className="text-base font-medium text-slate-50 md:text-text-primary">
          {title}
        </h2>
        <section className="mb-8 mt-6 flex w-full gap-2">
          <button
            type="button"
            className="h-12 flex-1 bg-white"
            onClick={handleClose}
          >
            닫기
          </button>
          <button
            className="h-12 flex-1 bg-red-500"
            type="button"
            onClick={handleConfirm}
          >
            {buttonDescription}
          </button>
        </section>
      </div>
    </>
  );
}
