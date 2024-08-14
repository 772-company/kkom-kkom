import Button from "@/components/button/button";
import { BasicInput } from "@/components/input-field/basic-input";
import { BasicTextarea } from "@/components/input-field/textarea";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import usePreventScroll from "@/hooks/use-prevent-scroll";
import { uploadImage } from "@/lib/apis/image";
import { showToast } from "@/lib/show-toast";
import ArrowReturn from "@/public/icons/arrow-return";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";

import {
  usePatchArticleMutation,
  useUploadArticleMutation,
} from "../../_query/query";
import FileDragDown from "./_components/file-drag-down";
import ModalCancel from "./_components/modal-cancel";
import { articleFormSchema, editArticleFormSchema } from "./schema";

// TODO 어떤 방식으로 연결할지 확인 필요, 아래 코드는 임시로 작성한 것
interface EditArticleModalProps {
  close: () => void;
  title: string;
  content: string;
  image: string;
  articleId: number;
}

export interface EditFormType {
  title: string;
  content: string;
  image: string;
}

export default function EditArticleModal({
  close,
  content,
  image,
  title,
  articleId,
}: EditArticleModalProps) {
  const [isNext, setIsNext] = useState(false);
  const [file, setFile] = useState<string | null>(image);
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(editArticleFormSchema),
  });
  const cancelOverlay = useCustomOverlay(({ close }) => (
    <ModalCancel
      close={close}
      onCancel={() => {
        setFile(null);
      }}
    />
  ));
  const patchArticleMutation = usePatchArticleMutation();

  const handleNext = () => {
    setIsNext(true);
  };
  const handlePrev = () => {
    setIsNext(false);
  };

  const handleCancel = cancelOverlay.open;
  const handlePost: SubmitHandler<EditFormType> = (d) => {
    patchArticleMutation.mutate(
      {
        articleId: articleId,
        content: d.content,
        image: d.image,
        title: d.title,
      },
      {
        onSettled: () => {
          setFile(null);
        },
      },
    );
  };
  const handleValidate = (
    e: FieldErrors<{
      title: string;
      content: string;
      image: string;
    }>,
  ) => {
    showToast(
      "error",
      e.content?.message || e.image?.message || e.title?.message,
    );
  };

  const handleImage = async (image: File) => {
    try {
      const { url } = await uploadImage(image);
      setValue("image", url);
      setFile(url);
    } catch (e) {
      console.error(e);
      showToast("error", "이미지를 업로드하는 중 오류가 발생했습니다.");
    }
  };

  usePreventScroll();

  return (
    <section className="relative">
      {isNext ? (
        <header className="flex justify-start gap-2">
          <Button
            btnSize="x-small"
            btnStyle="solid"
            onClick={handlePrev}
            type="button"
            className="w-14 xl:w-20"
          >
            이전
          </Button>
        </header>
      ) : file ? (
        <header className="flex items-center justify-between gap-2">
          <ArrowReturn handleCancel={handleCancel} />
          <Button
            btnSize="x-small"
            btnStyle="solid"
            onClick={handleNext}
            type="button"
            className="w-14 xl:w-20"
          >
            다음
          </Button>
        </header>
      ) : null}
      <section>
        {!isNext ? (
          <FileDragDown defaultPreview={file} onSelect={handleImage} />
        ) : (
          <form onSubmit={handleSubmit(handlePost, handleValidate)}>
            <Button
              type="submit"
              btnSize="x-small"
              btnStyle="solid"
              className="absolute right-0 top-0 w-14 xl:w-20"
            >
              올리기
            </Button>
            <section className="mt-4 flex flex-col gap-4">
              <BasicInput
                register={register}
                id="title"
                label="제목"
                error={errors.title?.message}
              />
              <BasicTextarea
                register={register}
                id="content"
                label="내용"
                className="resize-none"
                rows={10}
                cols={30}
                error={errors.content?.message}
              />
            </section>
          </form>
        )}
      </section>
    </section>
  );
}
