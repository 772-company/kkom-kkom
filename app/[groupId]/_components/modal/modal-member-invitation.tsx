"use client";

import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import { getGroupInvitation } from "@/lib/apis/group/index";
import { showToast } from "@/lib/show-toast";
import XIcon from "@/public/icons/x.svg";

interface ModalMemberInvitationProps {
  close: () => void;
  groupId: string;
}

const ModalMemberInvitation = ({
  close,
  groupId,
}: ModalMemberInvitationProps) => {
  const handleButtonClick = async () => {
    try {
      const result = await getGroupInvitation({ groupId: groupId });
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_PARTICIPATE_TEAM_REDIRECT_URL}?token=${result}`,
      );
      showToast("success", "링크가 복사되었습니다");
      close();
    } catch (error) {
      showToast("error", "링크 복사에 실패하였습니다");
    }
  };

  return (
    <Modal close={close} closeOnFocusOut>
      <div className="relative flex h-[163px] flex-col items-center justify-center gap-[8px]">
        <button className="absolute right-0 top-0" onClick={close}>
          <XIcon width={24} height={24} />
        </button>
        <div className="flex h-[131px] w-[280px] flex-col justify-center gap-[24px] pt-[32px]">
          <div className="flex flex-col items-center justify-center gap-[8px]">
            <Modal.Title>멤버 초대</Modal.Title>
            <Modal.Description>
              그룹에 참여할 수 있는 링크를 복사합니다.
            </Modal.Description>
          </div>

          <Button btnSize="large" btnStyle="solid" onClick={handleButtonClick}>
            링크 복사하기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalMemberInvitation;
