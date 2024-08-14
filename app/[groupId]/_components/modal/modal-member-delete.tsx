"use client";

import Modal from "@/components/modal/modal";
import { deleteTeamMember } from "@/lib/apis/group";
import { showToast } from "@/lib/show-toast";
import AlertIcon from "@/public/icons/alert.svg";
import { useRouter } from "next/navigation";

interface ModalMemberDeleteProps {
  close: () => void;
  groupId: string;
  memberUserId: number;
  userName: string;
}

const ModalMemberDelete = ({
  close,
  groupId,
  memberUserId,
  userName,
}: ModalMemberDeleteProps) => {
  const router = useRouter();

  const handleButtonClick = async () => {
    try {
      await deleteTeamMember({
        groupId: groupId,
        memberUserId: memberUserId,
      });
      showToast("success", <p>{userName}님이 삭제되었습니다.</p>);
      close();
      router.refresh();
    } catch (error) {
      showToast("error", <p>{userName}님 삭제에 실패하였습니다.</p>);
      console.log(error);
      console.error(error);
    }
  };

  return (
    <Modal close={close} closeOnFocusOut>
      <div className="flex h-[173px] flex-col items-center justify-center gap-[24px]">
        <div className="flex flex-col items-center gap-[16px]">
          <AlertIcon width={24} height={24} />
          <Modal.Title>{userName}님을 삭제하시겠어요?</Modal.Title>
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

export default ModalMemberDelete;
