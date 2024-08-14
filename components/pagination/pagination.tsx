"use client";

import { cn } from "@/lib/cn";
import { useSortStore } from "@/providers/sort-store-provider";
import Image from "next/image";
import {
  ComponentProps,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from "react";

import Button, { LinkButton } from "../button/button";

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
  disabled: boolean;
}

export default function Pagination({ total, disabled }: MainPaginationProps) {
  const setPage = useSortStore((state) => state.setPage);
  const page = useSortStore((state) => state.page);
  const maxIndex = useMemo(() => {
    return total % 10 === 0
      ? Math.floor(total / 10)
      : Math.floor(total / 10) + 1;
  }, [total]);
  const pageNumberList = useMemo(
    () =>
      [page - 2, page - 1, page, page + 1, page + 2].map((i) =>
        i < 1 || i > maxIndex ? 0 : i,
      ),
    [page, maxIndex],
  );
  const handleNext = useCallback(() => {
    setPage(page + 1);
  }, [page, setPage]);
  const handlePrev = useCallback(() => {
    setPage(page - 1);
  }, [page, setPage]);
  const handleChange = useCallback(
    (index: number) => {
      setPage(index);
    },
    [setPage],
  );

  const isDisabled = useMemo(() => {
    return disabled || total === 0;
  }, [disabled, total]);

  return (
    <PaginationStructure className="w-full max-w-[1200px]">
      <PaginationContent className="flex gap-2">
        <PaginationItem>
          <Button
            btnSize="large"
            btnStyle="outlined"
            onClick={() => {
              handleChange(1);
            }}
            className="w-full"
            disabled={page === 1 || isDisabled}
          >
            <Image
              src="/icons/arrow-first.svg"
              alt="arrow-first"
              width={24}
              height={24}
            />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            btnSize="large"
            btnStyle="outlined"
            onClick={handlePrev}
            disabled={page === 1 || isDisabled}
            className="w-full"
          >
            <Image
              src="/icons/arrow-left.svg"
              alt="arrow-left"
              width={24}
              height={24}
            />
          </Button>
        </PaginationItem>
        {pageNumberList.map((i, index) => {
          if (i === 0) {
            return <PaginationItem key={index}></PaginationItem>;
          }
          return (
            <PaginationItem key={index}>
              <Button
                btnSize="large"
                btnStyle={index === 2 ? "solid" : "outlined"}
                onClick={() => {
                  handleChange(i);
                }}
                disabled={isDisabled}
                className="w-full"
              >
                {i}
              </Button>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <Button
            btnSize="large"
            btnStyle="outlined"
            onClick={handleNext}
            disabled={page === maxIndex || isDisabled}
            className="w-full"
          >
            <Image
              src="/icons/arrow-right.svg"
              alt="arrow-right"
              width={24}
              height={24}
            />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            btnSize="large"
            btnStyle="outlined"
            onClick={() => {
              handleChange(maxIndex);
            }}
            disabled={page === maxIndex || isDisabled}
            className="w-full"
          >
            <Image
              src="/icons/arrow-last.svg"
              alt="arrow-last"
              width={24}
              height={24}
            />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </PaginationStructure>
  );
}
