import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import { showToast } from "@/lib/show-toast";
import XIcon from "@/public/icons/x.svg";

interface ModalMemberAddProps {
  close: () => void;
}

const ModalMemberAdd = ({ close }: ModalMemberAddProps) => {
  const handleButtonClick = () => {
    showToast("success", "링크가 복사되었습니다");
    close();
  };

  return (
    <Modal close={close} closeOnFocusOut>
      <div className="relative flex h-[211px] flex-col items-center justify-center gap-[8px] p-[16px] pt-[32px]">
        <button className="absolute right-0 top-0" onClick={close}>
          <XIcon width={24} height={24} />
        </button>
        <div className="flex w-full flex-col justify-center gap-[24px]">
          <Modal.Title>멤버 초대</Modal.Title>
          <Modal.Description>
            그룹에 참여할 수 있는 링크를 복사합니다.
          </Modal.Description>
          <Button btnSize="large" btnStyle="solid" onClick={handleButtonClick}>
            링크 복사하기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalMemberAdd;
