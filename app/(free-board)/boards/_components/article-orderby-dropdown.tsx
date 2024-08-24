"use client";

import { Dropdown } from "@/components/dropdown/dropdown";
import { useProgress } from "@/hooks/use-progress";
import Image from "next/image";
import Link from "next/link";

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
        <Dropdown.Button className="h-10 !w-[94px] justify-between rounded-xl border border-black border-opacity-10 bg-background-tertiary px-[14px] dark:border dark:border-white dark:border-opacity-10 md:h-11 md:!w-[120px]">
          <Image
            src="/icons/toggle.svg"
            alt=""
            width="24"
            height="24"
            className="group-hover:animate-pulse"
          />
        </Dropdown.Button>
        <Dropdown.Body className="!z-10 mt-1 flex w-[94px] flex-col rounded-xl border border-black border-opacity-10 bg-background-tertiary dark:border dark:border-white dark:border-opacity-10 md:w-[120px]">
          {options.map((option, i) => (
            <Dropdown.Item
              key={option.value}
              className={`h-10 w-[94px] border-b border-black border-opacity-10 first:rounded-t-xl last:rounded-b-xl last:border-b-0 hover:text-brand-primary hover:underline dark:border-b dark:border-white dark:border-opacity-10 md:h-11 md:w-[120px] ${orderBy === option.value ? "text-brand-primary" : orderBy === null && i === 0 && "text-brand-primary"}`}
              value={option.value}
            >
              <Link
                className="flex h-full w-full items-center justify-between px-[14px]"
                href={`/boards?${new URLSearchParams({
                  orderBy: option.value,
                  page: "1",
                  keyword,
                }).toString()}`}
                onClick={progress(
                  `/boards?${new URLSearchParams({
                    orderBy: option.value,
                    page: "1",
                    keyword,
                  }).toString()}`,
                )}
              >
                {option.display}
              </Link>
            </Dropdown.Item>
          ))}
        </Dropdown.Body>
      </section>
    </Dropdown>
  );
}
