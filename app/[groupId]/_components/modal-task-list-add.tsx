import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import { showToast } from "@/lib/show-toast";
import XIcon from "@/public/icons/x.svg";
import { ChangeEvent, useState } from "react";

interface ModalTaskListAddProps {
  close: () => void;
}

const ModalTaskListAdd = ({ close }: ModalTaskListAddProps) => {
  const [taskList, setTaskList] = useState("");

  const handleButtonClick = () => {
    showToast("success", <p>{taskList}가 추가되었습니다</p>);
    close();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskList(e.target.value);
  };

  return (
    <Modal close={close} closeOnFocusOut>
      <div className="relative flex h-[235px] flex-col items-center justify-center gap-[8px] p-[16px] pt-[32px]">
        <button className="absolute right-0 top-0" onClick={close}>
          <XIcon width={24} height={24} />
        </button>
        <div className="flex w-full flex-col justify-center gap-[24px]">
          <Modal.Title>할 일 목록</Modal.Title>
          <input
            className="rounded-xl border border-border-primary border-opacity-10 bg-background-secondary px-4 py-[13.5px] text-base font-normal text-text-primary placeholder:text-sm placeholder:font-normal placeholder:text-text-default focus:border-2 focus:outline-none"
            placeholder="목록 명을 입력해 주세요"
            value={taskList}
            onChange={handleInputChange}
          />
          <Button
            btnSize="large"
            btnStyle="solid"
            onClick={handleButtonClick}
            disabled={!taskList.trim()}
          >
            추가하기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalTaskListAdd;
