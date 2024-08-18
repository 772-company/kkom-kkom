import Modal from "@/components/modal/modal";
import useNextPage from "@/hooks/use-next-page";
import usePreventScroll from "@/hooks/use-prevent-scroll";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";

import ArticleForm from "./article-form";
import FileDragDown from "./file-drag-down";

interface HandleArticleModalProps {
  close: () => void;
  defaultTitle: string | null;
  defaultContent: string | null;
  defaultImage: string | null;
  onSubmit: SubmitHandler<SubmitFormType>;
}

// 폼에서 처리되기 전의 데이터 타입
export interface FormType {
  title: string;
  content: string;
  image: File | string;
}

// 모든 처리가 끝난 데이터 타입
export interface SubmitFormType {
  title: string;
  content: string;
  image: string;
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
            defaultImage={imageFile === null ? defaultImage : null}
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
