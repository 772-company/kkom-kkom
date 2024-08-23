import Modal from "@/components/modal/modal";
import { deleteRecurring } from "@/lib/apis/recurring";
import Alert from "@/public/icons/alert.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

interface DeleteTodoModalProps {
  groupId: string;
  taskListId: number | undefined;
  taskId: number;
  recurringId: number;
  title: string;
  close: () => void;
  closeSideBar?: () => void;
}
export default function DeleteTodoModal({
  groupId,
  taskListId,
  taskId,
  recurringId,
  title,
  close,
  closeSideBar,
}: DeleteTodoModalProps) {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: () =>
      deleteRecurring(groupId, taskListId ?? -1, taskId, recurringId),
    onSuccess: () => {
      if (closeSideBar) {
        closeSideBar();
      }
      close();
      queryClient.invalidateQueries({
        queryKey: ["getTasks", taskListId],
      });
    },
  });
  const handleClickRemoveTodo = () => {
    if (taskListId !== -1 || recurringId != -1) {
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
          disabled={isPending}
          onClick={handleClickRemoveTodo}
          buttonDescription="삭제하기"
        />
      </div>
    </Modal>
  );
}
