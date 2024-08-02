/** @tossdocs-ignore */
import {
  Ref,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import { CreateOverlayElement } from "../types";

interface Props {
  // 결과물
  overlayElement: CreateOverlayElement;
  onExit: () => void;
}

export interface OverlayControlRef {
  close: () => void;
}

export const OverlayController = forwardRef(function OverlayController(
  { overlayElement: OverlayElement, onExit }: Props,
  ref: Ref<OverlayControlRef>,
) {
  // 메모리가 아닌 실제 DOM에 렌더링되는지 여부
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);

  // DOM에서 Overlay를 닫는 함수
  const handleOverlayClose = useCallback(() => setIsOpenOverlay(false), []);

  // ref로 전달된 객체에 close 함수를 추가
  useImperativeHandle(ref, () => {
    return { close: handleOverlayClose };
  }, [handleOverlayClose]);

  // 컴포넌트가 마운트되면 Overlay를 열기
  useEffect(() => {
    // 브라우저에 다음 리페인트 전에 콜백 함수 호출을 가능하게 하는 메소드,
    // 이게 없으면 가끔 애니메이션이 먹힌다고 한다. (리페인트 이후에 콜백 함수가 켜지는 듯)
    requestAnimationFrame(() => {
      setIsOpenOverlay(true);
    });
  }, []);

  // OverlayElement를 렌더링
  // OverlayElement는 반드시 해당 Props만을 전달받아서 렌더링하는 컴포넌트
  return (
    <OverlayElement
      isOpen={isOpenOverlay}
      close={handleOverlayClose}
      exit={onExit}
    />
  );
});
