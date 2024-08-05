"use client";

import { useOverlayStore } from "@/providers/modal-store-provider";
import { useId, useMemo } from "react";

import { CreateOverlayElement } from "./types";

/**
 * Zustand와 결합하여 루트 아래에 컴포넌트를 렌더링하는 훅입니다.
 * close를 prop으로 받는 컴포넌트를 렌더링합니다.
 * Modal 컴포넌트와 같이 close 함수를 prop으로 받는 컴포넌트를 만들어서 넣어주시면 됩니다.
 * 해당 컴포넌트는 루트 아래로 띄워주기만 합니다. 
 * 위치 조정은 Modal 처럼 Fixed로 크게 만들고 위치 잡아주시면 됩니다.
 * 자세한 구현은 Modal 참고해주세요!
 * 
 * 모달 안에 다른 CustomOverlay를 만들어서 모달을 하나 더 띄우셔도 됩니다. 
 * 단,useOutSideClick은 따로 처리해주셔야 합니다.
 * 
 * @author 이승현
 * @param overlayElement
 * @returns 루트 아래에 해당 컴포넌트가 렌더링됩니다.
 *  const overlay1 = useCustomOverlay(({ close }) => (
    <Modal close={close}>
      <Modal.HeaderWithClose />
      <Modal.Title>제목</Modal.Title>
      <Modal.Description>난 예시다.</Modal.Description>
      <Modal.Description>해냈다.</Modal.Description>
    </Modal>
  ));
  return (
    <button onClick={overlay1.open}>overlay1에 넣은 컴포넌트를 여는 버튼/button>
 */
export function useCustomOverlay(overlayElement: CreateOverlayElement) {
  // useId로 고유한 id를 생성
  const id = useId();
  const mount = useOverlayStore((store) => store.mount);
  const unmount = useOverlayStore((store) => store.unmount);

  // useMemo를 사용하여 객체를 캐싱
  return useMemo(
    () => ({
      open: () => {
        mount(id, overlayElement({ close: () => unmount(id) }));
      },
      close: () => {
        unmount(id);
      },
    }),
    [id, mount, unmount, overlayElement],
  );
}
