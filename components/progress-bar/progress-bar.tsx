"use client";

import { useProgress } from "@/hooks/use-progress";
import { AnimatePresence, motion, useMotionTemplate } from "framer-motion";
import { ReactNode, createContext, useContext } from "react";

// createContext로 전역 상태 지정
const ProgressBarContext = createContext<ReturnType<typeof useProgress> | null>(
  null,
);

// useProgressBar 라는 훅으로 useProgress와 연결해서 사용하고자 함.
export function useProgressBar() {
  let progress = useContext(ProgressBarContext);
  if (progress === null) {
    throw new Error("Need to be inside provider");
  }

  return progress;
}

// Progress Bar 컴포넌트 그 자체
export function ProgressBar({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  // useProgress 사용
  let progress = useProgress();
  // useMotionTemplate: 여러 motion value를 하나의 motion value로 만드는 훅
  // 여기서는 width: ~% 이런식으로 길어지게 만들어 놓음. 내부적으로 progress.value가 100이 되면 complete임
  let width = useMotionTemplate`${progress.value}%`;

  return (
    <ProgressBarContext.Provider value={progress}>
      <AnimatePresence onExitComplete={progress.reset}>
        {progress.state !== "complete" && (
          <motion.div
            style={{ width }}
            exit={{ opacity: 0 }}
            className={className}
          />
        )}
      </AnimatePresence>
      {children}
    </ProgressBarContext.Provider>
  );
}
