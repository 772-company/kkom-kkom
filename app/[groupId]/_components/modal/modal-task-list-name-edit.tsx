import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import { showToast } from "@/lib/show-toast";
import XIcon from "@/public/icons/x.svg";
import { ChangeEvent, useState } from "react";

interface ModalTaskListNameEditProps {
  close: () => void;
}

const ModalTaskListNameEdit = ({ close }: ModalTaskListNameEditProps) => {
  const [taskListName, setTaskListName] = useState("");

  const handleButtonClick = () => {
    showToast("success", <p>{taskListName}으로 수정되었습니다</p>);
    close();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskListName(e.target.value);
  };

  return (
    <Modal close={close} closeOnFocusOut>
      <div className="relative flex h-[187px] flex-col items-center justify-center gap-[8px]">
        <button className="absolute right-0 top-0" onClick={close}>
          <XIcon width={24} height={24} />
        </button>
        <div className="flex h-[155px] w-[280px] flex-col justify-center gap-[24px] pt-[32px]">
          <Modal.Title>할 일 목록</Modal.Title>
          <input
            className="rounded-xl border border-border-primary border-opacity-10 bg-background-secondary px-4 py-[13.5px] text-base font-normal text-text-primary placeholder:text-sm placeholder:font-normal placeholder:text-text-default focus:border-2 focus:outline-none"
            placeholder="목록 명을 입력해 주세요"
            value={taskListName}
            onChange={handleInputChange}
          />
          <Button
            btnSize="large"
            btnStyle="solid"
            onClick={handleButtonClick}
            disabled={!taskListName.trim()}
          >
            수정하기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalTaskListNameEdit;
