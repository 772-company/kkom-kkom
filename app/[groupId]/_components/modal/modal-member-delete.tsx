"use client";

import Modal from "@/components/modal/modal";
import { deleteTeamMember } from "@/lib/apis/group";
import { showToast } from "@/lib/show-toast";
import AlertIcon from "@/public/icons/alert.svg";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";

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

  const mutation = useMutation({
    mutationFn: () => deleteTeamMember({ groupId, memberUserId }),
    onSuccess: () => {
      showToast("success", `${userName}님이 삭제되었습니다.`);
      close();
      router.refresh();
    },
    onError: (error: unknown) => {
      console.log("error:", error);
      showToast(
        "error",
        error instanceof Error
          ? error.message
          : `${userName}님 삭제에 실패하였습니다`,
      );
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
          <Modal.Title>{userName}님을 삭제하시겠어요?</Modal.Title>
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

export default ModalMemberDelete;
