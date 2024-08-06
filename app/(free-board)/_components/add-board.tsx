"use client";

import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";

export default function AddBoard() {
  const overlay = useCustomOverlay(({ close }) => (
    <Modal close={close} closeOnFocusOut>
      글쓰기 모달
    </Modal>
  ));
  return (
    <section className="fixed bottom-0 left-0 right-0">
      <div className="mx-4 flex justify-end md:mx-6 xl:mx-auto xl:max-w-[1200px]">
        <Button
          btnSize="x-small"
          btnStyle="solid"
          className="mb-16 w-[104px] xl:mb-11"
          onClick={overlay.open}
        >
          + 글쓰기
        </Button>
      </div>
    </section>
  );
}
