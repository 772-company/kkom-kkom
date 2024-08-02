import Modal from "@/components/modal/modal";
import Alert from "@/public/icons/alert.svg";

interface ModalWarningProps {
  handleConfirm: () => void;
  close: () => void;
}

/**
 * 경고 이미지를 포함하는 모달 컴포넌트입니다.
 *
 * @author 이승현
 * @param handleConfirm 확인 버튼을 눌렀을 때 실행할 함수
 */
export function ModalWarning({ handleConfirm, close }: ModalWarningProps) {
  const handleClick = async () => {
    await handleConfirm();
    close();
  };

  return (
    <Modal close={close} closeOnFocusOut>
      <header className="flex justify-center pb-4 pt-6">
        <Alert width={24} height={24} />
      </header>
      <div className="mx-12 text-center md:mx-9">
        <Modal.Title className="mb-2 text-slate-50 md:text-text-primary">
          회원 탈퇴를 진행하시겠어요?
        </Modal.Title>
        <Modal.Description className="mb-4">
          그룹장에 있는 모든 그룹은 삭제되고, 모든 그룹에서 나가집니다.
        </Modal.Description>
        <Modal.TwoButtonSection
          closeBtnStyle="outlined_secondary"
          confirmBtnStyle="danger"
          buttonDescription="회원 탈퇴"
          onClick={handleClick}
          close={close}
        />
      </div>
    </Modal>
  );
}
