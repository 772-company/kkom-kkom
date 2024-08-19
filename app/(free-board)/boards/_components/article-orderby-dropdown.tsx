"use client";

import { Dropdown } from "@/components/dropdown/dropdown";
import LinkWithProgress from "@/components/link-with-progress";
import { useProgress } from "@/hooks/use-progress";
import ToggleClose from "@/public/icons/toggle.svg";

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

interface ArticleOrderbyDropdownProps {
  searchParams: {
    orderBy?: "recent" | "like";
    page?: string;
    keyword?: string;
  };
}

export default function ArticleOrderbyDropdown({
  searchParams,
}: ArticleOrderbyDropdownProps) {
  const orderBy = searchParams.orderBy || "recent";
  const keyword = searchParams.keyword || "";
  const progress = useProgress();
  return (
    <Dropdown
      selected={orderBy === "like" ? "인기순" : "최신순"}
      setSelected={() => {}}
    >
      <section className="text-xs md:text-sm">
        <Dropdown.Button className="h-10 !w-[94px] justify-between rounded-xl bg-background-tertiary px-[14px] md:h-11 md:!w-[120px]">
          <ToggleClose
            width="24"
            height="24"
            className={`h-6 w-6 group-hover:animate-pulse`}
          />
        </Dropdown.Button>
        <Dropdown.Body className="!z-10 mt-1 flex w-[94px] flex-col rounded-xl bg-background-tertiary md:w-[120px]">
          {options.map((option, i) => (
            <Dropdown.Item
              key={i}
              className={`h-10 w-[94px] border-b border-text-default first:rounded-t-xl last:rounded-b-xl last:border-b-0 hover:text-brand-primary hover:underline md:h-11 md:w-[120px] ${orderBy === option.value ? "text-brand-primary" : orderBy === null && i === 0 ? "text-brand-primary" : ""}`}
              value={option.value}
            >
              <LinkWithProgress
                className="flex h-full w-full items-center justify-between px-[14px]"
                href={
                  `/boards?` +
                  new URLSearchParams({
                    orderBy: option.value,
                    page: "1",
                    keyword,
                  }).toString()
                }
              >
                {option.display}
              </LinkWithProgress>
            </Dropdown.Item>
          ))}
        </Dropdown.Body>
      </section>
    </Dropdown>
  );
}
