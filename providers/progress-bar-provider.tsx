"use client";

import { AppProgressBar, startProgress } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ProgressBarProvider({
  children,
}: {
  children: ReactNode;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    startProgress();
  }, [searchParams]);

  return (
    <>
      {children}
      <AppProgressBar
        height="4px"
        color="#10b981"
        options={{
          showSpinner: false,
          minimum: 0.15,
          easing: "ease",
          speed: 500,
        }}
        shallowRouting
      />
    </>
  );
}
