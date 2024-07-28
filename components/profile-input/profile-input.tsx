import TeamProfile from "@/app/public/icons/img.svg";
import MyProfile from "@/app/public/icons/my-profile.svg";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import React from "react";

interface profileInputProps {
  previewImage: string;
  image: string;
  type: "teamProfile" | "myProfile";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProfileInput = ({
  previewImage,
  image,
  type,
  onChange,
}: profileInputProps) => {
  const [isImgError, setIsImgError] = useState<boolean>(false);
  return (
    <>
      <label htmlFor="profileInput" className="cursor-pointer">
        {type === "teamProfile" &&
          (isImgError && !previewImage ? (
            <TeamProfile width={64} height={64} />
          ) : (
            <Image
              width={64}
              height={64}
              src={image}
              onError={() => setIsImgError(true)}
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
              src={previewImage ? previewImage : image}
              onError={() => setIsImgError(true)}
              alt="나의이미지"
            />
          ))}
      </label>

      <input
        id="profileInput"
        type="file"
        accept=".jpg, jpeg, .png"
        className="hidden"
        onChange={onChange}
      />
    </>
  );
};
export default ProfileInput;
