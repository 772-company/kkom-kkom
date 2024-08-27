import cn from "@/lib/cn";
import Link, { LinkProps } from "next/link";

import buttonVariants from "./variants";

interface LinkButtonProps extends LinkProps {
  children?: React.ReactNode;
  btnStyle:
    | "solid"
    | "outlined"
    | "outlined_secondary"
    | "danger"
    | "gradient"
    | "none_background";
  btnSize: "large" | "x-small";
  className?: string;
}

/**
 * 피그마에 정의된 대로 구성되어 있는 링크 컴포넌트입니다.
 * className으로 추가적인 링크의 스타일을 결정할 수 있습니다.
 * 기본 링크 태그의 속성 전부 들어갈 수 있습니다.
 * 버튼의 색상은 테마에 맞게 설정되어 있습니다.
 * 버튼의 너비는 min-width로 설정되어 있습니다.
 * @author 정지현, 이승현
 * @param children : 링크 안에 담을 내용을 적습니다. (ex. "링크")
 * @param className : 추가적인 css를 넣습니다.
 * @param btnStyle : 버튼의 스타일을 결정합니다.
 * @param btnSize : 버튼의 크기를 결정합니다.
 * @returns 버튼 컴포넌트를 반환합니다.
 * @example
 * <LinkButton
            btnSize="x-small"
            btnStyle="outlined_secondary"
            href="/merong"
            className="w-[280px]"
          >
            outlined_secondary x-small
          </LinkButton>
          <LinkButton
            btnSize="large"
            btnStyle="gradient"
            href="/merong"
            className="w-[280px]"
          >
 */
export default function LinkButton({
  children,
  href,
  btnStyle,
  btnSize,
  className,
  ...rest
}: LinkButtonProps) {
  return (
    <Link
      className={cn(buttonVariants({ className, btnStyle, btnSize }))}
      href={href}
      {...rest}
    >
      {children}
    </Link>
  );
}
