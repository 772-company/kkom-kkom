"use client";

import { useOverlayStore } from "@/providers/modal-store-provider";
import { useId, useMemo, useRef } from "react";

import {
  OverlayControlRef,
  OverlayController,
} from "./_components/overlay-controller";
import { CreateOverlayElement } from "./types";

export function useOverlay() {
  // useId로 고유한 id를 생성
  const id = useId();
  const mount = useOverlayStore((store) => store.mount);
  const unmount = useOverlayStore((store) => store.unmount);

  // overlayRef를 생성, useImperativeHandle을 사용하여 close 함수를 제공
  const overlayRef = useRef<OverlayControlRef | null>(null);

  // useMemo를 사용하여 객체를 캐싱
  return useMemo(
    () => ({
      open: (overlayElement: CreateOverlayElement) => {
        mount(
          id,
          <OverlayController
            key={Date.now()}
            ref={overlayRef}
            overlayElement={overlayElement}
            onExit={() => unmount(id)}
          />,
        );
      },
      close: () => {
        overlayRef.current?.close();
      },
    }),
    [id, mount, unmount],
  );
}
