"use client";

import { useProgress } from "@/hooks/use-progress";
import Link, { LinkProps } from "next/link";

interface LinkWithProgressProps extends LinkProps {
  className?: string;
}

/**
 * @author 이승현
 * @description
 * 링크를 대체하여 클릭 시 로딩바를 보여주는 컴포넌트입니다. 완벽히 대체할 수 있으니 이름만 바꾸시면 됩니다.
 * @example
 * <LinkWithProgress href="/boards">자유게시판</LinkWithProgress>
 */
export default function LinkWithProgress({
  href,
  className,
  children,
  ...props
}: React.PropsWithChildren<LinkWithProgressProps>) {
  const handleClick = useProgress();

  return (
    <Link
      href={href}
      onClick={handleClick(href.toString())}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
