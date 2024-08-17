import Button from "@/components/button/button";
import { Dropdown } from "@/components/dropdown/dropdown";
import { BasicInput } from "@/components/input-field/basic-input";
import Modal from "@/components/modal/modal";
import { postTask } from "@/lib/apis/task";
import ToggleClose from "@/public/icons/toggle.svg";
import { convertDateToY_M_D } from "@/utils/convert-date";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ko } from "date-fns/locale";
import React, { forwardRef, useEffect, useState } from "react";
import { ButtonHTMLAttributes, DOMAttributes } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";

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
  frequencyType: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY" | "";
  monthDay: number;
}

type ExampleCustomInputProps = DOMAttributes<HTMLButtonElement> &
  ButtonHTMLAttributes<HTMLButtonElement>;
type DropDownOptionsType = {
  display: string;
  value: TodoFormType["frequencyType"];
};
const DROP_DOWN_OPTIONS: DropDownOptionsType[] = [
  { display: "한 번", value: "ONCE" },
  { display: "매일", value: "DAILY" },
  { display: "주 반복", value: "WEEKLY" },
  { display: "월 반복", value: "MONTHLY" },
];
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
      frequencyType: "",
    },
  });
  const [dropDown, setDropDown] = useState<string | null>(null);
  const ExampleCustomInput = forwardRef<
    HTMLButtonElement,
    ExampleCustomInputProps
  >(({ value, onClick, className }, ref) => (
    <Button
      type="button"
      btnSize="large"
      btnStyle="outlined"
      className={className}
      onClick={onClick}
    >
      {value}
    </Button>
  ));
  ExampleCustomInput.displayName = "ExampleCustomInput";
  const dropDownConvert = (value: string | null) => {
    switch (value) {
      case "ONCE":
        return "한 번";

      case "DAILY":
        return "매일";

      case "WEEKLY":
        return "주 반복";

      case "MONTHLY":
        return "월 반복";

      default:
        return "반복 안함";
    }
  };
  const ExampleCustomInput2 = forwardRef<
    HTMLButtonElement,
    ExampleCustomInputProps
  >(({ value, onClick, className }, ref) => (
    <Button
      type="button"
      btnSize="large"
      btnStyle="outlined"
      className={className}
      onClick={onClick}
    >
      {value}
    </Button>
  ));
  ExampleCustomInput2.displayName = "ExampleCustomInput2";
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
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => {
                    if (date) {
                      field.onChange(date);
                    }
                  }}
                  calendarClassName="mt-1"
                  dateFormat="yyyy년 MM월 dd일"
                  customInput={
                    <ExampleCustomInput className="mr-2 h-[48px] w-[204px] bg-background-secondary text-text-default" />
                  }
                />
              )}
            />
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => {
                    if (date) {
                      field.onChange(date);
                    }
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  locale={ko}
                  dateFormat="aa h:mm "
                  customInput={
                    <ExampleCustomInput2 className="h-[48px] w-[124px] bg-background-secondary text-text-default" />
                  }
                />
              )}
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
          render={({ field }) => (
            <Dropdown
              selected={dropDownConvert(dropDown)}
              setSelected={(value) => {
                setDropDown(value);
                field.onChange(value);
              }}
            >
              <Dropdown.Button className="flex h-[44px] w-[109px] items-center justify-center gap-2 rounded-xl bg-[#18212F] text-sm font-medium text-text-default">
                <ToggleClose
                  width="24"
                  height="24"
                  className={`h-6 w-6 group-hover:animate-pulse`}
                />
              </Dropdown.Button>
              <Dropdown.Body className="mt-1 flex h-[160px] w-[109px] flex-col rounded-xl bg-[#18212F]">
                {DROP_DOWN_OPTIONS.map(({ display, value }, i) => (
                  <Dropdown.Item
                    key={i}
                    className="flex h-[40px] w-[109px] cursor-pointer items-center px-[16px] py-[11px]"
                    value={value}
                  >
                    {display}
                  </Dropdown.Item>
                ))}
              </Dropdown.Body>
            </Dropdown>
          )}
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
