import Button from "@/components/button/button";
import { BasicInput } from "@/components/input-field/basic-input";
import Modal from "@/components/modal/modal";
import { postTask } from "@/lib/apis/task";
import usePostTask from "@/lib/apis/task/hooks/use-post-task";
import { convertDateToY_M_D } from "@/utils/convert-date";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import DayButton from "./day-button";
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
  monthDay?: number;
  weekDays?: number[];
}

const REPEAT_ARRAY = [
  { name: "월", value: 0 },
  { name: "화", value: 1 },
  { name: "수", value: 2 },
  { name: "목", value: 3 },
  { name: "금", value: 4 },
  { name: "토", value: 5 },
  { name: "일", value: 6 },
];

const AddTodoModal = ({
  groupId,
  taskListId,
  date,
  close,
}: AddTodoModalProps) => {
  const { isPending, mutate } = usePostTask(groupId, taskListId, date, close);

  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<TodoFormType>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      description: "",
      startDate: date,
      frequencyType: "ONCE",
      monthDay: 1,
      weekDays: [],
    },
  });
  const formData = watch();

  const serveData = (data: TodoFormType, event?: React.BaseSyntheticEvent) => {
    if (taskListId !== -1) {
      if (data.frequencyType === "MONTHLY") {
        const { weekDays, ...newData } = data;
        mutate(newData);
      } else if (data.frequencyType === "WEEKLY") {
        const { monthDay, ...newData } = data;
        mutate(newData);
      } else {
        const { monthDay, weekDays, ...newData } = data;
        mutate(newData);
      }
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
          할 일 만들기
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
            isModal={true}
            register={register}
            {...register("name", {
              required: "제목을 입력해주세요",
            })}
          />
          {errors.name?.message}
        </div>

        <div className="flex h-[349px] w-[336px] flex-col gap-4">
          <label className="mt-2">시작 날짜 및 시간</label>
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
        {formData.frequencyType === "MONTHLY" && (
          <div className="flex h-[100px] w-full flex-col gap-3">
            <label>반복 일</label>
          </div>
        )}
        {formData.frequencyType === "WEEKLY" && (
          <div className="flex h-[100px] w-full flex-col gap-3">
            <label>반복 요일</label>
            <div className="flex gap-2">
              {REPEAT_ARRAY.map((e, i) => (
                <Controller
                  key={i}
                  control={control}
                  name="weekDays"
                  rules={{
                    validate: (value) => {
                      if (typeof value !== "undefined" && value.length < 2) {
                        return "2개이상 요일을 선택 해주세요";
                      }
                      return;
                    },
                  }}
                  render={({ field }) => (
                    <DayButton name={e.name} value={e.value} field={field} />
                  )}
                />
              ))}
            </div>
            <p>{errors.weekDays?.message}</p>
          </div>
        )}

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
          type="submit"
          btnSize="large"
          btnStyle="solid"
          className="mt-9 w-[336px]"
        >
          만들기
        </Button>
      </form>
    </Modal>
  );
};

export default AddTodoModal;
