"use client";

import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";

import ArticleModal from "./article-modal";

export default function AddArticle() {
  const overlay = useCustomOverlay(({ close }) => (
    <Modal close={close} closeOnFocusOut={false}>
      <Modal.HeaderWithClose className="fixed right-7 top-7" />
      <ArticleModal close={close} />
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
