import Button from "@/components/button/button";
import { BasicInput } from "@/components/input-field/basic-input";
import Modal from "@/components/modal/modal";
import useEditTask from "@/lib/apis/task/hooks/use-edit-task";
import React from "react";
import { useForm } from "react-hook-form";

interface EidtTodoModalProps {
  groupId: string;
  taskListId: number | undefined;
  taskId: number;
  title: string;
  description: string;
  date: Date;
  close: () => void;
}

export interface TodoFormType {
  name: string;
  description: string;
}

export default function EditTodoModal({
  groupId,
  taskListId,
  taskId,
  date,
  title,
  description: descriptionValue,
  close,
}: EidtTodoModalProps) {
  const { mutate, isPending } = useEditTask(
    date,
    groupId,
    taskListId,
    taskId,

    close,
  );
  const {
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TodoFormType>({
    mode: "onSubmit",
    defaultValues: {
      name: title,
      description: descriptionValue,
    },
  });
  const formData = watch();

  const serveData = (data: TodoFormType) => {
    if (taskId !== -1) {
      mutate(data);
    }
  };

  return (
    <Modal
      className="flex h-[930px] w-full flex-col items-center gap-4 overflow-y-auto overflow-x-clip p-[32px] sm:h-[80vh] md:w-[384px]"
      close={close}
      closeOnFocusOut
    >
      <header className="h-[69px] w-[227px] flex-col items-center justify-center gap-4">
        <Modal.Title className="text-[16px] font-medium text-text-primary">
          할 일 수정하기
        </Modal.Title>
        <Modal.Description className="text-sm font-medium !text-text-default">
          할 일은 실제로 행동 가능한 작업 중심으로
          <br />
          작성해 주시면 좋습니다.
        </Modal.Description>
      </header>

      <form onSubmit={handleSubmit(serveData)}>
        <div className="w-full">
          <BasicInput
            label="할 일 제목"
            placeholder="할 일 제목을 입력해주세요."
            id="name"
            register={register}
          />
          {errors.name?.message}
        </div>

        <div className="mt-7 w-full">
          <BasicInput
            label="할 일 메모"
            placeholder="메모를 입력해주세요."
            id="description"
            className="h-[75px] w-[384px]"
            register={register}
          />
        </div>

        <Button
          disabled={
            (title === formData.name &&
              descriptionValue === formData.description) ||
            isPending
          }
          type="submit"
          btnSize="large"
          btnStyle="solid"
          className="mx-auto mt-9 w-[336px]"
        >
          수정하기
        </Button>
      </form>
    </Modal>
  );
}
