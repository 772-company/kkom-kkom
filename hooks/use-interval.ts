import { useEffect, useRef } from "react";

// useInterval: callback과 delay를 받으면 interval을 주는 함수
export default function useInterval(
  callback: () => void,
  delay: number | null,
) {
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
