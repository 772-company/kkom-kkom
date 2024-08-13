"use client";

import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import ExitDoor from "@/public/icons/exit-door.svg";

import { ModalSecession } from "./modal-secession";

export default function SecessionButton() {
  const modalSecessionOverlay = useCustomOverlay(({ close }) => (
    <ModalSecession close={close} />
  ));
  return (
    <section className="mt-[24px] flex w-full items-center gap-2">
      <ExitDoor width={24} height={24} />
      <button
        onClick={modalSecessionOverlay.open}
        className="text-base font-medium text-status-danger"
        type="button"
      >
        회원 탈퇴하기
      </button>
    </section>
  );
}
