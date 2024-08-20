import Modal from "@/components/modal/modal";
import { deleteTaskList } from "@/lib/apis/task-list";
import { showToast } from "@/lib/show-toast";
import AlertIcon from "@/public/icons/alert.svg";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";

interface ModalTaskListDeleteProps {
  close: () => void;
  groupId: string;
  taskListName: string;
  taskListId: number;
}

const ModalTaskListDelete = ({
  close,
  groupId,
  taskListName,
  taskListId,
}: ModalTaskListDeleteProps) => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () => deleteTaskList({ groupId, taskListId }),
    onSuccess: () => {
      showToast("success", `${taskListName}이 삭제되었습니다.`);
      close();
      router.refresh();
    },
    onError: () => {
      showToast("error", <p>{taskListName} 삭제에 실패하였습니다.</p>);
    },
  });

  const handleButtonClick = () => {
    mutation.mutate();
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
            buttonDescription={mutation.isPending ? "삭제 중..." : "삭제하기"}
            disabled={mutation.isPending}
            close={close}
            onClick={handleButtonClick}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalTaskListDelete;
