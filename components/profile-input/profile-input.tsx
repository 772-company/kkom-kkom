import TeamProfile from "@/public/icons/image.svg";
import MyProfile from "@/public/icons/my-profile.svg";
import X from "@/public/icons/x.svg";
import Image from "next/image";
import { ChangeEvent, InputHTMLAttributes, MouseEvent, useState } from "react";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";

export interface ProfileInputProps<TFormInput extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  id: Path<TFormInput>;
  setValue: UseFormSetValue<TFormInput>;
  error?: string;
  defaultValue?: string;
  type: "teamProfile" | "myProfile";
}

/**
 * @author : 김서영
 * @typedef {Object} ProfileInputProps

 */

export function ProfileInput<TFormInput extends FieldValues>({
  id,
  type,
  setValue,
  defaultValue,
  error,
  ...rest
}: ProfileInputProps<TFormInput>) {
  const [previewImage, setPreviewImage] = useState<string | null>(
    defaultValue || null,
  );

  const DefaultImage = type === "teamProfile" ? TeamProfile : MyProfile;

  // NOTE - 파일 선택 시 프리뷰 설정 및 input 값 설정
  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const preview = URL.createObjectURL(e.target.files[0]);
        setValue(id, file as PathValue<TFormInput, Path<TFormInput>>, {
          shouldValidate: true,
          shouldDirty: true,
        });
        setPreviewImage(preview);
      }
    }
  };

  // NOTE - x 버튼 클릭 시 프리뷰 초기화 및 input 초기화
  const handleClearImage = (e: MouseEvent<HTMLButtonElement>) => {
    setValue(id, "" as PathValue<TFormInput, Path<TFormInput>>, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setPreviewImage(null);
    // NOTE - 이벤트 버블링으로 인해 input까지 같이 열려 추가
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <div className="h-16 w-16">
        <label htmlFor={id} className="relative cursor-pointer">
          {previewImage ? (
            <div className="relative size-[64px] overflow-hidden rounded-full">
              <Image
                fill
                src={previewImage}
                alt={type === "teamProfile" ? "팀 이미지" : "내 이미지"}
                className="object-cover"
              />
            </div>
          ) : (
            <DefaultImage width={64} height={64} />
          )}
          {previewImage && (
            <button
              aria-label="닫기"
              type="button"
              className="h-30 w-30 absolute left-12 top-1 rounded-full border-2 border-background-primary bg-background-tertiary"
              onClick={handleClearImage}
            >
              <X width={18} height={18} />
            </button>
          )}
        </label>

        <input
          id={id}
          type="file"
          className="hidden"
          accept=".jpg, .jpeg, .png"
          onChange={handleChangeFile}
          {...rest}
        />
      </div>
      {error && (
        <p className="ml-[13.5px] text-sm font-medium text-status-danger">
          {error}
        </p>
      )}
    </>
  );
}

export default ProfileInput;
