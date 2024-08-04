import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "flex",
    "cursor-pointer",
    "items-center",
    "justify-center",
    "rounded-xl",
    "font-semibold",
    "transition-all",
    "duration-300",
    "ease-in-out",
    "hover:scale-[1.02]",
    "active:scale-[0.98]",
    "disabled:hover:scale-100",
    "disabled:active:scale-100",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "disabled:scale-100",
  ],
  {
    variants: {
      btnSize: {
        large: ["h-[48px]", "text-base", "py-3"],
        "x-small": ["h-[32px]", "text-sm", "py-1.5"],
      },
      btnStyle: {
        solid: [
          "bg-brand-primary",
          "text-white",
          "hover:bg-interaction-hover",
          "active:bg-interaction-pressed",
          "disabled:bg-interaction-inactive",
        ],
        outlined: [
          "border-brand-primary",
          "text-brand-primary",
          "hover:border-interaction-hover hover:text-interaction-hover",
          "active:border-interaction-pressed",
          "active:text-interaction-pressed",
          "disabled:border-interaction-inactive",
          "disabled:text-interaction-inactive",
          "border",
          "border-solid",
          "bg-white",
        ],
        danger: [
          "bg-status-danger",
          "text-white",
          "hover:bg-[#f50808]",
          "active:bg-[#c22020]",
        ],
        outlined_secondary: [
          "border-text-secondary",
          "text-text-default",
          "border",
          "border-solid",
        ],
        none_background: ["border", "border-slate-50"],
        gradient: ["bg-gradient", "text-white"],
      },
    },
  },
);
