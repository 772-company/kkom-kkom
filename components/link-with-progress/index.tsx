"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useCallback } from "react";

import { useProgressBar } from "../progress-bar/progress-bar";

interface LinkWithProgressProps extends LinkProps {
  className?: string;
}

export default function LinkWithProgress({
  href,
  className,
  children,
  ...props
}: React.PropsWithChildren<LinkWithProgressProps>) {
  const { progress } = useProgressBar();
  const router = useRouter();

  const handleClick: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (e) => {
      e.preventDefault();
      progress(() => router.push(href.toString()));
    },
    [href, progress, router],
  );

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}
