import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import { postTaskList } from "@/lib/apis/task-list";
import { GetGroupsIdResponse } from "@/lib/apis/type";
import { showToast } from "@/lib/show-toast";
import XIcon from "@/public/icons/x.svg";
import useLastConsonantLetterCheck from "@/utils/has-last-consonant-letter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

interface ModalTaskListAddProps {
  close: () => void;
  groupId: string;
}

function ModalTaskListAdd({ close, groupId }: ModalTaskListAddProps) {
  const [taskListName, setTaskListName] = useState("");
  const suffix = useLastConsonantLetterCheck(taskListName) ? "을" : "를";
  const queryClient = useQueryClient();

  const addTaskListMutation = useMutation({
    mutationFn: (newTaskList: { name: string }) =>
      postTaskList(groupId, newTaskList),
    onMutate: async (newTaskList) => {
      await queryClient.cancelQueries({ queryKey: ["groupInfo"] });
      const previousData = queryClient.getQueryData<GetGroupsIdResponse>([
        "groupInfo",
      ]);

      if (previousData) {
        queryClient.setQueriesData(
          { queryKey: ["groupInfo"] },
          {
            ...previousData,
            taskLists: [
              ...previousData.taskLists,
              {
                id: "temp-id",
                name: newTaskList.name,
                displayIndex: previousData.taskLists.length,
                tasks: [],
              },
            ],
          },
        );
      }
      return { previousData };
    },
    onError: (error, newTaskList, context) => {
      queryClient.setQueryData(["groupInfo"], context?.previousData);
      showToast(
        "error",
        error instanceof Error
          ? error.message
          : `${taskListName} 추가에 실패하였습니다`,
      );
    },
    onSuccess: () => {
      showToast("success", `${taskListName}${suffix} 추가하였습니다.`);
      close();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["groupInfo"] });
    },
  });

  const handleSubmit = () => {
    addTaskListMutation.mutate({ name: taskListName });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskListName(e.target.value);
  };

  return (
    <Modal close={close} closeOnFocusOut>
      <div className="relative flex h-[187px] flex-col items-center justify-center gap-[8px]">
        <button
          className="absolute right-0 top-0"
          onClick={close}
          aria-label="닫기"
          type="submit"
        >
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
            onClick={handleSubmit}
            disabled={!taskListName.trim() || addTaskListMutation.isPending}
          >
            {addTaskListMutation.isPending ? "추가 중..." : "추가하기"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalTaskListAdd;
