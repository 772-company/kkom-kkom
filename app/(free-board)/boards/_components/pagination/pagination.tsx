import { cn } from "@/lib/cn";
import { ComponentProps, forwardRef } from "react";

import { LinkButton } from "../../../../../components/button/button";
import PaginationIndicator from "./pagination-indicator";

const PaginationStructure = ({
  className,
  ...props
}: ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = forwardRef<HTMLUListElement, ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("", className)} {...props} />
  ),
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = forwardRef<HTMLLIElement, ComponentProps<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("flex-1", className)} {...props} />
  ),
);
PaginationItem.displayName = "PaginationItem";

interface MainPaginationProps {
  total: number;
  searchParams: {
    orderBy?: "recent" | "like";
    page?: string;
    keyword?: string;
  };
}

export default function Pagination({
  total,
  searchParams,
}: MainPaginationProps) {
  const page = Number(searchParams.page || "1");
  const orderBy = searchParams.orderBy || "recent";
  const keyword = searchParams.keyword || "";

  const maxIndex =
    total % 10 === 0 ? Math.floor(total / 10) : Math.floor(total / 10) + 1;

  const pageNumberList = [page - 2, page - 1, page, page + 1, page + 2].map(
    (i) => (i < 1 || i > maxIndex ? 0 : i),
  );

  return (
    <PaginationStructure className="w-full max-w-[1200px]">
      <PaginationContent className="flex gap-2">
        <PaginationItem>
          <PaginationIndicator
            page={1}
            src="/icons/arrow-first.svg"
            alt="arrow-first"
            disabled={page === 1}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationIndicator
            page={page - 1}
            src="/icons/arrow-left.svg"
            alt="arrow-left"
            disabled={page === 1}
          />
        </PaginationItem>
        {pageNumberList.map((i, index) => {
          if (i === 0) {
            return <PaginationItem key={index}></PaginationItem>;
          }
          return (
            <PaginationItem key={index}>
              <LinkButton
                href={`/boards?page=${i}&orderBy=${orderBy}&keyword=${keyword}`}
                btnSize="large"
                btnStyle={index === 2 ? "solid" : "outlined"}
                className="w-full"
              >
                {i}
              </LinkButton>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationIndicator
            page={page + 1}
            src="/icons/arrow-right.svg"
            alt="arrow-right"
            disabled={page === maxIndex}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationIndicator
            page={maxIndex}
            src="/icons/arrow-last.svg"
            alt="arrow-last"
            disabled={page === maxIndex}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationStructure>
  );
}
