import Modal from "@/components/modal/modal";
import { deleteRecurring } from "@/lib/apis/recurring";
import Alert from "@/public/icons/alert.svg";
import { convertDateToY_M_D } from "@/utils/convert-date";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import React from "react";

interface DeleteTodoModalProps {
  groupId: string;
  taskListId: number | undefined;
  taskId: number;
  recurringId: number;
  date: Date;
  title: string;
  close: () => void;
}
const DeleteTodoModal = ({
  date,
  groupId,
  taskListId,
  taskId,
  recurringId,
  title,
  close,
}: DeleteTodoModalProps) => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: () =>
      deleteRecurring(groupId, taskListId ?? -1, taskId, taskId),
    onSuccess: () => {
      close();

      queryClient.invalidateQueries({
        queryKey: ["getTasks", taskListId],
      });
    },
  });
  const handleClickRemoveTodo = () => {
    if (taskListId !== -1) {
      mutate();
    }
  };
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
