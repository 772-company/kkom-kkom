"use client";

import Moon from "@/public/icons/moon.svg";
import Sun from "@/public/icons/sun.svg";
import { useTheme } from "next-themes";
import * as React from "react";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const handleToggle = React.useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={handleToggle}
        className="flex h-6 w-11 rounded-full bg-brand-secondary bg-opacity-40 p-[2px] dark:justify-end dark:bg-white"
      >
        <div className="flex size-5 items-center justify-center rounded-full bg-brand-primary dark:bg-background-tertiary">
          {theme === "light" ? (
            <Sun width={14} height={14} />
          ) : (
            <Moon width={14} height={14} />
          )}
        </div>
      </button>
    </div>
  );
}
