"use client";

import { useCustomOverlay } from "@/hooks/use-custom-overlay";

import { ModalWarning } from "./_component/modal-warning";

export default function Page() {
  const overlay1 = useCustomOverlay(({ close }) => (
    <ModalWarning close={close} handleConfirm={() => console.log("ㅎㅇ")} />
  ));
  return <button onClick={overlay1.open}>클릭</button>;
}
