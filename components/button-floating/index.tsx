import Check from "@/app/public/icons/check.svg";
import Plus from "@/app/public/icons/plus.svg";

const FUNDAMENTAL_STYLE =
  "z-50 px-[21px] py-[14px] flex cursor-pointer items-center justify-center font-semibold transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 disabled:active:scale-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:scale-100 gap-1 rounded-[40px] shadow-xl";

const SOLID =
  "bg-brand-primary text-white hover:bg-interaction-hover active:bg-interaction-pressed disabled:bg-interaction-inactive";

const OUTLINED =
  "border-brand-primary text-brand-primary hover:border-interaction-hover hover:text-interaction-hover active:border-interaction-pressed active:text-interaction-pressed disabled:border-interaction-inactive disabled:text-interaction-inactive border border-solid bg-white";

const LARGE = "h-[48px] w-full text-[16px] leading-[19.09px] font-semibold";

const MEDIUM = "h-[40px] w-full text-[14px] leading-[16.71px] font-semibold";

// NOTE: 버튼의 스타일입니다.
export const BUTTON_STYLE = {
  solid: SOLID,
  outlined: OUTLINED,
};

// NOTE: 버튼의 크기입니다.
export const BUTTON_SIZE = {
  large: LARGE,
  medium: MEDIUM,
};

interface ButtonFloatingProps {
  btnStyle: "solid" | "outlined";
  btnSize: "large" | "medium";
  children: React.ReactNode;
  className: string;
}

export default function ButtonFloating({
  btnStyle,
  btnSize,
  children,
  className,
}: ButtonFloatingProps) {
  return (
    <button
      className={`${FUNDAMENTAL_STYLE} ${BUTTON_STYLE[btnStyle]} ${BUTTON_SIZE[btnSize]} ${className}`}
    >
      {btnStyle === "solid" && btnSize === "large" ? (
        <Plus className="h-[16px] w-[16px]" />
      ) : (
        <Check className="h-[16px] w-[16px]" />
      )}
      {children}
    </button>
  );
}
