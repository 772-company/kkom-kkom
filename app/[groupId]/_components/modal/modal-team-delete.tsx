"use client";

import Modal from "@/components/modal/modal";
import { deleteGroup } from "@/lib/apis/group";
import { showToast } from "@/lib/show-toast";
import AlertIcon from "@/public/icons/alert.svg";
import useLastConsonantLetterCheck from "@/utils/has-last-consonant-letter";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";

interface ModalTeamDeleteProps {
  close: () => void;
  teamName: string;
  groupId: string;
}

function ModalTeamDelete({ close, teamName, groupId }: ModalTeamDeleteProps) {
  const router = useRouter();

  const suffix1 = useLastConsonantLetterCheck(teamName) ? "이" : "가";
  const suffix2 = useLastConsonantLetterCheck(teamName) ? "을" : "를";

  const mutation = useMutation({
    mutationFn: () => deleteGroup({ groupId }),
    onSuccess: () => {
      showToast("success", `${teamName}${suffix1} 삭제 되었습니다.`);
      close();
      router.push("/");
      router.refresh();
    },
    onError: () => {
      showToast("error", `${teamName} 삭제에 실패하였습니다.`);
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
          <Modal.Title>
            {teamName}
            {suffix2} 삭제하시겠어요?
          </Modal.Title>
        </div>

        <div className="w-[280px]">
          <Modal.TwoButtonSection
            closeBtnStyle="outlined_secondary"
            confirmBtnStyle="danger"
            buttonDescription={mutation.isPending ? "삭제 중..." : "삭제하기"}
            close={close}
            onClick={handleButtonClick}
            disabled={mutation.isPending}
          />
        </div>
      </div>
    </Modal>
  );
}

export default ModalTeamDelete;
