"use client";

import { Dropdown } from "@/components/dropdown/dropdown";
import { useSortStore } from "@/providers/sort-store-provider";
import ToggleClose from "@/public/icons/toggle.svg";

import ResetButton from "./reset-button";

const options: { display: "최신순" | "인기순"; value: "recent" | "like" }[] = [
  {
    display: "최신순",
    value: "recent",
  },
  {
    display: "인기순",
    value: "like",
  },
];

export default function OrderedBySelector() {
  const setOrderBy = useSortStore((state) => state.setOrderBy);
  const setPage = useSortStore((state) => state.setPage);
  const orderBy = useSortStore((state) => state.orderBy);

  return (
    <Dropdown
      selected={orderBy === "like" ? "인기순" : "최신순"}
      setSelected={(value: string) => setOrderBy(value as "like" | "recent")}
    >
      <section className="flex gap-4">
        <ResetButton
          btnSize="large"
          btnStyle="outlined_secondary"
          className="h-10 w-20 text-xs md:h-11 md:w-[110px] md:text-sm"
        />
        <section className="text-xs md:text-sm">
          <Dropdown.Button className="h-10 !w-[94px] justify-between rounded-xl bg-background-tertiary px-[14px] md:h-11 md:!w-[120px]">
            <ToggleClose
              width="24"
              height="24"
              className={`h-6 w-6 group-hover:animate-pulse`}
            />
          </Dropdown.Button>
          <Dropdown.Body className="mt-1 flex w-[94px] flex-col rounded-xl bg-background-tertiary md:w-[120px]">
            {options.map((option, i) => (
              <Dropdown.Item
                key={i}
                className={`h-10 w-[94px] border-b border-text-default first:rounded-t-xl last:rounded-b-xl last:border-b-0 hover:text-[#41ff30] hover:underline md:h-11 md:w-[120px] ${orderBy === option.value ? "text-[#41ff30]" : orderBy === null && i === 0 ? "text-[#41ff30]" : ""}`}
                value={option.value}
              >
                <button
                  className="flex h-full w-full items-center justify-between px-[14px]"
                  type="button"
                >
                  {option.display}
                </button>
              </Dropdown.Item>
            ))}
          </Dropdown.Body>
        </section>
      </section>
    </Dropdown>
  );
}
