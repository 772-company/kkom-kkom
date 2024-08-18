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

export interface FormType {
  title: string;
  content: string;
  image: File;
}

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
    <section className="relative">
      {isNext ? (
        <ArticleForm
          file={imageFile}
          handlePrev={handlePrev}
          handlePost={onSubmit}
          defaultContent={defaultContent}
          defaultTitle={defaultTitle}
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
  );
}
