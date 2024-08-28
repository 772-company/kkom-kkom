"use client";

import Modal from "@/components/modal/modal";
import { deleteTeamMember } from "@/lib/apis/group";
import { GetGroupsIdResponse } from "@/lib/apis/type";
import { getUser } from "@/lib/apis/user";
import { showToast } from "@/lib/show-toast";
import AlertIcon from "@/public/icons/alert.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";

interface ModalMemberDeleteProps {
  close: () => void;
  groupId: string;
  memberUserId: number;
  userName: string;
  teamName: string;
}

function ModalMemberDelete({
  close,
  groupId,
  memberUserId,
  userName,
  teamName,
}: ModalMemberDeleteProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ["getUser"], queryFn: getUser });
  const isMine = data?.id === memberUserId;
  const buttonMessage = isMine ? "탈퇴" : "삭제";

  const deleteMemberMutation = useMutation({
    mutationFn: () => deleteTeamMember({ groupId, memberUserId }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["groupInfo", groupId] });

      const previousData = queryClient.getQueryData<GetGroupsIdResponse>([
        "groupInfo",
      ]);

      if (previousData) {
        queryClient.setQueryData<GetGroupsIdResponse>(["groupInfo"], {
          ...previousData,
          members: previousData.members.filter(
            (member) => member.userId !== memberUserId,
          ),
        });
      }

      return { previousData, memberUserId };
    },
    // eslint-disable-next-line
    onError: (error, memberUserId, context) => {
      queryClient.setQueryData(["groupInfo"], context?.previousData);
      let message;
      if (error instanceof Error) {
        message = error.message;
      } else if (isMine) {
        message = `${teamName} 탈퇴에 실패하였습니다.`;
      } else {
        message = `${userName}님 삭제에 실패하였습니다.`;
      }
      showToast("error", message);
    },
    onSuccess: () => {
      showToast(
        "success",
        isMine
          ? `${teamName}에서 탈퇴하였습니다.`
          : `${userName}님이 삭제되었습니다.`,
      );
      close();
      if (isMine) {
        router.push("/");
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["groupInfo", groupId] });
    },
  });

  const handleButtonClick = () => {
    deleteMemberMutation.mutate();
  };

  return (
    <Modal close={close} closeOnFocusOut>
      <div className="flex h-[173px] flex-col items-center justify-center gap-[24px]">
        <div className="flex flex-col items-center gap-[16px]">
          <AlertIcon width={24} height={24} />
          {isMine ? (
            <Modal.Title>{teamName}에서 탈퇴하시겠습니까?</Modal.Title>
          ) : (
            <Modal.Title>{userName}님을 삭제하시겠어요?</Modal.Title>
          )}
        </div>

        <div className="w-[280px]">
          <Modal.TwoButtonSection
            closeBtnStyle="outlined_secondary"
            confirmBtnStyle="danger"
            buttonDescription={
              deleteMemberMutation.isPending
                ? `${buttonMessage} 중...`
                : `${buttonMessage}하기`
            }
            disabled={deleteMemberMutation.isPending}
            close={close}
            onClick={handleButtonClick}
          />
        </div>
      </div>
    </Modal>
  );
}

export default ModalMemberDelete;
