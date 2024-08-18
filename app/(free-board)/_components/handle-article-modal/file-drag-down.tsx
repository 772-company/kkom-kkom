import Button from "@/components/button/button";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import ArrowReturn from "@/public/icons/arrow-return";
import MediaIcon from "@/public/icons/media-icon.svg";
import Image from "next/image";
import { useEffect, useReducer } from "react";
import { useDropzone } from "react-dropzone";

import ModalCancel from "../modal-cancel";

interface PreviewAction {
  type: "setFileToPreview" | "removePreview";
  payload?: File;
}

interface PreviewState {
  preview: string | null;
}

function reducer(state: PreviewState, action: PreviewAction) {
  switch (action.type) {
    case "setFileToPreview":
      if (!action.payload) throw new Error("파일이 꼭 필요합니다.");
      return { preview: URL.createObjectURL(action.payload) };
    case "removePreview":
      return { preview: null };
    default:
      return state;
  }
}

interface FileDragDownProps {
  file: File | null;
  defaultPreview: string | null;
  onSelect: (file: File | null) => void;
  handleNext: () => void;
}

export default function FileDragDown({
  file,
  onSelect,
  defaultPreview,
  handleNext,
}: FileDragDownProps) {
  const [{ preview }, dispatch] = useReducer(reducer, {
    preview: defaultPreview,
  });
  const { open, getRootProps, getInputProps } = useDropzone({
    noClick: file === null,
    noKeyboard: true,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      onSelect(acceptedFiles[0]);
      dispatch({ type: "setFileToPreview", payload: acceptedFiles[0] });
    },
  });

  const cancelOverlay = useCustomOverlay(({ close }) => (
    <ModalCancel
      close={close}
      onCancel={() => {
        dispatch({ type: "removePreview" });
        onSelect(null);
      }}
    />
  ));

  const handleCancel = () => {
    cancelOverlay.open();
  };

  useEffect(() => {
    if (file !== null) {
      dispatch({ type: "setFileToPreview", payload: file });
    }
  }, [file, dispatch]);

  return (
    <>
      {file === null && defaultPreview === null ? null : (
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
      )}
      <section>
        <section className="mx-auto max-h-[60vh] max-w-[60vh] px-5 pt-5">
          <div
            {...getRootProps()}
            className="flex h-full w-full flex-col items-center"
          >
            <section className="relative aspect-square w-full">
              <input {...getInputProps()} />
              {preview === null ? (
                <section className="relative inset-0 flex h-full w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-background-tertiary bg-white">
                  <MediaIcon />
                  <p className="text-xl font-bold">
                    사진과 동영상을 여기에 놓으세요
                  </p>
                  <Button
                    btnSize="x-small"
                    btnStyle="solid"
                    type="button"
                    onClick={open}
                    className="mt-5 px-4"
                  >
                    컴퓨터에서 찾아보기
                  </Button>
                </section>
              ) : (
                <div className="relative inset-0 mx-auto h-full w-full rounded-xl bg-white">
                  <Image
                    fill
                    src={preview}
                    alt="preview"
                    onLoad={() => {
                      URL.revokeObjectURL(preview);
                    }}
                    className="rounded-xl hover:cursor-pointer"
                  />
                </div>
              )}
            </section>
          </div>
        </section>
      </section>
    </>
  );
}
