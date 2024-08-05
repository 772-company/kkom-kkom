import { cva } from "class-variance-authority";

export const modalVariants = cva(
  "z-50 w-full rounded-t-xl bg-background-secondary md:w-[384px] md:rounded-b-xl px-4 pb-8 pt-4",
);

export const titleVariants = cva(
  "text-base font-medium text-text-primary text-center",
);

export const descriptionVariants = cva(
  "break-keep text-sm font-medium text-text-secondary text-center",
);

export const headerWithCloseVariants = cva("flex justify-end");

export const overlayVariants = cva(
  "fixed inset-0 z-40 flex items-end justify-stretch bg-black bg-opacity-50 md:items-center md:justify-center",
);

export const twoButtonVariants = cva("flex w-full gap-2");
