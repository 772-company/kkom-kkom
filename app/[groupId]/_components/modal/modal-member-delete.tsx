"use client";

import Modal from "@/components/modal/modal";
import { deleteTeamMember } from "@/lib/apis/group";
import { GetTeamIdGroupsIdResponse } from "@/lib/apis/type";
import { showToast } from "@/lib/show-toast";
import AlertIcon from "@/public/icons/alert.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  const deleteMemberMutation = useMutation({
    mutationFn: (memberUserId: number) =>
      deleteTeamMember({ groupId, memberUserId }),
    onMutate: async (memberUserId) => {
      await queryClient.cancelQueries({ queryKey: ["groupInfo"] });

      const previousData = queryClient.getQueryData<GetTeamIdGroupsIdResponse>([
        "groupInfo",
      ]);

      if (previousData) {
        queryClient.setQueryData<GetTeamIdGroupsIdResponse>(["groupInfo"], {
          ...previousData,
          members: previousData.members.filter(
            (member) => member.userId !== memberUserId,
          ),
        });
      }

      return { previousData, memberUserId };
    },
    onError: (error, memberUserId, context) => {
      queryClient.setQueryData(["groupInfo"], context?.previousData);
      showToast(
        "error",
        error instanceof Error
          ? error.message
          : `${userName}님 삭제에 실패하였습니다.`,
      );
    },
    onSuccess: () => {
      showToast("success", `${userName}님이 삭제되었습니다.`);
      close();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["groupInfo"] });
    },
  });

  const handleButtonClick = () => {
    deleteMemberMutation.mutate(memberUserId);
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
            buttonDescription={
              deleteMemberMutation.isPending ? "삭제 중..." : "삭제하기"
            }
            disabled={deleteMemberMutation.isPending}
            close={close}
            onClick={handleButtonClick}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalMemberDelete;
