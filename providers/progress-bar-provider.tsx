"use client";

import { AppProgressBar } from "next-nprogress-bar";
import { ReactNode } from "react";

export default function ProgressBarProvider({
  children,
}: {
  children: ReactNode;
}) {
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
