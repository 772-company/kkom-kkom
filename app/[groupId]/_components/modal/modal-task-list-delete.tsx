import Modal from "@/components/modal/modal";
import { showToast } from "@/lib/show-toast";
import AlertIcon from "@/public/icons/alert.svg";

interface ModalTaskListDeleteProps {
  close: () => void;
  taskListName: string;
}

const ModalTaskListDelete = ({
  close,
  taskListName,
}: ModalTaskListDeleteProps) => {
  const handleButtonClick = () => {
    showToast("success", <p>{taskListName}이 삭제되었습니다</p>);
    close();
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
