import TeamProfile from "@/public/icons/img.svg";
import MyProfile from "@/public/icons/my-profile.svg";
import X from "@/public/icons/x.svg";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import React from "react";

/**
 * @author : 이동규
 * @typedef {Object} ProfileInputProps
 * @property {string} image - 서버에서 받아온 유저 이미지 URL
 * @property {string} preview - 미리보기 이미지 URL
 **/

interface profileInputProps {
  previewImage: string;
  image: string;
  type: "teamProfile" | "myProfile";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

const ProfileInput = ({
  previewImage,
  image,
  type,
  onChange,
  onClick,
}: profileInputProps) => {
  const [isImgError, setIsImgError] = useState<boolean>(false);
  const handleError = () => {
    setIsImgError(true);
  };

  return (
    <div className="h-16 w-16">
      <label htmlFor="profileInput" className="relative cursor-pointer">
        {type === "teamProfile" &&
          (isImgError && !previewImage ? (
            <TeamProfile width={64} height={64} />
          ) : (
            <Image
              width={64}
              height={64}
              className="rounded-full"
              src={image}
              onError={handleError}
              alt="팀이미지"
            />
          ))}

        {type === "myProfile" &&
          (isImgError && !previewImage ? (
            <MyProfile width={64} height={64} />
          ) : (
            <Image
              width={64}
              height={64}
              className="rounded-full"
              src={previewImage ? previewImage : image}
              onError={handleError}
              alt="나의이미지"
            />
          ))}
      </label>

      {previewImage && (
        <button
          className="radi h-30 w-30 borde absolute left-12 top-1 rounded-full border-2 border-background-primary bg-background-tertiary"
          onClick={onClick}
        >
          <X width={18} height={18} />
        </button>
      )}

      <input
        id="profileInput"
        type="file"
        accept=".jpg, jpeg, .png"
        className="hidden"
        onChange={onChange}
      />
    </div>
  );
};
export default ProfileInput;
