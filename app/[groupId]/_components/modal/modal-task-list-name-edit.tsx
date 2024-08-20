import Button from "@/components/button/button";
import { BasicInput } from "@/components/input-field/basic-input";
import Modal from "@/components/modal/modal";
import { patchTaskListName } from "@/lib/apis/task-list";
import { showToast } from "@/lib/show-toast";
import XIcon from "@/public/icons/x.svg";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";
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

const ModalTaskListNameEdit = ({
  close,
  groupId,
  taskListId,
  currentTaskListName,
}: ModalTaskListNameEditProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<TaskListNameEditFormValue>({
    defaultValues: {
      taskListName: currentTaskListName,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: TaskListNameEditFormValue) =>
      patchTaskListName({
        groupId,
        taskListId,
        name: data.taskListName,
      }),
    onSuccess: (data) => {
      showToast(
        "success",
        data
          ? `${data.name}으로 수정되었습니다.`
          : showToast("success", "수정되었습니다."),
      );
      router.refresh();
      close();
    },
    onError: (error: unknown) => {
      showToast(
        "error",
        error instanceof Error ? error.message : "수정에 실패하였습니다.",
      );
    },
  });

  const onSubmit = (data: TaskListNameEditFormValue) => {
    mutation.mutate(data);
  };

  return (
    <Modal close={close} closeOnFocusOut>
      <div className="relative flex h-[187px] flex-col items-center justify-center gap-[8px]">
        <button className="absolute right-0 top-0" onClick={close}>
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
                disabled={!isDirty || mutation.isPending}
              >
                {mutation.isPending ? "수정 중..." : "수정하기"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ModalTaskListNameEdit;
