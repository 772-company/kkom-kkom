import CloseButton from "@/app/public/icons/x.svg";
import Button from "@/components/button/button";
import Modal, { useModal } from "@/components/modal/modal";

interface ModalErrorProps {
  description: string;
  close: () => void;
}

export function ModalError({ description, close }: ModalErrorProps) {
  return (
    <Modal close={close} closeOnFocusOut>
      <Modal.HeaderWithClose />
      <div className="mx-12 flex flex-col items-center text-center md:mx-[52px]">
        <Modal.Title>{description}</Modal.Title>
        <Modal.Description className="mb-4 mt-4">
          다시 시도해주세요.
        </Modal.Description>
        <Button
          btnStyle="danger"
          btnSize="large"
          onClick={close}
          className="w-full"
        >
          확인
        </Button>
      </div>
    </Modal>
  );
}
