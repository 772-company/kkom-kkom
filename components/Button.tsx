interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color:
    | "solid_white"
    | "solid_green"
    | "solid_red"
    | "outlined_green"
    | "outlined_gray";
  size: "large" | "X-small";
  className?: string;
}

export const FUNDAMENTAL_STYLE =
  "rounded-[12px] text-[16px] font-semibold text-center";

const SOLID_WHITE =
  "bg-white border-solid border-[1px] border-[#10B981] text-[#10B981] hover:border-[#059669] hover:text-[#059669] active:border-[#047857] active:text-[#047857] disabled:border-[#94A3B8] disabled:text-[#94A3B8]";

const SOLID_GREEN =
  "text-white bg-[#10B981] hover:bg-[#059669] active:bg-[#047857] disabled:bg-[#94A3B8]";

const SOLID_RED =
  "text-white bg-[#EF4444] hover:bg-[#df3131] active:bg-[#c22020]";

const OUTLINED_GREEN =
  "border-solid border-[1px] border-[#10B981] text-[#10B981] hover:border-[#059669] hover:text-[#059669] active:border-[#047857] active:text-[#047857] disabled:border-[#94A3B8] disabled:text-[#94A3B8]";

const OUTLINED_GRAY =
  "text-[#CBD5E1] border-solid border-[1px] border-[#CBD5E1] hover:text-[#b2bbc8] hover:border-[#b2bbc8] active:text-[#94A3B8] hover:border-[#94A3B8]";

const BUTTON_STYLE = {
  solid_white: SOLID_WHITE,
  solid_green: SOLID_GREEN,
  solid_red: SOLID_RED,
  outlined_green: OUTLINED_GREEN,
  outlined_gray: OUTLINED_GRAY,
};

const LARGE = "w-[332px] h-[48px]";
const X_SMALL = "w-[72px] h-[32px]";

const BUTTON_SIZE = {
  large: LARGE,
  "X-small": X_SMALL,
};

/**
 * css를 입힌 버튼 컴포넌트입니다. className으로 버튼의 스타일을 결정할 수 있습니다.
 * button의 기본 속성도 넣을 수 있습니다.
 * @author 정지현, 이승현
 * @param children : 버튼 안에 담을 내용을 적습니다. (ex. "버튼")
 * @param className : 추가적인 css를 넣습니다.
 * @param color : 버튼의 색상 스타일을 결정합니다.
 * @returns 버튼 컴포넌트를 반환합니다.
 * @example
 *  <Button
          color="white"
          type="button"
          className="h-[30px] w-[100px]"
          disabled
        >
          disabled
        </Button>
 */
const Button = ({ children, color, size, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={`${FUNDAMENTAL_STYLE} ${BUTTON_STYLE[color]} ${BUTTON_SIZE[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
