"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import * as React from "react";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center">
      <div className="flex h-6 w-11 rounded-full bg-brand-secondary bg-opacity-40 p-[2px] dark:justify-end dark:bg-white">
        <button
          type="button"
          className="flex size-5 items-center justify-center rounded-full bg-brand-primary dark:bg-background-tertiary"
          onClick={handleToggle}
        >
          {theme === "light" ? (
            <Image
              src="/icons/sun.svg"
              alt="라이트 모드 해"
              width={14}
              height={14}
            />
          ) : (
            <Image
              src="/icons/moon.svg"
              alt="다크 모드 달"
              width={14}
              height={14}
            />
          )}
        </button>
      </div>
    </div>
  );
}
