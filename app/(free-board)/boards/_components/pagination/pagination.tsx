import LinkButton from "@/components/button/link-button";
import cn from "@/lib/cn";
import { ComponentProps, forwardRef } from "react";

import Button from "../../../../../components/button/button";
import PaginationIndicator from "./pagination-indicator";

function PaginationStructure({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("", className)}
      {...props}
    />
  );
}

PaginationStructure.displayName = "Pagination";

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
  className?: string;
}

export default function Pagination({
  total,
  searchParams,
  className,
}: MainPaginationProps) {
  const page = Number(searchParams.page || "1");
  const orderBy = searchParams.orderBy || "recent";
  const keyword = searchParams.keyword || "";

  const maxIndex =
    total % 10 === 0 ? Math.floor(total / 10) : Math.floor(total / 10) + 1;

  const pageNumberList = [page - 2, page - 1, page, page + 1, page + 2].map(
    (i) => {
      if (i >= 1 && i <= maxIndex) {
        return i;
      }
      return 0;
    },
  );

  return (
    <PaginationStructure
      className={`fixed bottom-0 left-0 right-0 z-30 border-t border-t-background-tertiary bg-background-secondary pb-2 pt-2 ${className}`}
    >
      <PaginationContent className="mx-auto flex w-full max-w-[1200px] gap-2">
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
        {pageNumberList.map((pageNumber) => {
          if (pageNumber === 0) {
            return (
              <PaginationItem key={pageNumber}>
                <Button
                  btnSize="large"
                  disabled
                  btnStyle="outlined"
                  className="w-full"
                />
              </PaginationItem>
            );
          }
          return (
            <PaginationItem key={pageNumber}>
              <LinkButton
                href={`/boards?page=${pageNumber}&orderBy=${orderBy}&keyword=${keyword}`}
                btnSize="large"
                btnStyle={page === pageNumber ? "solid" : "outlined"}
                className="w-full"
              >
                {pageNumber}
              </LinkButton>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationIndicator
            page={page + 1}
            src="/icons/arrow-right.svg"
            alt="arrow-right"
            disabled={page === maxIndex || maxIndex === 0}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationIndicator
            page={maxIndex}
            src="/icons/arrow-last.svg"
            alt="arrow-last"
            disabled={page === maxIndex || maxIndex === 0}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationStructure>
  );
}
