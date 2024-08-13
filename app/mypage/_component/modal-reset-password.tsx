import Modal from "@/components/modal/modal";

interface ModalResetPasswordProps {
  close: () => void;
}
export default function ModalResetPassword({ close }: ModalResetPasswordProps) {
  return (
    <Modal close={close} closeOnFocusOut>
      <Modal.Title>비밀번호 변경하기</Modal.Title>
    </Modal>
  );
}
