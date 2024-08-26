import Button from "@/components/button/button";
import { BasicInput } from "@/components/input-field/basic-input";
import Modal from "@/components/modal/modal";
import usePostTask from "@/lib/apis/task/hooks/use-post-task";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import DayButton from "../day-button";
import FrequencyDropdown from "../frequency-dropdown";
import TodoCalendarButton from "../todo-calendar-button";

interface AddTodoModalProps {
  taskListId: number | undefined;
  groupId: string;
  date: Date;
  close: () => void;
}

interface TodoFormType {
  name: string;
  description: string;
  startDate: Date;
  frequencyType: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
  monthDay?: number;
  weekDays?: number[];
}

const REPEAT_ARRAY = [
  { name: "월", value: 1 },
  { name: "화", value: 2 },
  { name: "수", value: 3 },
  { name: "목", value: 4 },
  { name: "금", value: 5 },
  { name: "토", value: 6 },
  { name: "일", value: 0 },
];

function AddTodoModal({ groupId, taskListId, date, close }: AddTodoModalProps) {
  const { isPending, mutate } = usePostTask(groupId, taskListId, close);

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
  const formData = watch("frequencyType");
  const serveData = (data: TodoFormType) => {
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
      className="md:h-[930px]w-[384px] flex h-[90vh] w-full flex-col items-center gap-4 overflow-y-auto overflow-x-clip p-[32px]"
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
            isModal
            register={register}
          />
          {errors.name?.message}
        </div>

        <div className="mt-2 flex h-[300px] w-full flex-col gap-4">
          <p className="text-text-primary">시작 날짜 및 시간</p>
          <div className="h-[258px]">
            <div className="flex h-[48px]">
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => <TodoCalendarButton field={field} />}
              />
            </div>
          </div>
        </div>

        <div className="mt-[30px] flex h-[79px] w-full flex-col gap-4">
          <div className="text-base font-medium text-text-primary">
            반복설정
          </div>
          <Controller
            name="frequencyType"
            control={control}
            render={({ field }) => <FrequencyDropdown field={field} />}
          />
        </div>
        {formData === "MONTHLY" && (
          <div className="mt-5 flex h-[100px] w-full flex-col gap-3">
            <p className="text-text-primary">반복 일</p>

            <input
              onCompositionStart={(e: any) => {
                e.target.blur();
                requestAnimationFrame(() => {
                  e.target.focus();
                });
              }}
              className="h-[50px] w-[50px] rounded-[12px] bg-background-third text-center text-sm font-medium text-text-default"
              type="number"
              min="1"
              max="31"
              maxLength={2}
              {...register("monthDay", {
                required: "반복일을 입력해 주세요",
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = parseInt(e.target.value, 10);
                  if (value < 1) {
                    e.target.value = "1";
                  } else if (value > 31) {
                    e.target.value = "31";
                  }
                },
              })}
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "+" || e.key === ".") {
                  e.preventDefault();
                }
              }}
              placeholder="Day"
            />
            <p className="text-text-primary">{errors.monthDay?.message}</p>
          </div>
        )}
        {formData === "WEEKLY" && (
          <div className="mt-5 flex h-[100px] w-full flex-col gap-3">
            <p className="text-text-primary">반복 요일</p>

            <div className="flex gap-2">
              {REPEAT_ARRAY.map((e) => (
                <Controller
                  key={e.value}
                  control={control}
                  name="weekDays"
                  rules={{
                    validate: (value) => {
                      if (typeof value !== "undefined" && value.length < 2) {
                        return "2개이상 요일을 선택 해주세요";
                      }
                      return undefined;
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

        <div className="mt-7 w-full">
          <BasicInput
            isModal
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
          className="mx-auto mt-9 w-[336px]"
        >
          만들기
        </Button>
      </form>
    </Modal>
  );
}

export default AddTodoModal;
