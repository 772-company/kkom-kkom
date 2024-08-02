import Modal from "../../modal/modal";

interface ModalDangerProps {
  handleConfirm: () => void;
  close: () => void;
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
export function ModalDanger({ handleConfirm, close }: ModalDangerProps) {
  const handleClick = () => {
    handleConfirm();
    close();
  };
  return (
    <Modal closeOnFocusOut close={close}>
      <section className="mx-9 mt-8 text-center">
        <Modal.Title>로그아웃 하시겠어요?</Modal.Title>
        <Modal.TwoButtonSection
          className="mt-6"
          closeBtnStyle="outlined_secondary"
          confirmBtnStyle="danger"
          close={close}
          buttonDescription="로그아웃"
          onClick={handleClick}
        />
      </section>
    </Modal>
  );
}
