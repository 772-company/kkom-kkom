import Alert from "@/app/public/icons/alert.svg";

import { TwoButtonSection } from "./components/two-button-section";
import { useModal } from "./modal";

interface ModalWarningProps {
  title: string;
  description: string;
  handleConfirm: () => void;
  buttonDescription: string;
}

/**
 * 경고 이미지를 포함하는 모달 컴포넌트입니다.
 * 
 * @author 이승현
 * @param title 모달의 제목
 * @param description 모달의 설명
 * @param handleConfirm 확인 버튼을 눌렀을 때 실행할 함수
 * @param buttonDescription 버튼의 설명
 * @returns
 * @example
 * ```tsx
 * <Modal button={<button>modalDanger 열기</button>}>
        <ModalWarning
          title="회원 탈퇴를 진행하시겠어요?"
          description="그룹장으로 있는 그룹은 자동으로 삭제되고, 모든 그룹에서 나가집니다."
          handleConfirm={() => console.log("회원 탈퇴")}
          buttonDescription="회원 탈퇴"
        />
      </Modal>
 * ```
 */
export function ModalWarning({
  title,
  description,
  handleConfirm,
  buttonDescription,
}: ModalWarningProps) {
  const { handleClose } = useModal();
  const handleClick = () => {
    handleConfirm();
    handleClose();
  };

  return (
    <>
      <header className="flex h-20 justify-center pt-10">
        <Alert width={24} height={24} />
      </header>
      <div className="mx-12 text-center md:mx-[52px]">
        <h2 className="mb-2 text-base font-medium text-slate-50 md:text-text-primary">
          {title}
        </h2>
        <h3 className="mb-4 break-keep text-sm font-medium text-text-secondary">
          {description}
        </h3>
        <TwoButtonSection
          btnStyle1="outlined_secondary"
          btnStyle2="danger"
          buttonDescription={buttonDescription}
          onClick={handleClick}
        />
      </div>
    </>
  );
}
