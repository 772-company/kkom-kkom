import Modal from "@/components/modal/modal";
import { deleteTaskList } from "@/lib/apis/task-list";
import { showToast } from "@/lib/show-toast";
import AlertIcon from "@/public/icons/alert.svg";
import { useRouter } from "next/navigation";

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

  const handleButtonClick = async () => {
    try {
      await deleteTaskList({ groupId, taskListId });
      showToast("success", <p>{taskListName}이 삭제되었습니다.</p>);
      close();
      router.refresh();
    } catch (error) {
      showToast("error", <p>{taskListName} 삭제에 실패하였습니다.</p>);
    }
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
            buttonDescription="삭제하기"
            close={close}
            onClick={handleButtonClick}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalTaskListDelete;
