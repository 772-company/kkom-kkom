import { rand } from "@/utils/get-rand";
import { useSpring } from "framer-motion";
import { startTransition, useEffect, useReducer, useRef } from "react";

import useInterval from "./use-interval";

type StateType = "initial" | "in-progress" | "completing" | "complete";

type ActionType =
  | { type: "start" }
  | { type: "done" }
  | { type: "reset" }
  | { type: "complete" };

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "start":
      return "in-progress";
    case "done":
      return state === "initial" || state === "in-progress"
        ? "completing"
        : state;
    case "reset":
      return "initial";
    case "complete":
      return "complete";
    default:
      throw new Error("Unhandled action type");
  }
}

/**
 * @author 이승현
 * @description
 * progress 내부 로직이 담긴 훅입니다.
 *
 * progress bar와 같이 표시해주는 컴포넌트(view)를 만드시려면 state, value, reset 를 사용하시면 됩니다.
 * 자세한 구현 사항은 progress bar를 참고해주세요
 *
 * progress bar와 같은 컴포넌트와 연결되어 있는 컴포넌트를 만드시고 싶으시면 이 훅이 아닌 "useProgressBar"의
 * progress 함수를 사용하시면 됩니다.
 *
 * @example
 * export function ProgressBar({
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
 *
 */
export function useProgress() {
  // 현재 상태
  const [state, dispatch] = useReducer(reducer, "initial");

  // Spring으로 애니메이션 value 넣음.
  let value = useSpring(0, {
    // 반대쪽에 가해지는 힘
    damping: 25,
    // 무기력해지는 정도
    mass: 0.5,
    // sudden movement 정도
    stiffness: 300,
    // 거리가 이것보다 낮아지면 애니메이션을 끝낸다.
    restDelta: 0.1,
  });

  // interval로 콜백함수를 실행시켜주는 훅
  useInterval(
    () => {
      // progress를 시작하는데 bar가 complete 상태면 reset부터 한다.
      if (value.get() === 100) {
        // motionValue를 0으로 만들어서 멈춘다.
        value.jump(0);
      }
      // motionValue를 가져와서
      let current = value.get();
      // 바뀌는 정도인듯?
      let diff;
      // 0이면 한번에 15움직이고
      if (current === 0) {
        diff = 15;
        // 50 이하일때는 빠르게 움직이고
      } else if (current < 50) {
        diff = rand(1, 10);
        // 초과하면 1 ~ 5까지 움직인다.
      } else {
        diff = rand(1, 5);
      }
      // motionValue에 추가 (최대 99)
      value.set(Math.min(current + diff, 99));
    },
    // in-progress 상태이면 delay (시간텀) 을 750 (0.75s) 아니면 없앰
    state === "in-progress" ? 750 : null,
  );

  useEffect(() => {
    const unsubscribe = value.on("change", (latest) => {
      if (latest === 100) {
        dispatch({ type: "complete" });
      }
    });
    // initial이면 0으로
    if (state === "initial") {
      value.jump(0);
      // completing이면 100으로 간다.
    } else if (state === "completing") {
      value.set(100);
    }
    return () => {
      unsubscribe();
    };
    // value가 변화할 때 latest가 100이면 complete 상태로 만든다.
    // value, state 변화, 컴포넌트 언마운트 시마다 value.on 이라는 이벤트 핸들러는 사라진다.
  }, [value, state]);

  const handleProgress = (func: () => void) => {
    dispatch({ type: "start" });
    startTransition(() => {
      func();
      dispatch({ type: "done" });
    });
  };

  return {
    state,
    value,
    reset: () => dispatch({ type: "reset" }),
    progress: handleProgress,
  };
}
