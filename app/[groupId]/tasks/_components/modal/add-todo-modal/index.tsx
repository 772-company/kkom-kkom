import Button from "@/components/button/button";
import { BasicInput } from "@/components/input-field/basic-input";
import Modal from "@/components/modal/modal";
import { postTask } from "@/lib/apis/task";
import { convertDateToY_M_D } from "@/utils/convert-date";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import FrequencyDropdown from "./frequency-dropdown";
import TimeButton from "./time-button";
import TodoCalendarButton from "./todo-calendar-button";

interface AddTodoModalProps {
  taskListId: number | undefined;
  groupId: string;
  date: Date;
  close: () => void;
}

export interface TodoFormType {
  name: string;
  description: string;
  startDate: Date;
  frequencyType: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
  monthDay: number;
}

const AddTodoModal = ({
  groupId,
  taskListId,
  date,
  close,
}: AddTodoModalProps) => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (data: TodoFormType) =>
      postTask(groupId, taskListId ?? -1, data),
    onSuccess: () => {
      close();
      queryClient.invalidateQueries({
        queryKey: ["getTasks", taskListId, convertDateToY_M_D(date)],
      });
    },
  });

  const { control, handleSubmit, register } = useForm<TodoFormType>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      description: "",
      startDate: date,
      frequencyType: "ONCE",
    },
  });

  return (
    <Modal
      className="flex h-[930px] w-full flex-col items-center gap-4 overflow-y-auto overflow-x-clip p-[32px] sm:h-[80vh] md:w-[384px]"
      close={close}
      closeOnFocusOut
    >
      <header className="h-[69px] w-[227px] flex-col items-center justify-center gap-4">
        <Modal.Title className="text-[16px] font-medium text-text-primary">
          할 일 만들기
        </Modal.Title>
        <Modal.Description className="text-sm font-medium !text-text-default">
          할 일은 실제로 행동 가능한 작업 중심으로
          <br />
          작성해 주시면 좋습니다.
        </Modal.Description>
      </header>

      <div className="w-full">
        <BasicInput
          label="할 일 제목"
          placeholder="할 일 제목을 입력해주세요."
          id="name"
          isModal={true}
          register={register}
        />
      </div>

      <div className="flex h-[349px] w-[336px] flex-col gap-4">
        <label>시작 날짜 및 시간</label>
        <div className="flex h-[314px] w-[336px] flex-col gap-2">
          <div className="flex h-[48px] w-full">
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => <TodoCalendarButton field={field} />}
            />
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => <TimeButton field={field} />}
            />
          </div>
        </div>
      </div>

      <div className="flex h-[79px] w-full flex-col gap-4">
        <label className="text-base font-medium text-text-primary">
          반복설정
        </label>
        <Controller
          name="frequencyType"
          control={control}
          render={({ field }) => <FrequencyDropdown field={field} />}
        />
      </div>

      <div className="w-full">
        <BasicInput
          isModal={true}
          label="할 일 메모"
          placeholder="메모를 입력해주세요."
          id="description"
          className="h-[75px] w-[384px]"
          register={register}
        />
      </div>

      <Button
        disabled={isPending}
        onClick={handleSubmit((data) => {
          if (taskListId !== -1) {
            mutate(data);
          }
        })}
        type="button"
        btnSize="large"
        btnStyle="solid"
        className="mt-9 w-[336px]"
      >
        만들기
      </Button>
    </Modal>
  );
};

export default AddTodoModal;
