import Modal from "@/components/modal/modal";
import useNextPage from "@/hooks/use-next-page";
import usePreventScroll from "@/hooks/use-prevent-scroll";
import { useCallback, useState } from "react";

import ArticleForm from "./article-form";
import FileDragDown from "./file-drag-down";
import { ArticleType } from "./types";

interface HandleArticleModalProps {
  close: () => void;
  defaultTitle: string | null;
  defaultContent: string | null;
  defaultImage: string | null;
  onSubmit: (formData: ArticleType) => void;
}

export default function HandleArticleModal({
  close,
  onSubmit,
  defaultContent,
  defaultImage,
  defaultTitle,
}: HandleArticleModalProps) {
  const { handleNext, handlePrev, isNext } = useNextPage();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageFile = useCallback((selectedImageFile: File | null) => {
    setImageFile(selectedImageFile);
  }, []);

  usePreventScroll();

  return (
    <Modal close={close} closeOnFocusOut={false}>
      <Modal.HeaderWithClose className="fixed right-7 top-7" />
      <section className="relative">
        {isNext ? (
          <ArticleForm
            file={imageFile}
            handlePrev={handlePrev}
            handlePost={onSubmit}
            defaultContent={defaultContent}
            defaultTitle={defaultTitle}
            defaultImage={defaultImage}
            close={close}
          />
        ) : (
          <FileDragDown
            file={imageFile}
            onSelect={handleImageFile}
            defaultPreview={defaultImage}
            handleNext={handleNext}
          />
        )}
      </section>
    </Modal>
  );
}
