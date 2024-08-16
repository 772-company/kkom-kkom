import Modal from "@/components/modal/modal";
import { deleteAccount } from "@/lib/apis/user";
import { showToast } from "@/lib/show-toast";
import Alert from "@/public/icons/alert.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ModalWarningProps {
  close: () => void;
}

/**
 * 경고 이미지를 포함하는 모달 컴포넌트입니다.
 *
 * @author 이승현
 * @param handleConfirm 확인 버튼을 눌렀을 때 실행할 함수
 */
export function ModalSecession({ close }: ModalWarningProps) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: () => deleteAccount(),
    onMutate: () => {
      showToast("loading", "탈퇴 처리 중입니다.", {
        toastId: "deleteAccount",
      });
      close();
    },
    onSuccess: () => {
      router.push("/");
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      router.refresh();
      toast.update("deleteAccount", {
        render: "탈퇴되었습니다.",
        type: "success",
        isLoading: false,
        hideProgressBar: false,
        autoClose: 1000,
      });
    },
    onError: (response) => {
      showToast("error", <p>{response.message}</p>);
    },
  });
  const handleClick = async () => {
    mutation.mutate();
  };

  return (
    <Modal close={close} closeOnFocusOut>
      <header className="flex justify-center pb-4 pt-6">
        <Alert width={24} height={24} />
      </header>
      <div className="mx-12 text-center md:mx-9">
        <Modal.Title className="mb-2 text-slate-50 md:text-text-primary">
          회원 탈퇴를 진행하시겠어요?
        </Modal.Title>
        <Modal.Description className="mb-4">
          그룹장에 있는 모든 그룹은 삭제되고,
          <br /> 모든 그룹에서 나가집니다.
        </Modal.Description>
        <Modal.TwoButtonSection
          closeBtnStyle="outlined_secondary"
          confirmBtnStyle="danger"
          buttonDescription="회원 탈퇴"
          onClick={handleClick}
          close={close}
          disabled={mutation.isPending}
        />
      </div>
    </Modal>
  );
}
