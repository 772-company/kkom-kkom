import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import { showToast } from "@/lib/show-toast";
import XIcon from "@/public/icons/x.svg";

interface ModalTeamDeleteProps {
  close: () => void;
  teamName: string;
}

const ModalTeamDelete = ({ close, teamName }: ModalTeamDeleteProps) => {
  const handleClick = () => {
    showToast("success", <p>{teamName}이 삭제되었습니다</p>);
    close();
  };

  return (
    <Modal close={close} closeOnFocusOut>
      <div className="relative flex h-[160px] w-full flex-col justify-center gap-[50px]">
        <button className="absolute right-0 top-0" onClick={close}>
          <XIcon width={24} height={24} />
        </button>
        <div className="flex w-full flex-col justify-center gap-[24px]">
          <Modal.Title>{teamName}을 삭제하시겠습니까?</Modal.Title>
          <Button btnSize="large" btnStyle="danger" onClick={handleClick}>
            삭제하기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalTeamDelete;
