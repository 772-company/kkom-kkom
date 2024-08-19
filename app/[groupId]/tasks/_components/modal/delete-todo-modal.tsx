import Modal from "@/components/modal/modal";
import Alert from "@/public/icons/alert.svg";
import React from "react";

interface DeleteTodoModalProps {
  title: string;
  close: () => void;
}
const DeleteTodoModal = ({ title, close }: DeleteTodoModalProps) => {
  const handleClickRemoveTodo = () => {};
  return (
    <Modal
      closeOnFocusOut
      close={close}
      className="flex h-[247px] w-[384px] items-center justify-center"
    >
      <div className="flex h-[199px] w-[352px] flex-col items-center justify-center gap-6">
        <div>
          <Alert width={24} height={24} />
        </div>
        <Modal.Title>
          &apos;{title}&apos;
          <br />할 일을 정말 삭제하시겠어요?
        </Modal.Title>
        <Modal.Description>삭제 후에는 되돌릴 수 없습니다.</Modal.Description>
        <Modal.TwoButtonSection
          closeBtnStyle="outlined_secondary"
          confirmBtnStyle="danger"
          close={close}
          onClick={handleClickRemoveTodo}
          buttonDescription="삭제하기"
        />
      </div>
    </Modal>
  );
};

export default DeleteTodoModal;
