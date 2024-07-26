import Link from "next/link";

import { FUNDAMENTAL_STYLE } from "./button";

interface LinkButtonProps {
  children: React.ReactNode;
  href: string;
  color: "green" | "green/gradient";
  className?: string;
}

const GREEN_COLOR =
  "flex justify-center items-center text-white bg-[#10B981] hover:bg-[#059669] active:bg-[#047857] disabled:bg-[#94A3B8]";

const GREEN_GRADIENT_COLOR =
  "flex justify-center items-center bg-gradient-to-r from-[#10B981] to-[#A3E635] text-white hover:from-[#059669] hover:to-[#98d832] active:from-[#0d906b] active:to-[#98c353]";

const BUTTON_STYLE = {
  green: GREEN_COLOR,
  "green/gradient": GREEN_GRADIENT_COLOR,
};

/**
 * css를 입힌 링크 컴포넌트입니다. className으로 버튼의 스타일을 결정할 수 있습니다.
 * @author 정지현, 이승현
 * @param children : 버튼 안에 담을 내용을 적습니다. (ex. "바로가기")
 * @param href : 링크 주소를 적습니다.
 * @param color : 링크의 색상 스타일을 결정합니다.
 * @param className : 추가적인 css를 넣습니다.
 * @returns 링크 컴포넌트를 반환합니다.
 * @example
 *  <LinkButton href="/merong" color="green" className="h-[30px] w-[200px]">
        LinkButton - green
      </LinkButton>
 */
const LinkButton = ({ children, href, color, className }: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className={`${FUNDAMENTAL_STYLE} ${BUTTON_STYLE[color]} ${className}`}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
