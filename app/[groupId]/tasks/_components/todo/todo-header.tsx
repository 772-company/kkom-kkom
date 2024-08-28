import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { GetGroupsIdResponse } from "@/lib/apis/type";
import { getUser } from "@/lib/apis/user";
import Calendar from "@/public/icons/calendar.svg";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import React, { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../calendar-style/custom-date-picker.css";
import AddListModal from "../modal/add-List-modal";
import TaskButton from "../tasks-button";

type Members = GetGroupsIdResponse["members"];
interface TodoHeaderUIProps {
  groupId: string;
  members: Members;
  date: Date;
  convertedDate: string;
  onChangeDate: (date: Date | null) => void;
  onClickButton: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function TodoHeader({
  groupId,
  date,
  members,
  convertedDate,
  onChangeDate,
  onClickButton,
}: TodoHeaderUIProps) {
  const { data: user } = useQuery({ queryKey: ["getUser"], queryFn: getUser });
  const adminMemberId = members.find(
    (member) => member.role === "ADMIN",
  )?.userId;

  const isAdmin =
    adminMemberId === user?.id &&
    adminMemberId !== undefined &&
    user?.id !== undefined;

  const { theme } = useTheme();
  const addListModalOverlay = useCustomOverlay(({ close }) => (
    <AddListModal close={close} groupId={groupId} />
  ));
  const handleClickAddList = () => {
    addListModalOverlay.open();
  };
  const datePickerRef = useRef<DatePicker | null>(null);
  const handleClickCalendar = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setFocus();
    }
  };

  return (
    <div className="mt-6 flex justify-between">
      <div className="flex items-center">
        <h2 className="inline-block h-6 w-28 text-text-primary">
          {convertedDate}
        </h2>
        <div className="flex h-3 items-center gap-1">
          <TaskButton types="arrow" name="left" onClick={onClickButton} />
          <TaskButton types="arrow" name="right" onClick={onClickButton} />
          <button
            aria-label="calendar"
            type="button"
            onClick={handleClickCalendar}
            className="relative flex h-6 w-6 items-center justify-center rounded-full bg-background-secondary"
          >
            <Calendar width={12} height={12} />
          </button>
          <DatePicker
            className="h-0 w-0"
            selected={date}
            onChange={onChangeDate}
            ref={datePickerRef}
            calendarClassName={
              theme === "dark" ? "customDarkModal" : "customLightModal"
            }
          />
        </div>
      </div>
      {isAdmin && (
        <button
          type="button"
          className="text-sm font-normal text-brand-primary"
          onClick={handleClickAddList}
        >
          + 새로운 목록 추가하기
        </button>
      )}
    </div>
  );
}

export default TodoHeader;
