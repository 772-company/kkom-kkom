import Button from "@/components/button/button";
import { BasicInput } from "@/components/input-field/basic-input";
import Modal from "@/components/modal/modal";
import { patchTaskListName } from "@/lib/apis/task-list";
import { GetGroupsIdResponse } from "@/lib/apis/type";
import { showToast } from "@/lib/show-toast";
import XIcon from "@/public/icons/x.svg";
import useLastConsonantLetterCheck from "@/utils/has-last-consonant-letter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

interface ModalTaskListNameEditProps {
  close: () => void;
  groupId: string;
  taskListId: number;
  currentTaskListName: string;
}

interface TaskListNameEditFormValue {
  taskListName: string;
}

function ModalTaskListNameEdit({
  close,
  groupId,
  taskListId,
  currentTaskListName,
}: ModalTaskListNameEditProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty },
  } = useForm<TaskListNameEditFormValue>({
    defaultValues: {
      taskListName: currentTaskListName,
    },
  });

  const taskListName = watch("taskListName");
  const suffix = useLastConsonantLetterCheck(taskListName) ? "으로" : "로";

  const editTaskListMutation = useMutation({
    mutationFn: (data: TaskListNameEditFormValue) =>
      patchTaskListName({
        groupId,
        taskListId,
        name: data.taskListName,
      }),

    onMutate: async (data: TaskListNameEditFormValue) => {
      await queryClient.cancelQueries({ queryKey: ["groupInfo", groupId] });

      const previousData = queryClient.getQueryData<GetGroupsIdResponse>([
        "groupInfo",
      ]);

      if (previousData) {
        queryClient.setQueryData<GetGroupsIdResponse>(["groupInfo"], {
          ...previousData,
          taskLists: previousData.taskLists.map((taskList) =>
            taskList.id === taskListId
              ? { ...taskList, name: data.taskListName }
              : taskList,
          ),
        });
      }
      return { previousData, taskListId };
    },
    onError: (error: unknown, data: TaskListNameEditFormValue, context) => {
      queryClient.setQueryData(["groupInfo"], context?.previousData);
      showToast(
        "error",
        error instanceof Error
          ? error.message
          : "목록 명 수정에 실패하였습니다.",
      );
    },
    onSuccess: (data) => {
      showToast(
        "success",
        data
          ? `${data.name}${suffix} 수정되었습니다.`
          : showToast("success", "수정되었습니다."),
      );
      close();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["groupInfo", groupId] });
    },
  });

  const onSubmit = (data: TaskListNameEditFormValue) => {
    editTaskListMutation.mutate(data);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-[24px]">
              <BasicInput<TaskListNameEditFormValue>
                id="taskListName"
                register={register}
                placeholder="목록 명을 입력해 주세요."
              />
              <Button
                btnSize="large"
                btnStyle="solid"
                disabled={!isDirty || editTaskListMutation.isPending}
              >
                {editTaskListMutation.isPending ? "수정 중..." : "수정하기"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default ModalTaskListNameEdit;
