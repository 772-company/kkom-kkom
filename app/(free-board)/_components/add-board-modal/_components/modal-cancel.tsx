import Modal from "@/components/modal/modal";
import Alert from "@/public/icons/alert.svg";
import { useCallback } from "react";

interface ModalCancelProps {
  close: () => void;
  onCancel: () => void;
}

export default function ModalCancel({ close, onCancel }: ModalCancelProps) {
  const handleClick = useCallback(() => {
    onCancel();
    close();
  }, [close, onCancel]);
  return (
    <Modal close={close} closeOnFocusOut>
      <header className="flex justify-center pb-4 pt-6">
        <Alert width={24} height={24} />
      </header>
      <div className="mx-12 text-center md:mx-9">
        <Modal.Title className="mb-4 text-slate-50 md:text-text-primary">
          다른 사진을 선택하시겠습니까?
        </Modal.Title>
        <Modal.Description className="mb-6">
          선택한 사진은 초기화됩니다.
        </Modal.Description>
        <Modal.TwoButtonSection
          closeBtnStyle="outlined_secondary"
          confirmBtnStyle="danger"
          buttonDescription="취소하기"
          onClick={handleClick}
          close={close}
        />
      </div>
    </Modal>
  );
}
