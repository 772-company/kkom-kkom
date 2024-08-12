import Button from "@/components/button/button";
import { BasicInput } from "@/components/input-field/basic-input";
import { BasicTextarea } from "@/components/input-field/textarea";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import usePreventScroll from "@/hooks/use-prevent-scroll";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import FileDragDown from "./_components/file-drag-down";
import ModalCancel from "./_components/modal-cancel";
import { articleFormSchema } from "./schema";

interface AddBoardModalProps {
  close: () => void;
}

export interface FormType {
  title: string;
  content: string;
  image: File;
}

export default function AddBoardModal({ close }: AddBoardModalProps) {
  const [isNext, setIsNext] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(articleFormSchema),
  });
  const cancelOverlay = useCustomOverlay(({ close }) => (
    <ModalCancel
      close={close}
      onCancel={() => {
        setFile(null);
      }}
    />
  ));

  const handleNext = () => {
    setIsNext(true);
  };
  const handlePrev = () => {
    setIsNext(false);
  };
  const handleCancel = cancelOverlay.open;

  //TODO : 서버로 데이터 전송
  const handlePost: SubmitHandler<FormType> = (d) => {
    console.log(d);
    close();
  };
  const handleImage = (image: File) => {
    setValue("image", image);
    setFile(image);
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
          <svg
            aria-label="돌아가기"
            className="h-6 w-6 cursor-pointer"
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
            onClick={handleCancel}
          >
            <title>돌아가기</title>
            <line
              fill="none"
              stroke="rgb(16 185 129)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="2.909"
              x2="22.001"
              y1="12.004"
              y2="12.004"
            ></line>
            <polyline
              fill="none"
              points="9.276 4.726 2.001 12.004 9.276 19.274"
              stroke="rgb(16 185 129)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></polyline>
          </svg>
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
          <FileDragDown file={file} onSelect={handleImage} />
        ) : (
          <form onSubmit={handleSubmit(handlePost)}>
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
