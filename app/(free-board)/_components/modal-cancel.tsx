import Modal from "@/components/modal/modal";
import Alert from "@/public/icons/alert.svg";
import { useCallback } from "react";

interface ModalCancelProps {
  close: () => void;
  onCancel: () => void;
  title: string;
  description: string;
}

export default function ModalCancel({
  close,
  onCancel,
  title,
  description,
}: ModalCancelProps) {
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
          {title}
        </Modal.Title>
        <Modal.Description className="mb-6">{description}</Modal.Description>
        <Modal.TwoButtonSection
          closeBtnStyle="outlined_secondary"
          confirmBtnStyle="danger"
          buttonDescription="확인"
          onClick={handleClick}
          close={close}
        />
      </div>
    </Modal>
  );
}
