import Check from "@/public/icons/check.svg";
import Plus from "@/public/icons/plus.svg";

const FUNDAMENTAL_STYLE =
  "px-[21px] py-[14px] flex cursor-pointer items-center justify-center font-semibold transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 disabled:active:scale-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:scale-100 gap-1 rounded-[40px] shadow-xl";

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

interface ButtonFloatingProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnStyle: "solid" | "outlined";
  btnSize: "large" | "medium";
  children: React.ReactNode;
  className?: string;
}

/**
 * @author 이승현, 정지현
 * @param btnStyle : 버튼의 스타일을 결정합니다.
 * @param btnSize : 버튼의 사이즈를 결정합니다.
 * @param children : 버튼 안에 담을 내용을 작성합니다.
 * @param className : 추가적인 스타일링을 작성합니다.
 * @returns 플로팅 버튼을 반환합니다.
 * @example
 * <ButtonFloating btnStyle="solid" btnSize="large" className="w-[300px]">
          floating-solid-large
  </ButtonFloating>
 */
export default function ButtonFloating({
  btnStyle,
  btnSize,
  children,
  className,
  ...rest
}: ButtonFloatingProps) {
  return (
    <button
      className={`${FUNDAMENTAL_STYLE} ${BUTTON_STYLE[btnStyle]} ${BUTTON_SIZE[btnSize]} ${className}`}
      {...rest}
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
