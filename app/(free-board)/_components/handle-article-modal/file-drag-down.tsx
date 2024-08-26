import Button from "@/components/button/button";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import ArrowReturn from "@/public/icons/arrow-return";
import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

import ModalCancel from "../modal-cancel";

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
  const [preview, setPreview] = useState(
    file ? URL.createObjectURL(file) : defaultPreview && defaultPreview,
  );

  const { open, getRootProps, getInputProps } = useDropzone({
    noClick: file === null,
    noKeyboard: true,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setPreview(URL.createObjectURL(acceptedFiles[0]));
      onSelect(acceptedFiles[0]);
    },
  });

  const cancelOverlay = useCustomOverlay(({ close }) => (
    <ModalCancel
      close={close}
      onCancel={() => {
        setPreview(null);
        onSelect(null);
      }}
      description="선택한 사진은 초기화됩니다."
      title="다른 사진을 선택하시겠습니까?"
    />
  ));

  const handleCancel = () => {
    cancelOverlay.open();
  };

  return (
    <>
      {preview === null ? null : (
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
        <section className="xl mx-auto h-full w-full px-5 pt-5">
          <div
            {...getRootProps()}
            className="flex h-full w-full flex-col items-center"
          >
            <section className="relative w-full">
              <input {...getInputProps()} />
              {preview === null ? (
                <section className="relative inset-0 flex h-full w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-background-tertiary bg-white py-4 md:aspect-square">
                  <Image
                    src="/icons/media-icon.svg"
                    alt="media-icon"
                    height="77"
                    width="96"
                  />
                  <p className="text-xl font-bold text-black">
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
                <div className="relative inset-0 mx-auto rounded-xl bg-white">
                  <Image
                    src={preview}
                    height={0}
                    width={0}
                    alt="preview"
                    sizes="60vh"
                    onLoad={() => {
                      URL.revokeObjectURL(preview);
                    }}
                    className="h-full w-full rounded-xl hover:cursor-pointer"
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
