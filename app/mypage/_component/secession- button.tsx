"use client";

import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import Image from "next/image";

import ModalSecession from "./modal-secession";

export default function SecessionButton() {
  const modalSecessionOverlay = useCustomOverlay(({ close }) => (
    <ModalSecession close={close} />
  ));
  return (
    <section className="mt-[24px] flex w-full items-center gap-2">
      <Image
        src="/icons/exit-door.svg"
        alt="회원 탈퇴 문"
        width={24}
        height={24}
      />
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
