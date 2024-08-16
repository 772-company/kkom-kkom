"use client";

import { useProgress } from "@/hooks/use-progress";
import { AnimatePresence, motion, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ComponentProps,
  ReactNode,
  createContext,
  startTransition,
  useContext,
} from "react";

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

/**
 * @author 이승현
 * @param 기본 Link 컴포넌트와 같은 props
 * @returns
 * @description Link 컴포넌트를 래핑한 컴포넌트입니다. 클릭시 progress-bar가 작동하게 됩니다.
 */
export function ProgressBarLink({
  href,
  children,
  ...rest
}: ComponentProps<typeof Link>) {
  // useProgress를 context에서 꺼낸다.
  let progress = useProgressBar();
  let router = useRouter();

  return (
    <Link
      href={href}
      onClick={(e) => {
        // 기본 동작을 삭제한다.
        e.preventDefault();
        // progress를 in-progress 상태로 만듬.
        progress.start();
        startTransition(() => {
          // router.push를 가장 나중 렌더링으로 바꾼다. 중간에 다른거 누르면 즉시 취소될 수 있다.
          router.push(href.toString());
          // router.push는 void가 리턴값이며 함수가 진행중인지 알 수 있는 방법이 없다. 이를 위해 transition을 사용한다.
          // startTransition은 내부의 함수들이 UI 렌더링 없이 한번에 업데이트 되게 해준다.
          // 이를 통해 router.push와 progress.done은 한번에 업데이트 되게 된다.

          // 클릭시 progress.start라는 상태 변화는 바로 일어나지만 progress.done이라는 상태 변화는 router.push가 끝나야 진행된다.
          // 상태 계의 async라고 보면 될 것 같다.

          // push가 끝나면 done으로 progress를 끝낸다. (initial이거나 in-progress면 complete으로 만듬.)
          progress.done();
        });
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
