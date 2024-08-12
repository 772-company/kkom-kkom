"use client";

import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";

import AddBoardModal from "./add-board-modal";

export default function AddBoard() {
  const overlay = useCustomOverlay(({ close }) => (
    <Modal close={close} closeOnFocusOut={false} className="md:!w-[500px]">
      <Modal.HeaderWithClose className="fixed right-7 top-7" />
      <AddBoardModal close={close} />
    </Modal>
  ));
  return (
    <Button
      btnSize="x-small"
      btnStyle="solid"
      className="fixed bottom-11 right-4 w-[104px] md:right-6 xl:right-[calc(50vw-600px)]"
      onClick={overlay.open}
    >
      + 글쓰기
    </Button>
  );
}
