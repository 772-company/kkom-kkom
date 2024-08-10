import Calendar from "@/public/icons/calendar.svg";
import Comment from "@/public/icons/comment.svg";
import Kebab from "@/public/icons/kebab-small.svg";
import Repeat from "@/public/icons/repeat.svg";
import Time from "@/public/icons/time.svg";
import { convertDateToYMD } from "@/utils/convert-date";
import classNames from "classnames";
import React from "react";

import CheckBox from "../check-box";

interface TodoBoxProps {
  id: number;
  commentCount: number;
  dateString: string;
  title: string;
  isdone: boolean;
  handleClickTodoBox: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const TodoBox = ({
  id,
  commentCount,
  title,
  isdone,
  handleClickTodoBox,
  dateString,
}: TodoBoxProps) => {
  const { year, month, day } = convertDateToYMD(new Date(dateString));

  return (
    <div
      data-index={id}
      onClick={handleClickTodoBox}
      className="flex h-[74px] cursor-pointer flex-col justify-center rounded-lg bg-background-secondary px-3"
    >
      <div className="ml-1 flex justify-between">
        <div className="flex items-center gap-3">
          <CheckBox isActive={isdone} />
          <p
            className={`text-text-primary ${isdone ? "line-through" : ""} text-sm font-normal`}
          >
            {title}
          </p>
          <div className="flex items-center">
            <Comment width={16} height={16} />
            <p className="text-xs font-normal text-text-default">
              {commentCount}
            </p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log("test");
          }}
        >
          <Kebab width={16} height={16} />
        </button>
      </div>
      <div className="flex items-center gap-[10px]">
        <Calendar width={16} height={16} />
        <p className="text-xs text-text-default">
          {year}년 {month}월 {day}일
        </p>
        <Time width={16} height={16} />
        <p className="text-xs text-text-default">오후 3:30</p>
        <Repeat width={16} height={16} />
        <p className="text-xs text-text-default">매일 반복</p>
      </div>
    </div>
  );
};

export default TodoBox;
