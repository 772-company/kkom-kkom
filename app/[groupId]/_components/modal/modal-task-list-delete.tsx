import Modal from "@/components/modal/modal";
import { deleteTaskList } from "@/lib/apis/task-list";
import { GetGroupsIdResponse } from "@/lib/apis/type";
import { showToast } from "@/lib/show-toast";
import AlertIcon from "@/public/icons/alert.svg";
import useLastConsonantLetterCheck from "@/utils/has-last-consonant-letter";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ModalTaskListDeleteProps {
  close: () => void;
  groupId: string;
  taskListName: string;
  taskListId: number;
}

function ModalTaskListDelete({
  close,
  groupId,
  taskListName,
  taskListId,
}: ModalTaskListDeleteProps) {
  const queryClient = useQueryClient();
  const suffix = useLastConsonantLetterCheck(taskListName) ? "이" : "가";

  const deleteTaskListMutation = useMutation({
    mutationFn: (deleteTaskListId: number) =>
      deleteTaskList({ groupId, taskListId: deleteTaskListId }),
    onMutate: async (deleteTaskListId) => {
      await queryClient.cancelQueries({ queryKey: ["groupInfo", groupId] });

      const previousData = queryClient.getQueryData<GetGroupsIdResponse>([
        "groupInfo",
      ]);

      if (previousData) {
        queryClient.setQueryData<GetGroupsIdResponse>(["groupInfo"], {
          ...previousData,
          taskLists: previousData.taskLists.filter(
            (taskList) => taskList.id !== deleteTaskListId,
          ),
        });
      }

      return { previousData, deleteTaskListId };
    },
    onError: (error, deleteTaskListId, context) => {
      queryClient.setQueryData(["groupInfo"], context?.previousData);
      showToast("error", <p>{taskListName} 삭제에 실패하였습니다.</p>);
    },
    onSuccess: () => {
      showToast("success", `${taskListName}${suffix} 삭제되었습니다.`);
      close();
    },
  });

  const handleButtonClick = () => {
    deleteTaskListMutation.mutate(taskListId);
  };

  return (
    <Modal close={close} closeOnFocusOut>
      <div className="flex h-[173px] flex-col items-center justify-center gap-[24px]">
        <div className="flex flex-col items-center gap-[16px]">
          <AlertIcon width={24} height={24} />
          <Modal.Title>{taskListName}을 삭제하시겠어요?</Modal.Title>
        </div>

        <div className="w-[280px]">
          <Modal.TwoButtonSection
            closeBtnStyle="outlined_secondary"
            confirmBtnStyle="danger"
            buttonDescription={
              deleteTaskListMutation.isPending ? "삭제 중..." : "삭제하기"
            }
            disabled={deleteTaskListMutation.isPending}
            close={close}
            onClick={handleButtonClick}
          />
        </div>
      </div>
    </Modal>
  );
}

export default ModalTaskListDelete;
