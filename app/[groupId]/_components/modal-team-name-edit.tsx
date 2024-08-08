import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import { showToast } from "@/lib/show-toast";
import XIcon from "@/public/icons/x.svg";
import { ChangeEvent, useState } from "react";

interface ModalTeamNameEditProps {
  close: () => void;
}

const ModalTeamNameEdit = ({ close }: ModalTeamNameEditProps) => {
  const [teamName, setTeamName] = useState("");

  const handleButtonClick = () => {
    showToast("success", <p>팀명이 수정되었습니다</p>);
    console.log(`${teamName}으로 수정됨`);
    close();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  };

  return (
    <Modal close={close} closeOnFocusOut>
      <div className="relative flex h-[235px] flex-col items-center justify-center gap-[8px] p-[16px] pt-[32px]">
        <button className="absolute right-0 top-0" onClick={close}>
          <XIcon width={24} height={24} />
        </button>
        <div className="flex w-full flex-col justify-center gap-[24px]">
          <Modal.Title>팀 이름</Modal.Title>
          <input
            className="rounded-xl border border-border-primary border-opacity-10 bg-background-secondary px-4 py-[13.5px] text-base font-normal text-text-primary placeholder:text-sm placeholder:font-normal placeholder:text-text-default focus:border-2 focus:outline-none"
            placeholder="팀 이름을 입력해 주세요"
            value={teamName}
            onChange={handleInputChange}
          />
          <Button
            btnSize="large"
            btnStyle="solid"
            onClick={handleButtonClick}
            disabled={!teamName.trim()}
          >
            수정하기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalTeamNameEdit;
