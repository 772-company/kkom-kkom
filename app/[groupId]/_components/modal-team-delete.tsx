import Modal from "@/components/modal/modal";
import { showToast } from "@/lib/show-toast";
import AlertIcon from "@/public/icons/alert.svg";

interface ModalTeamDeleteProps {
  close: () => void;
  teamName: string;
}

const ModalTeamDelete = ({ close, teamName }: ModalTeamDeleteProps) => {
  const handleButtonClick = () => {
    showToast("success", <p>{teamName}이 삭제되었습니다</p>);
    close();
  };

  return (
    <Modal close={close} closeOnFocusOut>
      <div className="flex w-full flex-col items-center justify-center gap-[24px] px-[25px] py-[15px]">
        <AlertIcon width={24} height={24} />
        <Modal.Title>{teamName}을 삭제하시겠어요?</Modal.Title>
        <Modal.TwoButtonSection
          closeBtnStyle="outlined_secondary"
          confirmBtnStyle="danger"
          buttonDescription="삭제하기"
          close={close}
          onClick={handleButtonClick}
        />
      </div>
    </Modal>
  );
};

export default ModalTeamDelete;
