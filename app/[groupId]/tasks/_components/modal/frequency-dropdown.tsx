import { Dropdown } from "@/components/dropdown/dropdown";
import ToggleClose from "@/public/icons/toggle.svg";
import { covertFrequency } from "@/utils/convert-frequency";
import React, { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

interface FrequencyDropdownProps {
  field: ControllerRenderProps<TodoFormType, "frequencyType">;
}

interface TodoFormType {
  name: string;
  description: string;
  startDate: Date;
  frequencyType: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
  monthDay?: number;
  weekDays?: number[];
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

function FrequencyDropdown({ field }: FrequencyDropdownProps) {
  const [dropDown, setDropDown] = useState<string | null>(null);

  return (
    <div className="h-[40px] w-[109px]">
      <Dropdown
        selected={covertFrequency(dropDown)}
        setSelected={(value) => {
          setDropDown(value);
          field.onChange(value);
        }}
      >
        <Dropdown.Button
          type="button"
          className="flex h-[44px] w-[109px] items-center justify-center gap-2 rounded-xl bg-background-third text-sm font-medium text-text-default"
        >
          <ToggleClose
            width="24"
            height="24"
            className="h-6 w-6 group-hover:animate-pulse"
          />
        </Dropdown.Button>

        <Dropdown.Body className="mt-1 flex h-[160px] w-[109px] flex-col rounded-xl bg-background-third">
          {DROP_DOWN_OPTIONS.map(({ display, value }) => (
            <Dropdown.Item
              key={value}
              className="flex h-[40px] w-[109px] cursor-pointer items-center px-[16px] py-[11px] text-text-primary"
              value={value}
            >
              {display}
            </Dropdown.Item>
          ))}
        </Dropdown.Body>
      </Dropdown>
    </div>
  );
}

export default FrequencyDropdown;
