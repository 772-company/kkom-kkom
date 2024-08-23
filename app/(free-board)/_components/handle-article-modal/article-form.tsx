import Button from "@/components/button/button";
import { BasicInput } from "@/components/input-field/basic-input";
import { BasicTextarea } from "@/components/input-field/textarea";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useUploadImageMutation } from "../../_query/mutation";
import ModalError from "../modal-error";
import articleFormSchema from "./schema";
import { ArticleType, FormType } from "./types";

interface ArticleFormProps {
  file: File | null;
  handlePrev: () => void;
  handlePost: (formData: ArticleType) => void;
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
}: ArticleFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: defaultTitle || "",
      content: defaultContent || "",
      image: file || defaultImage || "",
    },
    mode: "onSubmit",
    resolver: yupResolver(articleFormSchema),
  });

  const errorOverlay = useCustomOverlay(({ close: errorOverlayClose }) => (
    <ModalError
      close={errorOverlayClose}
      description={
        errors.image?.message ||
        errors.title?.message ||
        errors.content?.message ||
        "알 수 없는 오류가 발생했습니다."
      }
    />
  ));
  const { mutateAsync } = useUploadImageMutation();

  const onInValidate = () => {
    errorOverlay.open();
  };
  const onSubmit = async (data: FormType) => {
    close();
    const newFormData: ArticleType = {
      title: data.title,
      content: data.content,
      image: "",
    };
    if (typeof data.image !== "string") {
      const { url } = await mutateAsync(data.image);
      newFormData.image = url;
    } else {
      newFormData.image = data.image;
    }
    if (!newFormData.image) {
      errorOverlay.open();
      return;
    }
    handlePost(newFormData);
  };

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
