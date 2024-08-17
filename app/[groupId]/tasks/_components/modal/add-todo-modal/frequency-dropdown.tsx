import { Dropdown } from "@/components/dropdown/dropdown";
import ToggleClose from "@/public/icons/toggle.svg";
import React, { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

import { TodoFormType } from ".";

interface FrequencyDropdownProps {
  field: ControllerRenderProps<TodoFormType, "frequencyType">;
}

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

const FrequencyDropdown = ({ field }: FrequencyDropdownProps) => {
  const [dropDown, setDropDown] = useState<string | null>(null);

  const dropDownFrequencyConvert = (value: string | null) => {
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
  return (
    <div className="h-[40px] w-[109px]">
      <Dropdown
        selected={dropDownFrequencyConvert(dropDown)}
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
    </div>
  );
};

export default FrequencyDropdown;
