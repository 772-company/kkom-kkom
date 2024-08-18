import Button from "@/components/button/button";
import { BasicInput } from "@/components/input-field/basic-input";
import { BasicTextarea } from "@/components/input-field/textarea";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { uploadImage } from "@/lib/apis/image";
import { ResponseError } from "@/lib/apis/myFetch/clientFetch";
import { showToast } from "@/lib/show-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";

import { FormType, SubmitFormType } from ".";
import { useUploadImageMutation } from "../../_query/mutation";
import { ModalError } from "../modal-error";
import { articleFormSchema } from "./schema";

interface TextFormProps {
  file: File | null;
  handlePrev: () => void;
  handlePost: SubmitHandler<SubmitFormType>;
  defaultContent: string | null;
  defaultTitle: string | null;
  defaultImage: string | null;
  close: () => void;
}

export default function ArticleForm({
  file,
  handlePrev,
  handlePost,
  defaultContent,
  defaultTitle,
  defaultImage,
  close,
}: TextFormProps) {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: defaultTitle || "",
      content: defaultContent || "",
      image: defaultImage || "",
    },
    mode: "onSubmit",
    resolver: yupResolver(articleFormSchema),
  });
  const errorOverlay = useCustomOverlay(({ close }) => (
    <ModalError
      close={close}
      description={
        errors.image?.message ||
        errors.title?.message ||
        errors.content?.message ||
        ""
      }
    />
  ));
  const { mutate, data: imageData } = useUploadImageMutation();

  const isImage = file || defaultImage;

  const onInValidate = (
    e: FieldErrors<{
      title: string;
      content: string;
      image: File;
    }>,
  ) => {
    errorOverlay.open();
  };
  const onSubmit = async (data: FormType) => {
    close();
    const newFormData: SubmitFormType = {
      title: data.title,
      content: data.content,
      image: "",
    };
    if (!file && defaultImage) {
      newFormData.image = defaultImage;
    } else if (file) {
      mutate(file);
      newFormData.image = imageData?.url || "";
    } else {
      throw new Error("이미지가 없습니다.");
    }
    handlePost(newFormData);
  };

  useEffect(() => {
    if (isImage) {
      setValue("image", isImage);
    }
  }, [isImage, setValue]);

  return (
    <>
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
      <section>
        <form onSubmit={handleSubmit(onSubmit, onInValidate)}>
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
      </section>
    </>
  );
}
