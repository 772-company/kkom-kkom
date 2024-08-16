import { useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// useProgress (본체)
export function useProgress() {
  // 현재 상태
  const [state, setState] = useState<
    "initial" | "in-progress" | "completing" | "complete"
  >("initial");

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
    // initia이면 0으로
    if (state === "initial") {
      value.jump(0);
      // completing이면 100으로 간다.
    } else if (state === "completing") {
      value.set(100);
    }

    // value가 변화할 때 latest가 100이면 complete 상태로 만든다.
    return value.on("change", (latest) => {
      // on 이벤트는 motionValue를 가져올 수 있다. lastest가 motionValue
      if (latest === 100) {
        setState("complete");
      }
    });
    // value, state 변화, 컴포넌트 언마운트 시마다 value.on 이라는 이벤트 핸들러는 사라진다.
  }, [value, state]);

  function reset() {
    // initial로 만듬
    setState("initial");
  }

  function start() {
    // start로 만듬
    setState("in-progress");
  }

  function done() {
    // initial이거나 in-progress면 completing아니면 원상태로 돌리는 함수
    setState((state) =>
      state === "initial" || state === "in-progress" ? "completing" : state,
    );
  }
  return { state, value, start, done, reset };
}

// 랜덤하게 max와 min 사이에서 양수 하나를 꺼내는 함수
function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// useInterval: callback과 delay를 받으면 interval을 주는 함수
function useInterval(callback: () => void, delay: number | null) {
  // callback을 저장하는 클로저
  const savedCallback = useRef(callback);

  useEffect(() => {
    // callback을 변경하는 함수
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    // ref에 담긴 callback 실행하는 함수
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      // 일단 실행
      tick();

      // 타이머 켜라
      let id = setInterval(tick, delay);
      // 언마운트 될 때 타이머 지워라
      return () => clearInterval(id);
    }
  }, [delay]);
}
