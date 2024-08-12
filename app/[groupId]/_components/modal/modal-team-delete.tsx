"use client";

import Modal from "@/components/modal/modal";
import { deleteGroup } from "@/lib/apis/group";
import { showToast } from "@/lib/show-toast";
import AlertIcon from "@/public/icons/alert.svg";
import { useRouter } from "next/navigation";

interface ModalTeamDeleteProps {
  close: () => void;
  teamName: string;
  groupId: string;
}

const ModalTeamDelete = ({
  close,
  teamName,
  groupId,
}: ModalTeamDeleteProps) => {
  const router = useRouter();

  const handleButtonClick = async () => {
    try {
      const response = await deleteGroup({
        groupId: groupId,
      });
      showToast("success", <p>{teamName}이 삭제되었습니다.</p>);

      close();
      router.push("/");
    } catch (error) {
      showToast("error", <p>{teamName} 삭제에 실패하였습니다.</p>);
      console.log(error);
      console.error(error);
    }
  };

  return (
    <Modal close={close} closeOnFocusOut>
      <div className="flex h-[173px] flex-col items-center justify-center gap-[24px]">
        <div className="flex flex-col items-center gap-[16px]">
          <AlertIcon width={24} height={24} />
          <Modal.Title>{teamName}을 삭제하시겠어요?</Modal.Title>
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

export default ModalTeamDelete;
